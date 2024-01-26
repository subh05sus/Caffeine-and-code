import React, { useState, useEffect } from "react";
import "./ContributionLeaderboard.css"; // Add your CSS file for styling

async function getContributionsForUsersAndRepos(token, usernames, repoUrls) {
  const contributions = {}; // Store contributions for each user and repo

  for (const username of usernames) {
    contributions[username] = {}; // Initialize contributions for this user

    for (const repoUrl of repoUrls) {
      const owner = repoUrl.split("/")[3]; // Extract owner from repo URL
      const repoName = repoUrl.split("/")[4]; // Extract repo name from repo URL

      const body = {
        query: `query {
									repository(owner: "${owner}", name: "${repoName}") {
											owner {
													login
											}
											name
											defaultBranchRef {
													target {
															... on Commit {
																	history {
																			totalCount
																			nodes {
																					author {
																							user {
																									login
																							}
																					}
																			}
																	}
															}
													}
											}
									}
							}`,
      };

      const headers = {
        Authorization: `bearer ${token}`,
      };

      const response = await fetch("https://api.github.com/graphql", {
        method: "POST",
        body: JSON.stringify(body),
        headers: headers,
      });

      const data = await response.json();

      if (data.errors) {
        console.error(
          `Error fetching data for ${username} and ${repoUrl}:`,
          data.errors
        );
      } else {
        const userContributions =
          data.data.repository.defaultBranchRef.target.history.nodes.filter(
            (commit) => commit.author.user.login === username
          );

        contributions[username][repoUrl] = userContributions.length;
      }
    }
  }

  return contributions;
}
const ContributionLeaderboard = () => {
  const [contributions, setContributions] = useState({});
  const usernames = ["subh05sus", "subinoybiswas"];
  const repoUrls = [
    "https://github.com/subh05sus/GeetaGPT",
    "https://github.com/subh05sus/Caffiene-and-Code-Client-Side",
    "https://github.com/subinoybiswas/WinBio",
  ];
  const githubToken = process.env.REACT_APP_GITHUB_TOKEN || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getContributionsForUsersAndRepos(
          githubToken,
          usernames,
          repoUrls
        );
        setContributions(data);
      } catch (error) {
        console.error("Error fetching contributions:", error);
      }
    };

    fetchData();
  }, []);

  const getTotalContributions = (username) => {
    if (contributions[username]) {
      return Object.values(contributions[username]).reduce((acc, count) => acc + (count || 0), 0);
    }
    return 0;
  };

  // Extract the top 3 users
  const topThreeUsers = usernames.slice(0, 3);
  // Extract the remaining users (excluding the top 3)
  const remainingUsers = usernames.slice(3);

  return (
    <div className="contribution-leaderboard-container">
      <h2>Contribution Leaderboard</h2>

      {/* Top 3 users */}
      <div className="top-three">
        {topThreeUsers.map((username, index) => (
          <div key={index} className="user-card">
            <p>{username}</p>
            <p>Total Contributions: {getTotalContributions(username)}</p>
          </div>
        ))}
      </div>

      {/* Remaining users in a table */}
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Total Contributions</th>
          </tr>
        </thead>
        <tbody>
          {remainingUsers.map((username, index) => (
            <tr key={index}>
              <td>{username}</td>
              <td>{getTotalContributions(username)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContributionLeaderboard;