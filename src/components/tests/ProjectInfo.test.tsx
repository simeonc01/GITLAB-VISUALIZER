import renderer from "react-test-renderer";
import { Label, Project } from "../../util/types";
import { GitLabContext } from "../GitlabProvider";
import ProjectInfo from "../ProjectInfo";

it("Only component test", () => {
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

  const list: Label[] = [];
  list.push(l);

  const comp = renderer
    .create(
      <GitLabContext.Provider
        value={{
          commits: [],
          branches: [],
          issues: [],
          currentProject: p,
          events: [],
          labels: list,
          error: false,
          loading: false,
          update: () => true,
        }}
      >
        <ProjectInfo />
        <h2>hey</h2>
      </GitLabContext.Provider>
    )
    .toJSON();
  expect(comp).toMatchSnapshot();
});

// it("Test with data", () => {
//     const comp = renderer.create(<CommitTable rows ={testData} />).toJSON();
//     expect(comp).toMatchSnapshot();
//   });

export {};
