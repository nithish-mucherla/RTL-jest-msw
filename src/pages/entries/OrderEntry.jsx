import { Button, Col, Container, Row } from "react-bootstrap";
import Options from "./Options";
import { useOrderDetails } from "../../contexts/OrderDetails";
import { formatCurrency } from "../../utils";

const OrderEntry = ({ setOrderPhase }) => {
  const { totals } = useOrderDetails();
  return (
    <Container>
      <Row>
        <Options optionType={"scoops"} />
      </Row>
      <Row>
        <br />
        <br />
      </Row>
      <Row>
        <Options optionType={"toppings"} />
      </Row>
      <Row>
        <h2>Grand Total: {formatCurrency(totals.scoops + totals.toppings)}</h2>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setOrderPhase("review")}>
            Submit Order & move to review
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default OrderEntry;
