import { Row } from "react-bootstrap";
import Options from "./Options";

const OrderEntry = () => {
  return (
    <Row>
      <Options optionType={"scoops"} />
      <Options optionType={"toppings"} />
    </Row>
  );
};

export default OrderEntry;
