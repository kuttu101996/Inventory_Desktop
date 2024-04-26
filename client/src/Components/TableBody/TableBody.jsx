import React, { useState } from "react";
import "./TableBody.css";
import swal from "sweetalert";
import InputSearchSuggestion from "../InputSearchSuggestion/InputSearchSuggestion";
import { useTableState } from "../../context/TableContext";

function TableBody({ element }) {
  const { handleDeleteRow } = useTableState();
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState("");

  return (
    // <tr className="divide-x divide-gray-300">
    <tr className="w-full">
      {/* Sr No */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1">
          {/* <div className="w-48"> */}
          <input
            type="text"
            value={element.department}
            className="border border-gray-200 rounded px-1 py-1 outline-none w-24"
            onChange={() => {}}
          />
          {/* </div> */}
          {/* <input
            type="text"
            className="border border-gray-200 rounded px-2 py-1 outline-none w-48"
          /> */}
        </div>
      </td>
      {/* Product Name */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1 w-96">
          <InputSearchSuggestion
            testName={element.testName}
            name={"users"}
            // name={"test-name"}
            placeholder={"Product Name"}
            id={element.rowId}
          />
        </div>
      </td>
      {/* Test Date */}
      {/* <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1">
          <input
            type="date"
            value={today}
            className="border border-gray-200 rounded px-2 py-1 outline-none w-28"
            readOnly
          />
        </div>
      </td> */}
      {/* Report Date */}
      {/* <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1">
          <input
            value={selectedDate}
            type="date"
            className="border border-gray-200 rounded px-2 py-1 outline-none w-28"
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
      </td> */}
      {/* Qty */}
      <td className="whitespace-nowrap">
        <div
          className="text-xs px-1 py-1 overflow-hidden"
          // style={{ width: "44px" }}
        >
          <input
            type="number"
            value={element.qty}
            className="border border-gray-200 text-xs rounded pl-2 py-1 w-16 outline-none"
            onChange={() => {}}
          />
        </div>
      </td>
      {/* Rate */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1">
          <input
            value={element.rate}
            type="number"
            readOnly
            className="border border-gray-200 rounded px-2 py-1 outline-none w-28"
          />
        </div>
      </td>
      {/* Gross */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1 w-24">
          {/* <input
                          type="text"
                          className="border border-gray-200 rounded px-2 py-1 outline-none"
                        /> */}
        </div>
      </td>
      {/* MRP */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1 w-24">
          <input
            type="text"
            readOnly
            className="border border-gray-200 rounded px-2 py-1 outline-none w-full"
          />
        </div>
      </td>
      {/* Disc.% */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1">
          <input
            type="text"
            readOnly
            className="border border-gray-200 rounded px-2 py-1 outline-none w-16"
          />
        </div>
      </td>
      {/* Discount */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1">
          <input
            type="text"
            readOnly
            className="border border-gray-200 rounded px-2 py-1 outline-none w-24"
          />
        </div>
      </td>
      {/* Amount */}
      <td
        className="whitespace-nowrap"
        // style={{ width: "75px" }}
      >
        <div className="text-xs px-1 py-1 w-28">
          {/* <input
                          type="text"
                          readOnly
                          className="border border-gray-200 rounded px-2 py-1 outline-none"
                        /> */}
        </div>
      </td>
      {/* delete */}
      <td className="whitespace-nowrap">
        <div className="text-xs px-1 py-1 w-16">
          <button
            id="row_dlt_btn"
            className="px-1 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => {
              // swal({
              //   title: "Are you sure?",
              //   text: "You won't be able to revert this!",
              //   icon: "warning",
              //   buttons: true,
              //   dangerMode: true,
              //   className: "setWidth",
              // })
              // .then((willDelete) => {
              //   if (willDelete) {
              //     swal(
              //       "Poof! Your imaginary file has been deleted!",
              //       {
              //         icon: "success",
              //       }
              //     );
              //   } else {
              //     swal("Your imaginary file is safe!");
              //   }
              // })

              swal(
                // "A wild Pikachu appeared! What do you want to do?",
                {
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  dangerMode: true,
                  className: "setWidth",
                  buttons: {
                    catch: {
                      text: "Yes delete it!",
                      value: "catch",
                    },
                    // defeat: true,
                    cancel: "Cancel",
                  },
                }
              ).then((value) => {
                switch (value) {
                  case "catch":
                    handleDeleteRow(element.rowId);
                    // swal(
                    //   "Gotcha!",
                    //   "Pikachu was caught!",
                    //   "success"
                    // );
                    break;

                  // default:
                  // swal("Got away safely!");
                }
              });
            }}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TableBody;
