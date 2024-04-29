import React, { useRef, useState } from "react";
import Select from "react-select";
import "./AfterTable.css";

function AfterTable() {
  const [grossTotal, setGrossTotal] = useState(0);
  const [disType, setDisType] = useState("");
  const [disPercent, setDisPercent] = useState(0);
  const [disAmt, setDisAmt] = useState(0);
  const [disReason, setDisReason] = useState("");
  const [revAmt, setRevAmt] = useState(0);
  const [totalMRP, setTotalMRP] = useState(0);
  const [netAmt, setNetAmt] = useState(0);
  const [pmtMode, setPmtMode] = useState(0);
  const [paidAmt, setPaidAmt] = useState(0);
  const [pmtRemark, setPmtRemark] = useState("");
  const [dueAmt, setDueAmt] = useState(0);

  const inputRef = useRef(null);

  const disTypeOptions = [
    { value: "#", label: "Not Applicable" },
    { value: "admin", label: "Admin" },
    { value: "srCitizen", label: "Sr. Citizen" },
    { value: "upi", label: "UPI" },
  ];

  const pmtModeOptions = [
    { value: "cash", label: "Cash" },
    { value: "cheque", label: "Cheque" },
    { value: "upi", label: "UPI" },
  ];

  return (
    <div className="flex justify-between text-xs">
      <div className="w-1/2 flex flex-col border">
        <div className="flex justify-between items-center border-b p-2 pr-6">
          <label htmlFor="grossTotal">Gross Total</label>
          <input
            value={grossTotal}
            type="number"
            name="grossTotal"
            id="grossTotal"
            ref={inputRef}
            readOnly
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setGrossTotal(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center border-b p-2 pr-6">
          <label htmlFor="disType">Discount Type</label>
          <Select
            // placeholder="Select discount type..."
            // defaultValue={disTypeOptions[0].label}
            // defaultInputValue={disTypeOptions[0].label}
            value={disType}
            onChange={setDisType}
            options={disTypeOptions}
            className="rounded w-1/3"
          />
          {/* <input
            value={disType}
            type="number"
            name="disType"
            id="disType"
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setDisType(e.target.value)}
          /> */}
        </div>
        <div className="flex justify-between items-center border-b p-2 pr-6">
          <label>Discount</label>
          <div className="flex items-center w-2/4">
            <input
              value={disPercent}
              type="number"
              className="border border-gray-300 border-solid p-1 rounded max-w-20 mr-1 text-right"
              onChange={(e) => setDisPercent(e.target.value)}
            />
            %
            <input
              value={disAmt}
              type="number"
              className="border border-gray-300 border-solid p-1 rounded w-2/3 ml-1 text-right"
              onChange={(e) => setDisAmt(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between items-center border-b p-2 pr-6">
          <label htmlFor="disReason">
            Please enter a valid reason for the discount.
          </label>
          <textarea
            value={disReason}
            name="disReason"
            id="disReason"
            rows="1"
            placeholder="Discount reason here..."
            className="border border-gray-300 border-solid p-1 rounded w-1/3 outline-none"
            onChange={(e) => setDisReason(e.target.value)}
          ></textarea>
        </div>
        <div className="flex justify-between items-center border-b p-2 pr-6">
          <label htmlFor="totalMRP">Reverse Amount</label>
          <input
            value={revAmt}
            type="number"
            name="totalMRP"
            id="totalMRP"
            readOnly
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setRevAmt(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center border-b p-2 pr-6">
          <label htmlFor="pmtRemark">Payment Remarks</label>
          <textarea
            value={pmtRemark}
            name="pmtRemark"
            id="pmtRemark"
            rows="2"
            className="border border-gray-300 border-solid p-1 rounded w-1/3 outline-none"
            onChange={(e) => setPmtRemark(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="w-1/2 flex flex-col">
        <div className="flex justify-between items-center border-b border-r p-2 pl-6">
          <label htmlFor="totalMRP">Total MRP</label>
          <input
            value={totalMRP}
            type="number"
            name="totalMRP"
            id="totalMRP"
            readOnly
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setTotalMRP(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center border-b border-r p-2 pl-6">
          <label htmlFor="pmtMode">Payment Mode</label>
          <Select
            placeholder="Select payment mode..."
            defaultValue={pmtMode}
            onChange={setPmtMode}
            options={pmtModeOptions}
            className="rounded w-1/3"
          />
          {/* <input
            value={pmtMode}
            type="text"
            name="pmtMode"
            id="pmtMode"
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setPmtMode(e.target.value)}
          /> */}
        </div>
        <div className="flex justify-between items-center border-b border-r p-2 pl-6">
          <label htmlFor="netAmt">Net Amount</label>
          <input
            value={netAmt}
            type="text"
            name="netAmt"
            id="netAmt"
            readOnly
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setNetAmt(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center border-b border-r p-2 pl-6">
          <label htmlFor="paidAmt">Paid Amount</label>
          <input
            value={paidAmt}
            type="text"
            name="paidAmt"
            id="paidAmt"
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setPaidAmt(e.target.value)}
          />
        </div>
        <div className="flex justify-between items-center border-b border-r p-2 pl-6">
          <label htmlFor="dueAmt">Due Amount</label>
          <input
            value={dueAmt}
            type="text"
            name="dueAmt"
            id="dueAmt"
            readOnly
            className="border border-gray-300 border-solid p-1 rounded w-1/3 text-right"
            onChange={(e) => setDueAmt(e.target.value)}
          />
        </div>
        <div className="w-full p-2 pb-0 h-14">
          <div className="w-full h-full flex items-end justify-end gap-x-4">
            <button
              id="print_prev"
              type="button"
              className="rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Print Preview
            </button>
            <button
              type="button"
              className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Save
            </button>
            <button
              type="button"
              className="rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Save & Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AfterTable;
