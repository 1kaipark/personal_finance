import React from 'react';
import styles from './table.module.css';

interface Props {
  monthlyTotals: {
    category: string;
    amount: number;
  }[];
}

const DataTable: React.FC<Props> = ({ monthlyTotals }) => {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th scope="col">CATEGORY</th>
          <th scope="col">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        {monthlyTotals.map((item, index) => (
          <tr key={index}>
            <td>{item.category}</td>
            <td>{item.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
