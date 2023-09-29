import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";
import { pricePerOption } from "../../constants";
import { formatCurrency } from "../../utils";
import { useOrderDetails } from "../../contexts/OrderDetails";

function Options({ optionType }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();
  const OptionComponent = optionType === "scoops" ? ScoopOption : ToppingOption;
  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const OptionComponents = options.map((option) => (
    <OptionComponent
      name={option.name}
      key={option.name}
      imagePath={option.imagePath}
    />
  ));

  useEffect(() => {
    // Create abort controller to attach it to the network call.
    const abortController = new AbortController();
    axios
      .get(`http://localhost:3030/${optionType}`, {
        signal: abortController.signal,
      })
      .then((response) => setOptions(response.data))
      .catch((e) => {
        if (e.name !== "CanceledError") setError(true);
      });

    // abort network calls
    return () => {
      abortController.abort(); // cancels the network call & the function making the call will receive an error with name CanceledError
    };
  }, [optionType]);

  if (error) return <AlertBanner />;
  return (
    <>
      <h2>{title}</h2>
      <p>{formatCurrency(pricePerOption[optionType])} each</p>
      <p>{`${title} total: ${formatCurrency(totals[optionType])}`}</p>
      <Row>{OptionComponents}</Row>
    </>
  );
}

export default Options;
