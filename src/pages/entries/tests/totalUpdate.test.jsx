import { render, screen } from "../../../test-utils";
import Options from "../Options";
import userEvent from "@testing-library/user-event";
import OrderEntry from "../OrderEntry";

test("scoop total gets updated on updating the scoop options", async () => {
  const user = userEvent.setup();
  render(<Options optionType={"scoops"} />);

  // check initial scoop total is $0.00
  let scoopTotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopTotal).toHaveTextContent("0.00");

  // check update to scoop total on updating the vanilla option count

  /**
   *
   * query methods:
   *  getBy - to be used when element is expected in the doc
   *  queryBy - to be used when finding element not in the doc
   *  findBy - to be used when finiding for elements that occur asynchronously
   *  waitFor - to wait until the expectation (passed as a function) is passed or timeout is reached. Retries when an error is thrown.
   */

  let vanillaScoop = await screen.findByRole("spinbutton", {
    name: /vanilla/i,
  });
  await user.clear(vanillaScoop);
  await user.type(vanillaScoop, "1");
  expect(scoopTotal).toHaveTextContent("2.00");

  let chocoScoop = await screen.findByRole("spinbutton", {
    name: /chocolate/i,
  });
  await user.clear(chocoScoop);
  await user.type(chocoScoop, "2");
  expect(scoopTotal).toHaveTextContent("6.00");
});

test("toppings total gets updated on selecting one or more toppigns", async () => {
  render(<Options optionType={"toppings"} />);
  const user = userEvent.setup();

  // initally toppings total to be $0.00
  let toppingsTotal = screen.getByText("Toppings total:", { exact: false });
  expect(toppingsTotal).toHaveTextContent("0.00");

  // select choco toppings and validate price updates to 1.50. The topping entries are gonna be rendered in async so use findBy
  let chocoTopping = await screen.findByRole("checkbox", {
    name: /choco toppings/i,
  });
  await user.click(chocoTopping);
  expect(toppingsTotal).toHaveTextContent("1.50");

  let jellyTopping = await screen.findByRole("checkbox", {
    name: /jelly topping/i,
  });
  await user.click(jellyTopping);
  expect(toppingsTotal).toHaveTextContent("3.00");
  await user.click(jellyTopping);
  expect(toppingsTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  test("grand total starts at $0.00", () => {
    const view = render(<OrderEntry />);
    let grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("0.00");
    view.unmount();
  });
  test("grand total updates properly if scoops is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const chocoScoop = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    await user.clear(chocoScoop);
    await user.type(chocoScoop, "1");

    const jellyTopping = await screen.findByRole("checkbox", {
      name: /jelly/i,
    });
    await user.click(jellyTopping);

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if toppings is added first", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const jellyTopping = await screen.findByRole("checkbox", {
      name: /jelly/i,
    });
    await user.click(jellyTopping);

    const chocoScoop = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    await user.clear(chocoScoop);
    await user.type(chocoScoop, "1");

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("3.50");
  });
  test("grand total updates properly if an item is removed", async () => {
    render(<OrderEntry />);
    const user = userEvent.setup();
    const jellyTopping = await screen.findByRole("checkbox", {
      name: /jelly/i,
    });
    await user.click(jellyTopping);

    const chocoScoop = await screen.findByRole("spinbutton", {
      name: /chocolate/i,
    });
    await user.clear(chocoScoop);
    await user.type(chocoScoop, "1");
    await user.clear(chocoScoop);
    await user.type(chocoScoop, "0");

    const grandTotal = screen.getByText("Grand total: $", { exact: false });
    expect(grandTotal).toHaveTextContent("1.50");
  });
});
