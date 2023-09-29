import { Col, Form, Row } from "react-bootstrap";
import { useOrderDetails } from "../../contexts/OrderDetails";

export default function ToppingOption({ name, imagePath }) {
  const { updateSelectionDetails } = useOrderDetails();
  const handleChange = (checked) => {
    updateSelectionDetails(name, checked ? 1 : 0, "toppings");
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img
        style={{ width: 100 }}
        alt={name}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group as={Row} controlId={`${name}-selection`}>
        <Form.Check
          type="checkbox"
          xs={6}
          onChange={(e) => handleChange(e.target.checked)}
          label={name}
        />
      </Form.Group>
    </Col>
  );
}
