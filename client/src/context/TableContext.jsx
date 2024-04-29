import { createContext, useCallback, useContext, useState } from "react";

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
  console.log(table.length, table[0].testName);

  const handleDeleteRow = useCallback(
    (elemId) => {
      console.log(table.length, table[0].testName);
      let success = false;

      // if the table have only one column which is already empty then return false
      // if (table.length === 1 && table[0].testName === "") return success;
      setTable((prev) =>
        prev.filter((ele) => {
          console.log(ele.rowId, Number(elemId));
          if (ele.rowId !== Number(elemId)) {
            return ele;
          }
          success = true;
          return;
        })
      );
      console.log(success);
      return success;
    },
    [table]
  );

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
