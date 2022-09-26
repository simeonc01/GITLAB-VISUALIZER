import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import IssuesComponent from "../components/IssuesComponent";

afterEach(() => {
  cleanup();
});

//jest --updateSnapshot Når snapshoten endrer seg
test("Matches snapshot", () => {
  const tree = renderer.create(<IssuesComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
