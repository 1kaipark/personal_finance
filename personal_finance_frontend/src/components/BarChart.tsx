import React from "react";

interface Props {
  heights: { category: string; amount: number }[];
  sum: string;
}

const BarChart: React.FC<Props> = ({ heights, sum }) => {
  return (
    <>
      <div>
        {heights.map((item, index) => (
          <div
            key={index}
            className="progress"
            role="progressbar"
            aria-label="Example 1px high"
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
            style={{ height: "40px", margin: "10px", padding: "0px" }}
            id="proggybarbackground"
          >
            <div
              className="progress-bar"
              style={{ width: `${item.amount * 100}%`}}
              id='proggybar'
            >
              {item.category}
            </div>
          </div>
        ))}
        <p id='sum-label'>total spendings: ${sum}</p>
      </div>
    </>
  );
};

export default BarChart;
