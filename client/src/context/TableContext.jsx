import { createContext, useContext, useState } from "react";

export const TableContext = createContext();

export function TableProvider({ children }) {
  let [table, setTable] = useState([
    {
      rowId: Date.now(),
      testName: "",
      department: "",
      testDate: "",
      reportDateL: "",
      qty: "",
      rate: "",
      gross: "",
      mrp: "",
      discPercentage: "",
      discount: "",
      amount: "",
    },
  ]);
  const [tableLastRowID, setTableLastRowID] = useState(
    table.length ? table[table.length - 1].rowId : null
  );
  // const [tableData, setTableData] = useState([]);

  const handleDeleteRow = (elemId) => {
    setTable((prev) => prev.filter((ele) => ele.rowId !== elemId));
  };

  return (
    <TableContext.Provider
      value={{
        table,
        setTable,
        tableLastRowID,
        setTableLastRowID,
        handleDeleteRow,
      }}
    >
      {children}
    </TableContext.Provider>
  );
}

export function useTableState() {
  return useContext(TableContext);
}
