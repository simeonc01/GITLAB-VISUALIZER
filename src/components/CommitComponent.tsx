import React, { useContext, useEffect, useState } from "react";
import { Commit } from "../util/types";
import { GitLabContext } from "./GitlabProvider";
import GitlabProvider from "./GitlabProvider";

export default function CommitComponent() {
  const [commits, setCommits] = useState<Commit[]>([]);

  const context = useContext(GitLabContext);

  useEffect(() => {
    const tempCommits = context.commits;
    if(tempCommits !== null) setCommits(tempCommits);
    console.log(commits);

  }, [context.commits]);

  return <div>CommitComponent</div>;
}
