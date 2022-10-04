import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import {render, screen} from '@testing-library/react';
import IssuesComponent from "../IssuesComponent";
import Logo from "../Logo";

/*jest --updateSnapshot Når snapshoten endrer seg*/
describe("Snapshot tests", () => {
  it("Logo matches snapshot", () => {
    const comp = renderer.create(<Logo />).toJSON();
    expect(comp).toMatchSnapshot();
  });

  it("Visualisation of Issues matches snapshot", () => {
    //Klarer ikke rendre Responsive container
    const comp = renderer.create(<IssuesComponent />).toJSON();
    expect(comp).toMatchSnapshot();
  });
});
