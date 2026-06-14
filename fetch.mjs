import {writeFile} from "node:fs/promises";
import "dotenv/config";

const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;
const USE_GITHUB_DATA = process.env.USE_GITHUB_DATA;
const MEDIUM_USERNAME = process.env.MEDIUM_USERNAME;

const ERR = {
  noUserName:
    "Github Username was found to be undefined. Please set all relevant environment variables.",
  noToken:
    "GitHub token was found to be undefined. Set REACT_APP_GITHUB_TOKEN in your .env file.",
  requestFailed:
    "The request to GitHub didn't succeed. Check if GitHub token in your .env file is correct.",
  requestFailedMedium:
    "The request to Medium didn't succeed. Check if Medium username in your .env file is correct."
};

async function fetchGithub() {
  if (USE_GITHUB_DATA !== "true") return;
  if (!GITHUB_USERNAME) throw new Error(ERR.noUserName);
  if (!GITHUB_TOKEN) throw new Error(ERR.noToken);

  console.log(`Fetching profile data for ${GITHUB_USERNAME}`);
  // Pass the username as a GraphQL variable instead of interpolating it into
  // the query body, so unusual characters can't corrupt the request.
  const query = `
query ($login: String!) {
  user(login: $login) {
    name
    bio
    avatarUrl
    location
    pinnedItems(first: 6, types: [REPOSITORY]) {
      totalCount
      edges {
        node {
          ... on Repository {
            name
            description
            forkCount
            stargazers {
              totalCount
            }
            url
            id
            diskUsage
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }
  }
}
`;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "User-Agent": "Node",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({query, variables: {login: GITHUB_USERNAME}})
  });
  if (!res.ok) throw new Error(`${ERR.requestFailed} (HTTP ${res.status})`);
  const data = await res.text();
  await writeFile("./public/profile.json", data);
  console.log("saved file to public/profile.json");
}

async function fetchMedium() {
  if (!MEDIUM_USERNAME) return;
  console.log(`Fetching Medium blogs data for ${MEDIUM_USERNAME}`);
  const feedUrl = `https://medium.com/feed/@${encodeURIComponent(MEDIUM_USERNAME)}`;
  const res = await fetch(
    `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`
  );
  if (!res.ok) throw new Error(`${ERR.requestFailedMedium} (HTTP ${res.status})`);
  const data = await res.text();
  await writeFile("./public/blogs.json", data);
  console.log("saved file to public/blogs.json");
}

await Promise.all([fetchGithub(), fetchMedium()]);
