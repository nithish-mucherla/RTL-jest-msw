import SummaryForm from "./FormSummary";
import { useOrderDetails } from "../../contexts/OrderDetails";
import React from "react";
import { formatCurrency } from "../../utils";
import { Col, Container, Row } from "react-bootstrap";

export default function OrderSummary(props) {
  const { totals, selectionDetails } = useOrderDetails();
  const getSelectedOptions = (optionType) => {
    const selectedOptions = [];
    console.log(selectionDetails);
    for (const option in selectionDetails[optionType]) {
      const displayText =
        optionType === "toppings"
          ? option
          : `${option} - ${selectionDetails[optionType][option]}`;
      selectedOptions.push(<li key={option}>{displayText}</li>);
    }
    return selectedOptions;
  };
  return (
    <Container>
      <Row>
        <h1>Order Summary</h1>
        <h2>Scoops: {formatCurrency(totals.scoops)}</h2>
        <Col>{getSelectedOptions("scoops")}</Col>
        <h2>Toppings: {formatCurrency(totals.toppings)}</h2>
        <Col>{getSelectedOptions("toppings")}</Col>
        <h3>Order total: {formatCurrency(totals.scoops + totals.toppings)}</h3>
      </Row>
      <SummaryForm />
    </Container>
  );
}
