import { readFileSync } from "node:fs";
import { getOctokit, context } from "@actions/github";

export const main = async () => {
  const myToken = process.env.myToken;

  if (!myToken) {
    throw new Error("error");
  }

  const octokit = getOctokit(myToken);

  const coverageSummary = JSON.parse(
    readFileSync("./coverage/coverage-summary.json", "utf8")
  );

  await octokit.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: `| category | pct |\n----|----\n| coverage | ${coverageSummary.total.lines.pct}|`,
  });
};

main();
