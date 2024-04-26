import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./InputSearchSuggestion.css";
import { useTableState } from "../../context/TableContext";

function InputSearchSuggestion({ name, placeholder, testName, id }) {
  // console.log("Rendering " + placeholder);
  const { table, setTable } = useTableState();
  const [inputValue, setInputValue] = useState(testName ? testName : "");
  const [selectedSuggestion, setSelectedSuggestion] = useState(
    name === "test-name" ? {} : ""
  );
  const [data, setData] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  const inputRef = useRef();
  const suggestionsRef = useRef();

  // setting the suggestions state on input change by filtering over the data state
  const handleInputChange = useCallback(
    (e) => {
      const value = e.target.value;
      setInputValue(value);
      setSelectedSuggestion(name === "test-name" ? {} : "");
      const filteredData =
        data.length &&
        data.filter(
          (item) =>
            item.name?.toLowerCase().includes(value.toLowerCase()) ||
            item.title?.toLowerCase().includes(value.toLowerCase()) ||
            item.testName?.toLowerCase().includes(value.toLowerCase())
        );
      setSuggestions(filteredData || []);
    },
    [data]
  );

  // Responsible for many tasks
  const handleKeyDown = useCallback(
    (e, suggestion) => {
      const currentFocus = document.activeElement;
      if ((inputValue === "" || !suggestions) && table.length <= 1) return;

      // IF the input field is empty then no down key event should perform
      if (
        (e.key === "ArrowUp" || e.key === "ArrowDown") &&
        currentFocus.classList.contains("search-input") &&
        table.length > 1 &&
        suggestions.length === 0
      ) {
        // e.preventDefault();
        let a = document.querySelectorAll(".search-input");
        let allSrchInp = [...a];
        allSrchInp.forEach((ele, index) => {
          if (ele === inputRef.current && e.key === "ArrowUp" && index !== 0) {
            allSrchInp[index - 1].focus();
            setInputValue(testName ? testName : "");
          } else if (
            ele === inputRef.current &&
            e.key === "ArrowDown" &&
            index !== allSrchInp.length - 1
          ) {
            allSrchInp[index + 1].focus();
            setInputValue(testName ? testName : "");
          }
          // else inputRef.current.focus();
        });
      } else if (
        e.key === "ArrowUp" &&
        currentFocus.classList.contains("suggestion")
      ) {
        e.preventDefault();
        const previousSuggestion = currentFocus.previousSibling;
        // if have any previous value then set the focus on that else set the focus on inputRef
        previousSuggestion
          ? previousSuggestion.focus()
          : inputRef.current.focus();
      } else if (e.key === "ArrowDown" && suggestions.length > 0) {
        if (currentFocus.classList.contains("search-input")) {
          // console.log(suggestions);
          e.preventDefault();
          const suggestionToFocus =
            suggestionsRef.current.querySelectorAll(".suggestion");
          suggestionToFocus.length > 0 ? suggestionToFocus[0].focus() : "";
        } else if (currentFocus.classList.contains("suggestion")) {
          e.preventDefault();
          const nextSuggestion = currentFocus.nextSibling;
          nextSuggestion ? nextSuggestion.focus() : "";
        }
      } else if (e.key === "Enter") {
        e.preventDefault();
        setInputValue(suggestion.name || suggestion.title);
        setSelectedSuggestion(suggestion);
        setSuggestions([]);

        // inputRef.current.focus();
      }
    },
    [inputValue, suggestions, table]
  );

  const handleSuggestionClick = useCallback((suggestion) => {
    setInputValue(suggestion.name || suggestion.title);
    setSelectedSuggestion(suggestion);
    setSuggestions([]);
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/${name}`)
      .then((res) => res.json())
      .then((result) => setData(result))
      .catch((error) => console.log("Error fetching data: ", error));
  }, [name]);

  useEffect(() => {
    if (selectedSuggestion) {
      // console.log(selectedSuggestion);
      if (testName !== "") {
        let updatedTable = table.map((elem) => {
          if (elem.rowId === id) {
            elem.testName = selectedSuggestion.name || selectedSuggestion.title;
            // elem.department =
            //   selectedSuggestion.username || selectedSuggestion.userId;
            return elem;
          }
          return elem;
        });
        setTable(updatedTable);
        return;
      } else {
        const updatedTable = [...table];
        let newRow = { ...table[table.length - 1] };
        newRow.rowId = Date.now();

        let lastRow = { ...table[table.length - 1] };
        lastRow.testName = selectedSuggestion.name || selectedSuggestion.title;
        // lastRow.department =
        //   selectedSuggestion.username || selectedSuggestion.userId;

        updatedTable[table.length - 1] = lastRow;
        updatedTable.push(newRow);

        setTable(updatedTable);
        // setInputValue("");
        setSelectedSuggestion(name === "test-name" ? {} : "");
      }
    }
  }, [selectedSuggestion, setSelectedSuggestion]);

  useLayoutEffect(() => {
    let rowToFocus = document.querySelectorAll(".search-input");
    if (rowToFocus.length > 0) {
      rowToFocus[rowToFocus.length - 1].focus();
    }
  }, [table, selectedSuggestion]);

  const handleClickOutside = useCallback(
    (e) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(e.target)
      ) {
        setSuggestions([]);
      }
    },
    [setSuggestions]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  const memoizedSuggestions = useMemo(() => suggestions || [], [suggestions]);

  return (
    <div className="search-box">
      <input
        type="text"
        value={
          inputValue
          // inputRef.current === document.activeElement ? inputValue : testName
        }
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="search-input"
        ref={inputRef}
        id={id}
      />
      {(inputValue || suggestions) && (
        <div
          className={`suggestions_container ${!suggestions.length && "w-0"}`}
          ref={suggestionsRef}
        >
          <div className="suggestions">
            {memoizedSuggestions.map((suggestion, index) => (
              <div
                key={index}
                className={`suggestion ${
                  selectedSuggestion === suggestion ? "selected" : ""
                }`}
                onClick={() => handleSuggestionClick(suggestion)}
                onKeyDown={(e) => {
                  handleKeyDown(e, suggestion);
                }}
                tabIndex={0}
              >
                {suggestion.name || suggestion.title}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default InputSearchSuggestion;
