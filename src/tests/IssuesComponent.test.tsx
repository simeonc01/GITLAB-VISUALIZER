import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { cleanup, render, screen } from "@testing-library/react";
import { createRoot } from "react-dom/client";
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
