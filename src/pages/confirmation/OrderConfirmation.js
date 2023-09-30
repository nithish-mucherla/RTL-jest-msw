import { Button } from "react-bootstrap";

export default function OrderConfirmation({ setOrderPhase }) {
  return (
    <div>
      <h1>Thank you</h1>
      <Button onClick={() => setOrderPhase("inProgress")}>Re-order</Button>
    </div>
  );
}
