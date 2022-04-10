import { readFileSync } from "node:fs";
import github from "@actions/github";
import core from "@actions/core";

export const main = async () => {
  const myToken = core.getInput("myToken");

  const octokit = github.getOctokit(myToken);
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
