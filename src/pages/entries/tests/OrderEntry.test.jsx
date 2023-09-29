import { render, screen, waitFor } from "../../../test-utils";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import OrderEntry from "../OrderEntry";

test("error alerts are displayed on server errors for toppings & scoops calls", async () => {
  const errorHandlers = [
    rest.get("http://localhost:3030/scoops", (req, res, ctx) => {
      return res((ctx.status = 500));
    }),
    rest.get("http://localhost:3030/toppings", (req, res, ctx) => {
      return res((ctx.status = 500));
    }),
  ];
  server.resetHandlers(errorHandlers);

  render(<OrderEntry />);
  await waitFor(async () => {
    const errorAlerts = await screen.findAllByRole("alert");
    expect(errorAlerts).toHaveLength(2);
  });
});
