import { expect, test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render } from "react-dom";
import renderer from "react-test-renderer";
import IssuesComponent from "../components/IssuesComponent";
import Logo from "../components/Logo";

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
