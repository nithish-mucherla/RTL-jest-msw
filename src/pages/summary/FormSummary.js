import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Popover } from "react-bootstrap";
import axios from "axios";

export default function SummaryForm({ setOrderPhase }) {
  const [tcChecked, setTcChecked] = useState(false);
  const [showTc, setShowTc] = useState(false);

  const placeOrder = () => {
    axios
      .post("http://localhost:3030/order", JSON.stringify({}))
      .then((response) => {
        setOrderPhase("complete");
      })
      .catch((e) => console.log(e));
  };

  const checkboxLabel = (
    <span>
      I agree to
      <span
        style={{ color: "blue" }}
        onMouseEnter={() => setShowTc(true)}
        onMouseLeave={() => setShowTc(false)}
      >
        {" "}
        Terms and Conditions
      </span>
      {showTc && (
        <Popover title="t&c" style={{ color: "black" }}>
          you won't actually get the sundae on ordering
        </Popover>
      )}
    </span>
  );

  return (
    <Form>
      <Form.Group controlId="terms-and-conditions">
        <Form.Check
          type="checkbox"
          checked={tcChecked}
          onChange={(e) => setTcChecked(e.target.checked)}
          label={checkboxLabel}
        />
      </Form.Group>
      <Button variant="primary" disabled={!tcChecked} onClick={placeOrder}>
        Confirm order
      </Button>
    </Form>
  );
}
