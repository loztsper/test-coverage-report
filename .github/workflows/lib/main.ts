import { readFileSync } from "node:fs";
import github from "@actions/github";

export const main = async () => {
  console.log(process.env.test);
  const octokit = github.getOctokit(process.env.myToken);
  const context = github.context;

  const coverageSummary = JSON.parse(
    readFileSync("./coverage/coverage-summary.json", "utf8")
  );

  await octokit.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: "👋 ",
  });
};

main();
