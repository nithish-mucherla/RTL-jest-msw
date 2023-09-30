import { rest } from "msw";

export const handlers = [
  rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "chocolate", imagePath: "/images/chocolate.png" },
        { name: "vanilla", imagePath: "/images/mango.png" },
        { name: "orange", imagePath: "/images/orange.png" },
        { name: "nimbu", imagePath: "/images/nimbu.png" },
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

  rest.post("http://localhost:3030/order", (req, res, ctx) => {
    return res(ctx.json("orderId12222"));
  }),
];
