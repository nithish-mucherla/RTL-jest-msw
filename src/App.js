import { OrderDetailsProvider } from "./contexts/OrderDetails";
import OrderEntry from "./pages/entries/OrderEntry";
import OrderSummary from "./pages/summary/OrderSummary";

function App() {
  return (
    <OrderDetailsProvider>
      <OrderEntry />
      {/* <OrderSummary /> */}
    </OrderDetailsProvider>
  );
}

export default App;
