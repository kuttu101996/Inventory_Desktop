import React from "react";
import TableContent from "../Table/TableContent";
import { TableProvider } from "../../context/TableContext";
import { BillProvider, useBillState } from "../../context/BillContext";

function Dashboard() {
  return (
    <div className="flex">
      <TableProvider>
        <TableContent />
      </TableProvider>
      <Comp />
      {/* <div className="w-24"></div> */}
    </div>
  );
}

function Comp() {
  const { bills, createNewBill } = useBillState();
  //   console.log(bills[0]);
  return <button onClick={createNewBill}>New Bill</button>;
}

export default Dashboard;
