import "./App.css";
import Login from "./Components/Login.jsx/Login.jsx";
import TableContent from "./Components/Table/TableContent.jsx";
import { TableProvider } from "./context/TableContext.jsx";

import { Route, Routes, useNavigate } from "react-router-dom";
import Layout from "./Layout.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import { useEffect } from "react";
import AddOrUpdateProduct from "./Components/AddOrUpdateProduct/AddOrUpdateProduct.jsx";
import VendorAddOrUpdate from "./Components/VendorAddOrUpdate/VendorAddOrUpdate.jsx";
import Sales from "./Components/Sales/Sales.jsx";
import Dashboard from "./Components/Dashboard/Dashboard.jsx";
import { BillProvider } from "./context/BillContext.jsx";

// Define your routes
const App = () => {
  const { isLoggedIn } = useAuth() || {};
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      // navigate("/login");
    }
  }, [isLoggedIn]);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route
          path=""
          element={
            <BillProvider>
              <Dashboard />
            </BillProvider>
            // <TableProvider>
            //   <TableContent />
            // </TableProvider>
          }
        />
        <Route path="add_product" element={<AddOrUpdateProduct />} />
        <Route path="add_vendor" element={<VendorAddOrUpdate />} />
        <Route path="sales" element={<Sales />} />
      </Route>
    </Routes>
  );
};

export default App;

// function App() {
//   return (
//     <div className="flex justify-between">
//       <Navbar />
//       {/* <Login /> */}
//       <TableProvider>
//         <TableContent />
//       </TableProvider>
//     </div>
//   );
// }
// export default App;
