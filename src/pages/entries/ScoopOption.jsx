import { useOrderDetails } from "../../contexts/OrderDetails";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";

export default function ScoopOption({ name, imagePath }) {
  const { updateSelectionDetails } = useOrderDetails();
  const handleChange = (count) => {
    updateSelectionDetails(name, count, "scoops");
  };
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        style={{ width: "75%" }}
        alt={name + " scoop"}
        src={`http://localhost:3030/${imagePath}`}
      />
      <Form.Group controlId={`${name}-count`} as={Row}>
        <Form.Label xs={6} style={{ textAlign: "right" }}>
          {name}
        </Form.Label>
        <Col xs={5} style={{ textAlign: "left" }}>
          <Form.Control
            type="number"
            defaultValue={0}
            onChange={(e) => handleChange(parseInt(e.target.value))}
          />
        </Col>
      </Form.Group>
    </Col>
  );
}
