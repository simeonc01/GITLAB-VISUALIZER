import renderer from "react-test-renderer";
import { Label, Project } from "../../util/types";
import ProjectInfoContent from "../ProjectInfoContent";

it("Simple ProjectInfoContent test", () => {
  const p = {} as Project;
  p.description = "Description";
  p.name = "Name";
  p.star_count = 2;
  p.last_activity_at = "2022-10-04T13:52.109+02:00";
  p.created_at = "2022-09-04T13:52.109+02:00";
  p.forks_count = 0;

  const l = {} as Label;
  l.color = "#d9534f";
  l.name = "bug";
  l.text_color = "#FFFFFF";
  l.description = "desc"

  const list: Label[] = [];
  list.push(l);

  const comp = renderer
    .create(<ProjectInfoContent project={p} milestones={[]} labels={list} />)
    .toJSON();
  expect(comp).toMatchSnapshot();
});
