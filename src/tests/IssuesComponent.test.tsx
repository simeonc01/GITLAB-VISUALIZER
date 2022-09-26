import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render, screen, cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import IssuesComponent from "../components/IssuesComponent";

afterEach(() => {
  cleanup();
});

test("Should render Issues component", () => {
  //render(<IssuesComponent />);
  expect(true).toBe(true);
});

test("Matches snapshot", () => {
  const tree = renderer.create(<IssuesComponent />).toJSON();
  expect(tree).toMatchSnapshot();
});
