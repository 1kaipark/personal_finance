import React from "react";
import { useState } from "react";
import styles from "./table.module.css"

interface Props {
  data: {
    [key: string]: {
      date: string;
      category: string;
      title: string;
      amount: number;
      notes: string;
    };
  };
  onRowClick: (index: number, title: string) => void;
}

const DataTable: React.FC<Props> = ({ data, onRowClick }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // set selected index AND pass index to callback prop
  const handleRowClick = (index: number, title: string) => {
    setSelectedIndex(index);
    onRowClick(index, title);
  };
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col">DATE</th>
            <th scope="col">CATEGORY</th>
            <th scope="col">TITLE</th>
            <th scope="col">AMOUNT</th>
            <th scope="col">NOTES</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((key, index) => (
            <tr
              key={key}
              className={selectedIndex === index ? "table-active" : ""}
              onClick={() => handleRowClick(index, data[key].title)}
            >
              <td>{data[key].date}</td>
              <td>{data[key].category}</td>
              <td>{data[key].title}</td>
              <td>{data[key].amount}</td>
              <td>{data[key].notes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default DataTable;
