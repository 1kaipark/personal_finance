import React, { useState } from "react";
import BarChart from "./BarChart";
import DropDown from "./DropDown";
import MiniTable from "./MiniTable"

interface Props {
  // for the month selector
  months: string[];
  onMonthClick: (index: number, item: string) => void;
  // for the bar chart
  heights: { category: string; amount: number }[];
  sum: number;
  monthlyTotals: {
    category: string;
    amount: number;
  }[];
}

const ExpenseSummary: React.FC<Props> = ({
  months,
  onMonthClick,
  heights,
  sum,
  monthlyTotals
}) => {
  return (
    <>
      <div className="container-fluid">
        <div className="center">
        <DropDown items={months} onItemClick={onMonthClick} defaultText={"ALL"} />
        </div>
        <BarChart heights={heights} sum={sum} />{" "}
        <hr></hr> 
        <MiniTable monthlyTotals={monthlyTotals} />
      </div>
    </>
  );
};

export default ExpenseSummary;
