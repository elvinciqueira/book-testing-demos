import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import App from "./App";

test("renders learn react link", async () => {
  render(<App />, document.body);
  const results = await axe(document.body);
  expect(results).toHaveNoViolations();
});
