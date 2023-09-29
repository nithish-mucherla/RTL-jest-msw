import { render, screen } from "@testing-library/react";
import Options from "../Options";

test("options render the corresponding scoop images for scoop optionType", async () => {
  render(<Options optionType="scoops" />);

  let images = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(images).toHaveLength(4);
  const altText = images.map((element) => element.alt);
  expect(altText).toEqual([
    "chocolate scoop",
    "mango scoop",
    "orange scoop",
    "nimbu scoop",
  ]);
});

test("topping options will render topping images", async () => {
  render(<Options optionType={"toppings"} />);

  const toppingOptions = await screen.findAllByRole("img", {
    name: /toppings$/i,
  });
  expect(toppingOptions).toHaveLength(2);

  const altTexts = toppingOptions.map((toppingOption) => toppingOption.alt);
  expect(altTexts).toEqual(["choco toppings", "jelly toppings"]);
});
