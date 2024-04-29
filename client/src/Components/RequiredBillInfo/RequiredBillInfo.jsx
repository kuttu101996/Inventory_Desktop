import React, { useCallback, useEffect, useRef, useState } from "react";
import "./RequiredBillInfo.css";
import swal from "sweetalert";
import { useTableState } from "../../context/TableContext";

function RequiredBillInfo() {
  const { tableLastRowID, setTableLastRowID } = useTableState();
  const [name, setName] = useState("Quick");
  const [dob, setDob] = useState("");
  const [number, setNumber] = useState("");
  const [customerType, setCustomerType] = useState("Quick");

  const [showPhoneNumberError, setShowPhoneNumberError] = useState(false);
  const inputRef = useRef(null);

  const handleBlur = useCallback((e) => {
    if (e.target.value.length < 10 || e.target.value.length > 12) {
      setShowPhoneNumberError(true);
      setTimeout(() => {
        setShowPhoneNumberError(false);
      }, 3000);
      // inputRef.current.focus();
    }
  }, []);

  const handleNumberChange = (e) => {
    setShowPhoneNumberError(false);
    setNumber(e.target.value);
  };

  useEffect(() => {
    const handleShiftTab = async (e) => {
      if (e.key === "Enter") {
        if (document.activeElement === document.getElementById("customerName"))
          document.getElementById("customerAge").focus();
        else if (
          document.activeElement === document.getElementById("customerAge")
        )
          document.getElementById("customerNumber").focus();
        else if (
          document.activeElement === document.getElementById("customerNumber")
        ) {
          if (e.target.value.length < 10 || e.target.value.length > 12) {
            setShowPhoneNumberError(true);
            setTimeout(() => {
              setShowPhoneNumberError(false);
            }, 3000);
          }
          if (e.target.value.length >= 10 && e.target.value.length <= 12) {
            if (name !== "" && dob !== "") {
              await fetch(`http://localhost:port/api/user/${number}`)
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === "Success") {
                    setName(data.data.name);
                    setDob(data.data.dob);
                    setCustomerType("Regular");
                    return;
                  }
                  swal(
                    "No user register with this number, \nPlease fill the name & dob to add a new customer."
                  );
                })
                .catch((error) => console.log(error));
            } else {
              await fetch(`http://localhost:port/api/user/add`, {
                method: "POST",
                headers: {
                  "Content-type": "application/json",
                  charset: "utf-8",
                },
                body: JSON.stringify({ name, dob, number, customerType }),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.message === "Success") {
                    setName(data.data.name);
                    setDob(data.data.dob);
                    setCustomerType("Regular");
                    return;
                  }
                  // swal(
                  //   "No user register with the entered number, \nPlease select atleast one Test to add another Row."
                  // );
                });
            }
          }
        }
      } else if (e.ctrlKey && e.key === "ArrowDown") {
        document.getElementById("print_prev").focus();
      } else if (e.ctrlKey && e.key === "ArrowUp") {
        document.getElementById("add_doc_btn").focus();
      } else if (
        // e.shiftKey
        e.ctrlKey &&
        e.key === "Tab"
      ) {
        let rowToFocus = document.querySelectorAll(".search-input");
        e.preventDefault();
        // Check if focus is currently on RequiredBillInfo input
        if (document.activeElement === inputRef.current) {
          // Shift focus to TableBody
          if (rowToFocus.length > 0) {
            rowToFocus[rowToFocus.length - 1].focus();
          }
        } else if (
          document.activeElement === rowToFocus[rowToFocus.length - 1]
        ) {
          document.getElementById("grossTotal").focus();
        } else {
          // Shift focus to RequiredBillInfo input
          inputRef.current.focus();
        }
      } else if (e.ctrlKey && e.key === "ArrowRight") {
        document.activeElement === document.getElementById("grossTotal")
          ? document.getElementById("print_prev").focus()
          : "";
      }
    };

    document.addEventListener("keydown", handleShiftTab);

    return () => {
      document.removeEventListener("keydown", handleShiftTab);
    };
  }, [name, dob, number, customerType]);

  return (
    <div className="pt-4 bg-gray-300 flex items-center justify-between w-full">
      <div className="text-xs text-gray-800 flex items-center justify-between w-2/4">
        <div className="w-2/4">
          <div className="flex flex-col px-2 mx-3 mb-1">
            {/* pat name */}
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xs leading-3">
                Customer Name <span className="text-red-600">*</span>{" "}
              </label>
              <input
                value={name}
                type="text"
                id="customerName"
                className="p-1 rounded focus:ring-2"
                placeholder="Customer name"
                onChange={(e) => setName(e.target.value)}
                ref={inputRef}
              />
            </div>
          </div>
          <div className="flex flex-col px-3 mx-2 mb-1">
            {/* age */}
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xs leading-3">
                Age <span className="text-red-600">*</span>{" "}
              </label>
              <div className="flex">
                <input
                  value={dob}
                  type="number"
                  id="customerAge"
                  className="p-1 rounded w-10 mr-1 focus:ring-2"
                  placeholder="Age"
                  onChange={(e) => setDob(e.target.value)}
                />
                <input type="date" className="p-1 rounded focus:ring-2" />
              </div>
            </div>
          </div>
        </div>
        <div className="w-2/4">
          <div className="flex flex-col px-2 mx-3 mb-1">
            {/* mobile */}
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xs leading-3">
                Mobile Number <span className="text-red-600">*</span>{" "}
              </label>
              <div className="w-1/2">
                <div className="absolute">
                  {showPhoneNumberError && (
                    <p
                      style={{
                        color: "red",
                        position: "relative",
                        top: -15,
                        fontSize: "10px",
                      }}
                    >
                      Enter a valid mobile number
                    </p>
                  )}
                </div>
                <input
                  value={number}
                  type="number"
                  id="customerNumber"
                  min={10}
                  onBlur={handleBlur}
                  // onKeyPress={handleKeyPress}
                  onChange={handleNumberChange}
                  className="p-1 rounded w-full focus:ring-2"
                  placeholder="Enter mobile number"
                  // ref={inputRef}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-2 mx-3 mb-1">
            {/* Customer Type */}
            <div className="flex items-center justify-between">
              <label htmlFor="" className="text-xs leading-3">
                Customer Type <span className="text-red-600">*</span>{" "}
              </label>
              <select
                name="typeCus"
                id="typeCus"
                onChange={(e) => setCustomerType(e.target.value)}
                className="p-1 rounded border focus:outline-none focus:ring-2 w-1/2"
              >
                <option value="Quick">Quick</option>
                <option value="Regular">Regular</option>
              </select>
              {/* <div className="w-1/2">
                <input
                  value={customerType}
                  type="text"
                  className="p-1 w-full rounded"
                  onChange={(e) => setCustomerType(e.target.value)}
                />
              </div> */}
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col w-2/4 pr-5">
          <div className="flex my-4 items-center justify-between">
            <div className="flex w-1/2 items-center justify-between pr-5">
              <label htmlFor="collector">Collector</label>
              <div className="w-1/2">
                <InputSearchSuggestion
                  name={"users"}
                  placeholder={"Collector Name..."}
                />
              </div>
            </div>
            <div className="flex w-1/2 items-center justify-between">
              <label htmlFor="patType" className="text-xs leading-3">
                CP/Ref./Corp. <span className="text-red-600">*</span>{" "}
              </label>
              <div className="w-1/2">
                <InputSearchSuggestion
                  name={"patientType"}
                  placeholder={"Type Of Patient..."}
                />
              </div>
            </div>
          </div>
          
          <div className="flex gap-10 mb-5 mt-1">
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                name=""
                id="urgent"
                checked={urgent}
                onChange={() => setUrgent((prev) => !prev)}
              />
              <label htmlFor="urgent">Urgent</label>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                name="homeCollect"
                id="homeCollect"
                checked={homeCollect}
                onChange={() => setHomeCollect((prev) => !prev)}
              />
              <label htmlFor="homeCollect">Home Collection</label>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                className="w-4 h-4"
                name="homeDeliv"
                id="homeDeliv"
                checked={homeDeliv}
                onChange={() => setHomeDeliv((prev) => !prev)}
              />
              <label htmlFor="homeDeliv">Home Delivery</label>
            </div>
            <div className="flex items-center justify-center gap-2">
              <input
                type="checkbox"
                name="passOn"
                id="passOn"
                className="w-4 h-4"
                checked={passOn}
                onChange={() => setPassOn((prev) => !prev)}
              />
              <label htmlFor="passOn">Pass On</label>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="w-2/5"></div> */}
    </div>
  );
}

export default RequiredBillInfo;
