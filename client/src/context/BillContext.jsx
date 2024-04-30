import { createContext, useContext, useEffect, useState } from "react";

export const BillContext = createContext(null);

export function BillProvider({ children }) {
  const [billCounter, setBillCounter] = useState(0);
  const [initialBillNo, setInitialBillNo] = useState("");
  const [selectedBill, setSelectedBill] = useState(null);

  // const fetchLastBillNumberFromDatabase = () => "29D04M2024Y15H44M36S1";
  const fetchLastBillNumberFromDatabase = () => "15H44M36S1";

  useEffect(() => {
    // Fetch the last bill number from the database or any storage mechanism
    // Example: Assume fetchLastBillNumberFromDatabase is a function that fetches the last bill number from the database
    const lastBillNumber = fetchLastBillNumberFromDatabase();
    if (lastBillNumber) {
      // setBillCounter(parseInt(lastBillNumber.substring(20)) + 1);
      setBillCounter(parseInt(lastBillNumber.substring(9)) + 1);
      setInitialBillNo(
        lastBillNumber.substring(0, 9) +
          String(parseInt(lastBillNumber.substring(9)) + 1)
      );
      setSelectedBill(
        lastBillNumber.substring(0, 9) +
          String(parseInt(lastBillNumber.substring(9)) + 1)
      );
      // setInitialBillNo(
      //   lastBillNumber.substring(0, 20) +
      //     String(parseInt(lastBillNumber.substring(20)) + 1)
      // );
      // setSelectedBill(
      //   lastBillNumber.substring(0, 20) +
      //     String(parseInt(lastBillNumber.substring(20)) + 1)
      // );
    } else {
      // If there are no bills in the database, start the counter from 1
      setBillCounter(1);
      const currentDate = new Date();
      const formattedDate = `${currentDate.getHours()}H${currentDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}M${currentDate
        .getSeconds()
        .toString()
        .padStart(2, "0")}S`;

      // const formattedDate = `${currentDate.getDate()}D${(
      //   currentDate.getMonth() + 1
      // )
      //   .toString()
      //   .padStart(
      //     2,
      //     "0"
      //   )}M${currentDate.getFullYear()}Y${currentDate.getHours()}H${currentDate
      //   .getMinutes()
      //   .toString()
      //   .padStart(2, "0")}M${currentDate
      //   .getSeconds()
      //   .toString()
      //   .padStart(2, "0")}S`;
      setInitialBillNo(formattedDate + "000001");
    }
  }, []);

  const [bills, setBills] = useState([
    {
      billNo: "",
      billDate: "",
      customerName: "",
      customerAge: "",
      customerNumber: "",
      customerType: "",
      tableData: [],
      discountType: "",
      discountPercent: "",
      discountAmt: "",
      discountReason: "",
      reverseAmount: "",
      paymentRemarks: "",
      paymentMode: "",
      billTotal: "",
      paidAmt: "",
      dueAmt: "",
    },
  ]);

  const createNewBill = () => {
    // bills[bills.length - 1].billNo = initialBillNo;
    let newBill = { ...bills[bills.length - 1] };
    newBill.billNo = initialBillNo.substring(0, 20) + (billCounter + 1);
    newBill.billDate = "";
    newBill.customerName = "";
    newBill.customerAge = "";
    newBill.customerNumber = "";
    newBill.customerType = "";
    newBill.tableData = [];
    newBill.discountType = "";
    newBill.discountPercent = "";
    newBill.discountAmt = "";
    newBill.discountReaso = "";
    newBill.reverseAmount = "";
    newBill.paymentRemarks = "";
    newBill.paymentMode = "";
    newBill.billTotal = "";
    newBill.paidAmt = "";
    newBill.dueAmt = "";

    setBillCounter((prev) => prev + 1);
    setInitialBillNo(
      (prev) => prev.substring(0, 20) + (parseInt(prev.substring(20)) + 1)
    );
    setBills([...bills, newBill]);
  };

  const deleteHoldBill = (billNo) => {
    setBills((bill) => bill.filter((item) => item.billNo !== billNo));
  };

  console.log(initialBillNo);

  return (
    <BillContext.Provider
      value={{ bills, setBills, initialBillNo, createNewBill, deleteHoldBill }}
    >
      {children}
    </BillContext.Provider>
  );
}

export function useBillState() {
  return useContext(BillContext);
}
