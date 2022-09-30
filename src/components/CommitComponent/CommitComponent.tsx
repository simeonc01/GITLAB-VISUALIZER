import React, { useContext, useEffect, useState } from "react";
import { Commit } from "../../util/types";
import { GitLabContext } from "../GitlabProvider";
import CommitTable from "./CommitTable";

export const createData = (
  title: string,
  author: string,
  commited_date: string,
  message: string
) => {
  return {
    title: title,
    author: author,
    commited_date: commited_date,
    message: message,
  };
};

export default function CommitComponent() {
  const [commits, setCommits] = useState<Commit[]>([]);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempCommits = context.commits;
    console.log(tempCommits);
    if (tempCommits !== null) setCommits(tempCommits);
  }, [context.commits]);

  const rows: ReturnType<typeof createData>[] = commits.map((commit) => {
    const yyyymmdd = commit.committed_date
      .substring(0, commit.committed_date.indexOf("T"))
      .split("-");
    const date = yyyymmdd[2] + "/" + yyyymmdd[1];
    return createData(commit.title, commit.author_name, date, commit.message);
  });

  return <CommitTable rows={rows}/>
}
