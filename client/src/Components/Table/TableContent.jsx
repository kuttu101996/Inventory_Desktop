import React, { useCallback, useState } from "react";
import "./TableContent.css";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import RequiredBillInfo from "../RequiredBillInfo/RequiredBillInfo";
import TableBody from "../TableBody/TableBody";
import AfterTable from "../AfterTable/AfterTable";
import { useTableState } from "../../context/TableContext";
import { NavLink } from "react-router-dom";
// import TableAmountCalculation from "../TableAmountCalculation/TableAmountCalculation";

function TableContent() {
  const { table, setTable } = useTableState();

  const handleAddDoc = () => {};

  const handleAddPatient = () => {};

  const handleAddRow = useCallback(() => {
    if (table[table.length - 1].testName === "") {
      swal(
        "Your last row is Empty, \nPlease select atleast one Test to add another Row."
      );
      return;
    }

    let newRow = {
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
    };
    setTable([...table, newRow]);
  }, [table, setTable]);

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-4 relative">
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-lg font-semibold">Generate Bill</h2>
          <p className="mt-1 text-sm text-gray-700">Bill Information</p>
        </div>
        <div className="flex gap-3">
          <NavLink
            to={"add_vendor"}
            className="rounded-lg text-white transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
          >
            <button
              id="add_doc_btn"
              type="button"
              className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleAddDoc}
            >
              Add Vendor
            </button>
          </NavLink>
          <NavLink
            to={"add_product"}
            className="rounded-lg text-white transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
          >
            <button
              type="button"
              className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-green-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              onClick={handleAddPatient}
            >
              Add Product
            </button>
          </NavLink>
        </div>
      </div>

      <RequiredBillInfo />

      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block align-middle w-full">
            <div className="table-wrapper overflow-hidden overflow-y-scroll border border-gray-400 border-l-0 border-r-0">
              {/* above  md:rounded-lg */}
              <table className="divide-y divide-gray-300 border border-l-0 border-r-0 border-gray-300 w-full">
                <thead className={`bg-gray-50 sticky top-0 z-10`}>
                  <tr className="divide-x divide-gray-300">
                    <th
                      scope="col"
                      className="px-1.5 py-1 text-left text-xs text-gray-600 w-24"
                    >
                      <span>SR No.</span>
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-52"
                      //   font-normal
                    >
                      <span>Product Name</span>
                      <button
                        className="px-1 py-0.5 ml-2 bg-green-600 rounded"
                        onClick={handleAddRow}
                      >
                        <FontAwesomeIcon className="text-white" icon={faPlus} />
                      </button>
                    </th>
                    {/* Test date */}
                    {/* <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-28"
                    >
                      Test Date
                    </th> */}
                    {/* Report Date */}
                    {/* <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-28"
                    >
                      Report Date
                    </th> */}
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600"
                    >
                      Qty
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-24"
                    >
                      Rate
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-16"
                    >
                      Gross
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-24"
                    >
                      MRP
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-16"
                    >
                      Disc.%
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600 w-24"
                    >
                      Discount
                    </th>
                    <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-xs text-gray-600"
                    >
                      Amount
                    </th>
                    {/* <th
                      scope="col"
                      className="px-2 py-1.5 text-left text-sm text-gray-600"
                    >
                      Disc.%
                    </th> */}
                    <th scope="col" className="relative px-4 py-3.5">
                      {/* <span className="sr-only">Edit</span> */}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.length > 0 &&
                    table.map((ele, index) => (
                      <TableBody
                        key={ele.rowId}
                        element={ele}
                        // setTable={setTable}
                      />
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <AfterTable />
      {/* <TableAmountCalculation /> */}
    </section>
  );
}
export default TableContent;
