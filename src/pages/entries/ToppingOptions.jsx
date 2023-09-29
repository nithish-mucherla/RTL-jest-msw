import { Col } from "react-bootstrap";

export default function ToppingOption({ name, imagePath }) {
  return (
    <Col xs={12} sm={6} md={4} lg={3}>
      <img alt={name} src={`http://localhost:3030/${imagePath}`} />
    </Col>
  );
}
