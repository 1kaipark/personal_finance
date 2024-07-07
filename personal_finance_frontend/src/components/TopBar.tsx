import styles from "./topbar.module.css";
import React from "react"

interface Props {
    userName: string;
}


const TopBar: React.FC<Props> = ({ userName }) => {
  return (
    <div className={styles.topbar}>
      personal finance 💸
      <h3 className={styles.welcome}>welcome, {userName}!</h3>
    </div>
  );
}

export default TopBar;
