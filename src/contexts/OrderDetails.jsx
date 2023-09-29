import { createContext, useContext, useState } from "react";
import { pricePerOption } from "../constants";

const orderDetails = createContext();

// customHook
export const useOrderDetails = () => {
  const contextValue = useContext(orderDetails);

  // i.e. context value is undefined when it is called outside a provider
  if (!contextValue)
    throw new Error("useOrderDetails must be used within a context provider");

  return contextValue;
};

export const OrderDetailsProvider = (props) => {
  const [selectionDetails, setSelectionDetails] = useState({
    scoops: {},
    toppings: {},
  });

  const updateSelectionDetails = (optionName, optionValue, optionType) => {
    const newSelectionDetails = JSON.parse(JSON.stringify(selectionDetails));
    newSelectionDetails[optionType][optionName] = optionValue;
    setSelectionDetails(newSelectionDetails);
  };

  const resetSelectionDetails = () => {
    setSelectionDetails({
      scoops: {},
      toppings: {},
    });
  };

  const calculateTotal = (optionType) => {
    const selectedCounts = Object.values(selectionDetails[optionType]);
    console.log(selectedCounts); // return [1,2,3]
    const totalCount = selectedCounts.reduce(
      (totalAccumulator, currentValue) => 0 + totalAccumulator + currentValue,
      0
    );
    return totalCount * pricePerOption[optionType];
  };
  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  return (
    <orderDetails.Provider
      value={{
        selectionDetails,
        updateSelectionDetails,
        resetSelectionDetails,
        totals,
      }}
      {...props}
    />
  );
};
