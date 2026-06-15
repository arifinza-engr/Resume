import {Suspense, useContext} from "react";
import "./twitter.scss";
import Loading from "../loading/Loading";
import {Timeline} from "react-twitter-widgets";
import {twitterDetails} from "../../portfolio";
import StyleContext from "../../contexts/StyleContext";

const renderLoader = () => <Loading />;

export default function Twitter() {
  const {isDark} = useContext(StyleContext);

  if (!twitterDetails.display) {
    return null;
  }
  if (!twitterDetails.userName) {
    console.error("Twitter username for twitter section is missing");
    return null;
  }

  return (
    <Suspense fallback={renderLoader()}>
      <div className="tw-main-div" id="twitter">
        <div className="centerContent">
          {/* key forces a re-mount so the timeline re-themes on dark-mode toggle */}
          <Timeline
            key={isDark ? "dark" : "light"}
            dataSource={{
              sourceType: "profile",
              screenName: twitterDetails.userName
            }}
            options={{
              height: "400",
              theme: isDark ? "dark" : "light",
              chrome: "noheader nofooter"
            }}
            renderError={() => (
              <div className="centerContent">
                <h2>Can&apos;t load? Check privacy protection settings</h2>
              </div>
            )}
          />
        </div>
      </div>
    </Suspense>
  );
}
