import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "chocolate scoop", imagePath: "/images/chocolate.png" },
        { name: "mango scoop", imagePath: "/images/mango.png" },
        { name: "orange scoop", imagePath: "/images/orange.png" },
        { name: "nimbu scoop", imagePath: "/images/nimbu.png" },
      ])
    );
  }),

  rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "choco toppings", imagePath: "/images/choco.png" },
        { name: "jelly toppings", imagePath: "/images/jelly.png" },
      ])
    );
  }),
];
