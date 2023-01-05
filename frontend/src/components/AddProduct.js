import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const AddProductData = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
    } else {
      let userId = JSON.parse(localStorage.getItem("user"))?.user?._id;
      let token = JSON.parse(localStorage.getItem("auth"));
      let result = await fetch("http://localhost:5000/add-product", {
        method: "post",
        body: JSON.stringify({ name, price, category, company, userId }),
        headers: {
          "Content-Type": "application/json",
          auth: `beraer ${token}`,
        },
      });
      result = await result.json();
      if (result) {
        alert(result?.message);
        navigate("/");
      } else {
        alert(result?.message);
      }
      setError(false);
    }
  };

  return (
    <div className="register">
      <h1>Add Product!</h1>
      <input
        className={`inputbox ${error && !name && "redborder"}`}
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <input
        className={`inputbox ${error && !price && "redborder"}`}
        type="text"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => {
          setPrice(e.target.value);
        }}
      />
      <input
        className={`inputbox ${error && !category && "redborder"}`}
        type="text"
        placeholder="Enter Category"
        value={category}
        onChange={(e) => {
          setCategory(e.target.value);
        }}
      />

      <input
        className={`inputbox ${error && !company && "redborder"}`}
        type="text"
        placeholder="Enter Company name"
        value={company}
        onChange={(e) => {
          setCompany(e.target.value);
        }}
      />

      <button className="registerbtn" onClick={AddProductData}>
        Add Product
      </button>
    </div>
  );
};

export default AddProduct;
