import { fireEvent, render, screen } from "@testing-library/react";
import FormSummary from "../FormSummary";
import userEvent from "@testing-library/user-event";

test("submit button gets enabled only on checking the t&c", () => {
  render(<FormSummary />);
  const tncCheckbox = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  const sundaeFormSubmitBtn = screen.getByRole("button", {
    name: /confirm order/i,
  });

  expect(sundaeFormSubmitBtn).toBeDisabled();
  fireEvent.click(tncCheckbox);
  expect(sundaeFormSubmitBtn).toBeEnabled();

  fireEvent.click(tncCheckbox);
  expect(sundaeFormSubmitBtn).toBeDisabled();
});

test("popover displays on hovering t&c", async () => {
  render(<FormSummary />);
  const user = userEvent.setup();

  let popover = screen.queryByText(/get the sundae on ordering/i);
  expect(popover).not.toBeInTheDocument();

  let tncText = screen.getByText(/terms and conditions/i);
  await user.hover(tncText);
  popover = screen.getByText(/get the sundae on ordering/i);
  expect(popover).toBeInTheDocument();
  await user.unhover(tncText);
  expect(popover).not.toBeInTheDocument();
});
