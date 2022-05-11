import { readFileSync } from "node:fs";
import { getOctokit, context } from "@actions/github";
import { summary } from "@actions/core";

export const main = async () => {
  const myToken = process.env.myToken;

  if (!myToken) {
    throw new Error("error");
  }

  const octokit = getOctokit(myToken);

  const coverageSummary = JSON.parse(
    readFileSync("./coverage/coverage-summary.json", "utf8")
  );

  const comment = summary.addHeading("Test Results").addTable([
    [
      { data: "Status", header: true },
      { data: "Category", header: true },
      { data: "Percentage", header: true },
      { data: "Covered/Total", header: true },
    ],
    [
      "🟢",
      "lines",
      `${coverageSummary.total.lines.pct}%`,
      `${coverageSummary.total.lines.covered} / ${coverageSummary.total.lines.total}`,
    ],
    [
      "🟢",
      "functions",
      `${coverageSummary.total.functions.pct}%`,
      `${coverageSummary.total.functions.covered} / ${coverageSummary.total.functions.total}`,
    ],
    [
      "🟢",
      "statements",
      `${coverageSummary.total.statements.pct}%`,
      `${coverageSummary.total.statements.covered} / ${coverageSummary.total.statements.total}`,
    ],
    [
      "🟢",
      "branches",
      `${coverageSummary.total.branches.pct}%`,
      `${coverageSummary.total.branches.covered} / ${coverageSummary.total.branches.total}`,
    ],
  ]);
  await comment.write();

  await octokit.rest.issues.createComment({
    issue_number: context.issue.number,
    owner: context.repo.owner,
    repo: context.repo.repo,
    body: comment.stringify(),
  });
  const jestOutput = JSON.parse(readFileSync("jest-output.json", "utf8"));
  console.log(jestOutput);
};

main();
