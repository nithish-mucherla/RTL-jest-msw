import userEvent from "@testing-library/user-event";
import App from "../App";
import { render, screen, waitFor } from "../test-utils";

test("order phases for a happy path", async () => {
  render(<App />);
  const user = userEvent.setup();

  let chocoScoop = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  await user.type(chocoScoop, "1");

  const jellyTopping = await screen.findByRole("checkbox", { name: /jelly/i });
  await user.click(jellyTopping);

  const confirmReviewBtn = screen.getByRole("button", {
    name: /Submit Order &/i,
  });
  await user.click(confirmReviewBtn);

  await screen.findByText("Order Summary");
  expect(screen.getByText(/scoops: \$2.00/i)).toBeInTheDocument();
  expect(screen.getByText(/chocolate - 1/i)).toBeInTheDocument();
  expect(screen.getByText(/toppings: \$1.50/i)).toBeInTheDocument();
  expect(screen.getByText(/Order total: \$3.50/i)).toBeInTheDocument();

  const tncCheck = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });
  await user.click(tncCheck);

  const confirmOrder = screen.getByRole("button", { name: "Confirm order" });
  await user.click(confirmOrder);

  const reOrder = await screen.findByRole("button", { name: /re-order/i });
  await user.click(reOrder);
  await waitFor(async () => {
    chocoScoop = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    expect(chocoScoop).toBeInTheDocument();
  });
});
