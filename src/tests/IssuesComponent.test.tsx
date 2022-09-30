import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { cleanup } from "@testing-library/react";
import ReactDOM from "react-dom";
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

test("dateOpened is of type date", () => {});

//Enheten skal også testes
test("It renders Still Open when issue is not closed", () => {});

test("It renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<IssuesComponent />, div);
  ReactDOM.unmountComponentAtNode(div);
});
