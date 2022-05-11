import { readFileSync } from "node:fs";
import { summary } from "@actions/core";
const coverageSummary = JSON.parse(
  readFileSync("./coverage/coverage-summary.json", "utf8")
);

const comment = summary
  .addHeading("Test Results")
  .addTable([
    [
      { data: "Status", header: true },
      { data: "Category", header: true },
      { data: "Percentage", header: true },
      { data: "Covered/Total", header: true },
    ],
    [
      "🟢",
      "lines",
      coverageSummary.total.lines.pct,
      `${coverageSummary.total.lines.covered} / ${coverageSummary.total.lines.total}`,
    ],
    [
      "🟢",
      "functions",
      coverageSummary.total.functions.pct,
      `${coverageSummary.total.functions.covered} / ${coverageSummary.total.functions.total}`,
    ],
    [
      "🟢",
      "statements",
      coverageSummary.total.statements.pct,
      `${coverageSummary.total.statements.covered} / ${coverageSummary.total.statements.total}`,
    ],
    [
      "🟢",
      "branches",
      coverageSummary.total.branches.pct,
      `${coverageSummary.total.branches.covered} / ${coverageSummary.total.branches.total}`,
    ],
  ])
  .write()
  .then((res) => console.log(res));

console.log(coverageSummary);
