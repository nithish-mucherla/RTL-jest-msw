import { useState } from "react";
import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entries/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";
import OrderConfirmation from "./pages/confirmation/OrderConfirmation";

function App() {
  const [orderPhase, setOrderPhase] = useState("inProgress");

  return (
    <OrderDetailsProvider>
      {
        {
          inProgress: <OrderEntry setOrderPhase={setOrderPhase} />,
          review: <OrderSummary setOrderPhase={setOrderPhase} />,
          complete: <OrderConfirmation setOrderPhase={setOrderPhase} />,
        }[orderPhase]
      }
    </OrderDetailsProvider>
  );
}

export default App;
