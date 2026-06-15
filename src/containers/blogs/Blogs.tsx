import {useState, useEffect, useContext} from "react";
import "./Blog.scss";
import BlogCard from "../../components/blogCard/BlogCard";
import {blogSection} from "../../portfolio";
import {Fade} from "react-awesome-reveal";
import StyleContext from "../../contexts/StyleContext";
export default function Blogs() {
  const {isDark} = useContext(StyleContext);
  const [mediumBlogs, setMediumBlogs] = useState<any[] | string>([]);
  function setMediumBlogsFunction(array: any[] | string) {
    setMediumBlogs(array);
  }
  //Medium API returns blogs' content in HTML format. Below function extracts blogs' text content within paragraph tags
  function extractTextContent(html: string): string {
    return typeof html === "string"
      ? html
          .split(/<\/p>/i)
          .map(part => part.split(/<p[^>]*>/i).pop())
          .filter(
            (el): el is string => typeof el === "string" && el.trim().length > 0
          )
          .map(el => el.replace(/<\/?[^>]+(>|$)/g, "").trim())
          .join(" ")
      : "";
  }
  useEffect(() => {
    // Only fetch Medium data when the section is shown AND Medium is enabled.
    if (blogSection.display && blogSection.displayMediumBlogs === "true") {
      const getMediumData = () => {
        fetch("/blogs.json")
          .then(result => {
            // A missing blogs.json is served as the index.html SPA fallback,
            // so verify we actually got JSON before parsing it.
            const contentType = result.headers.get("content-type") || "";
            if (result.ok && contentType.includes("application/json")) {
              return result.json();
            }
            return null;
          })
          .then(response => {
            if (response && Array.isArray(response.items)) {
              setMediumBlogsFunction(response.items);
            } else {
              // No Medium data available — keep the default hardcoded blogs.
              setMediumBlogsFunction("Error");
              blogSection.displayMediumBlogs = "false";
            }
          })
          .catch(function (error) {
            console.error(
              `${error} (Blogs section reverted to default hardcoded posts)`
            );
            setMediumBlogsFunction("Error");
            blogSection.displayMediumBlogs = "false";
          });
      };
      getMediumData();
    }
  }, []);
  if (!blogSection.display) {
    return null;
  }
  return (
    <Fade direction="up" duration={1000} triggerOnce>
      <div className="main" id="blogs">
        <div className="blog-header">
          <h1 className="blog-header-text">{blogSection.title}</h1>
          <p
            className={
              isDark ? "dark-mode blog-subtitle" : "subTitle blog-subtitle"
            }
          >
            {blogSection.subtitle}
          </p>
        </div>
        <div className="blog-main-div">
          <div className="blog-text-div">
            {blogSection.displayMediumBlogs !== "true" ||
            mediumBlogs === "Error"
              ? blogSection.blogs.map((blog, i) => {
                  return (
                    <BlogCard
                      key={i}
                      isDark={isDark}
                      blog={{
                        url: blog.url,
                        title: blog.title,
                        description: blog.description
                      }}
                    />
                  );
                })
              : (mediumBlogs as any[]).map((blog: any, i) => {
                  return (
                    <BlogCard
                      key={i}
                      isDark={isDark}
                      blog={{
                        url: blog.link,
                        title: blog.title,
                        description: extractTextContent(blog.content)
                      }}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    </Fade>
  );
}
