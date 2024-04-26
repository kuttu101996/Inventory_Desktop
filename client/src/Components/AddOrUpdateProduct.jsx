import React, { useEffect, useState } from "react";

function AddOrUpdateProduct() {
  const [allProduct, setAllProduct] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    exp: "",
  });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users`)
      .then((res) => res.json())
      .then((data) => (data.length ? setAllProduct(data) : ""));
  }, []);

  return (
    <div className=" pl-16 w-full h-screen flex justify-between py-20">
      <div id="existing_products" className="w-1/2 mx-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className=" text-xl font-bold text-gray-500">All Product</h2>
          <div className="flex gap-3">
            <div>
              <input
                type="search"
                name=""
                id=""
                placeholder="Search product by name"
                className="ring-1 rounded-sm text-xs px-3 py-1 hover:ring-2 duration-100 focus:ring-2 min-w-52"
              />
              <button className="ring-1 rounded-sm text-xs px-2 py-1 ml-1 hover:ring-2 duration-100 focus:ring-2">
                Search
              </button>
            </div>
            <select
              name=""
              id=""
              className="ring-1 text-xs rounded-sm focus:outline-none hover:ring-2 focus:ring-2 duration-100 min-w-28 px-1"
            >
              <option value="#">All data</option>
              <option value="onemnth">1 month exp</option>
              <option value="threemnth">3 month exp</option>
            </select>
          </div>
        </div>
        <div className="ring-2 rounded-sm">
          {allProduct.length ? (
            allProduct.map((elem) => (
              <div key={elem.id} className="py-1 px-4 border-b">
                <h2>
                  Name -{" "}
                  <span className="text-sm text-blue-600 "> {elem.name}</span>
                </h2>
                <h2>
                  Price -{" "}
                  <span className="text-sm text-blue-600 "> {elem.price}</span>
                </h2>
                <h2>
                  Exp -{" "}
                  <span className="text-sm text-blue-600 "> {elem.exp}</span>
                </h2>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* rhs */}
      <div id="add_product" className=" w-1/3 pr-20">
        <h2 className=" text-xl font-bold text-gray-500 mb-5">
          Add new Product
        </h2>
        <div className=" pt-12 pb-5 px-9 ring-2 rounded-sm">
          <div className="flex items-center justify-between text-sm mb-3">
            <label htmlFor="product_name">Product Name</label>
            <input
              type="text"
              name="product_name"
              id="product_name"
              placeholder="Enter Product Name"
              className="p-2 w-52 ring-1 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-600 rounded"
            />
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <label htmlFor="mpr">MRP</label>
            <input
              type="number"
              name="mpr"
              id="mpr"
              className="p-2 w-52 ring-1 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600 rounded"
            />
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <label htmlFor="discount">Discount %</label>
            <input
              type="text"
              name="discount"
              id="discount"
              className="p-2 w-52 ring-1 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600 rounded"
            />
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <label htmlFor="billNo">Purchase Bill No</label>
            <input
              type="text"
              name="billNo"
              id="billNo"
              className="p-2 w-52 ring-1 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600 rounded"
            />
          </div>
          <div className="flex items-center justify-between text-sm mb-3">
            <label htmlFor="exp">EXPIRY</label>
            <input
              type="text"
              name="exp"
              id="exp"
              className="p-2 w-52 ring-1 placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-green-600 rounded"
            />
          </div>
          <div className="mt-10">
            <button className="bg-green-600 rounded-lg ring-2 ring-green-600 text-green-100 py-2 font-bold w-full">
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddOrUpdateProduct;
