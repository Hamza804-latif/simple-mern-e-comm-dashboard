import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const UpdateProductData = async () => {
    if (!name || !price || !category || !company) {
      setError(true);
    } else {
      let token = JSON.parse(localStorage.getItem("auth"));
      let result = await fetch("http://localhost:5000/update", {
        method: "put",
        body: JSON.stringify({
          _id: params.id,
          name,
          price,
          category,
          company,
        }),
        headers: {
          "Content-Type": "application/json",
          auth: `bearer ${token}`,
        },
      });
      result = await result.json();
      setError(false);
      if (result) {
        alert(result?.message);
        navigate("/");
      } else {
        alert("some error occured ");
      }
    }
  };
  useEffect(() => {
    Data();
  }, []);
  async function Data() {
    let token = JSON.parse(localStorage.getItem("auth"));
    let result = await fetch(`http://localhost:5000/product/${params.id}`, {
      headers: { auth: `bearer ${token}` },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  return (
    <div className="register">
      <h1>Update Product!</h1>
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

      <button className="registerbtn" onClick={UpdateProductData}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
