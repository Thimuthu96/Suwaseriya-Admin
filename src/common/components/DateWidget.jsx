import React from "react";
import { useState } from "react";

const DateWidget = () => {
  const [currentDate] = useState(new Date().toLocaleDateString());
  return <div>{currentDate}</div>;
};

export default DateWidget;
