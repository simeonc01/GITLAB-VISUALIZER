import {
  Box,
  CircularProgress,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { IContextDefault, Label, Milestone, Project } from "../util/types";
import { GitLabContext } from "./GitlabProvider";
import Container from "./LayoutContainer";
import ProjectInfoContent from "./ProjectInfoContent";


const ProjectInfo = () => {
  const context = useContext<IContextDefault>(GitLabContext);

  const [project, setProject] = useState<Project>();
  const [labels, setLabels] = useState<Label[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [milestones, setMilestones] = useState<Milestone[]>([]);

  useEffect(() => {
    if (!context.loading) {
      if (
        context.currentProject !== null &&
        context.labels !== null &&
        context.milestones !== null
      ) {
        setProject(context.currentProject);
        setLabels(context.labels);
        setMilestones(context.milestones);
      } else setError(true);
    }
  }, [context.loading]);

  return (
    <Container>
      {context.loading && <CircularProgress />}
      {!context.loading &&
        !error &&
        project !== undefined &&
        labels.length !== 0 && (
          <ProjectInfoContent project={project} labels={labels} milestones={milestones} />
        )}
    </Container>
  );
};

export default ProjectInfo;
