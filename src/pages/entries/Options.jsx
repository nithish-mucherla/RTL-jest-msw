import axios from "axios";
import { useEffect, useState } from "react";
import ScoopOption from "./ScoopOption";
import { Row } from "react-bootstrap";
import ToppingOption from "./ToppingOptions";
import AlertBanner from "../common/AlertBanner";

function Options({ optionType }) {
  const [options, setOptions] = useState([]);
  const [error, setError] = useState(false);

  const OptionComponent = optionType === "scoops" ? ScoopOption : ToppingOption;

  const OptionComponents = options.map((option) => (
    <OptionComponent
      name={option.name}
      key={option.name}
      imagePath={option.imagePath}
    />
  ));

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then((response) => setOptions(response.data))
      .catch((e) => setError(true));
  }, [optionType]);

  if (error) return <AlertBanner />;
  return <Row>{OptionComponents}</Row>;
}

export default Options;
