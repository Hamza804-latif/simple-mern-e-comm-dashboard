import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [productslist, setProductList] = useState([]);
  useEffect(() => {
    GetProducts();
  }, []);
  const GetProducts = async () => {
    let token = JSON.parse(localStorage.getItem("auth"));
    let result = await fetch("http://localhost:5000/products", {
      headers: {
        auth: `bearer ${token}`,
      },
    });
    result = await result.json();
    setProductList(result);
  };
  const DeleteData = async (param) => {
    let token = JSON.parse(localStorage.getItem("auth"));
    let result = await fetch(`http://localhost:5000/product/${param}`, {
      method: "delete",
      headers: {
        auth: `bearer ${token}`,
      },
    });
    result = await result.json();
    if (result?.acknowledged) {
      alert("data deleted successfully");
      GetProducts();
    } else {
      alert("some error occured");
    }
  };

  const HandleSeaarch = async (event) => {
    let key = event.target.value;
    if (key) {
      let token = JSON.parse(localStorage.getItem("auth"));
      let result = await fetch(`http://localhost:5000/search/${key}`, {
        headers: {
          auth: `bearer ${token}`,
        },
      });
      result = await result.json();
      if (result) {
        setProductList(result);
      }
    } else {
      GetProducts();
    }
  };
  return (
    <div className="table-parent">
      <input
        type="text"
        placeholder="search"
        className="search"
        onChange={HandleSeaarch}
      />
      <table border="1px" className="table">
        <thead>
          <tr>
            <th>S.no</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Company</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productslist.length > 0 ? (
            productslist.map((elem, i) => {
              return (
                <>
                  <tr key={i + 1}>
                    <td>{i + 1}</td>
                    <td>{elem.name}</td>
                    <td>{elem.price}</td>
                    <td>{elem.category}</td>
                    <td>{elem.company}</td>
                    <td className="actions">
                      <i
                        class="bi bi-trash-fill"
                        onClick={() => DeleteData(elem._id)}
                      ></i>
                      <Link to={`/update/${elem?._id}`}>
                        <i class="bi bi-pencil-square"></i>
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })
          ) : (
            <tr>
              <td colSpan="6">No Data Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
