import styles from "./Table.module.css";

export default function TableCellDotIndicator() {
  return (
    <div
      className={styles.tableData}
      style={{
        margin: "0px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: "18px",
            height: "18px",
            backgroundColor: "black",
            borderRadius: "10px",
            marginRight: "5px",
          }}
        />
        <p>I'm red</p>
      </div>
    </div>
  );
}
