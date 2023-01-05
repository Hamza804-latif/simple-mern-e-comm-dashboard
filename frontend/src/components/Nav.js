import { NavLink, useNavigate } from "react-router-dom";

const Nav = () => {
  let auth = localStorage.getItem("user");
  const navigate = useNavigate();

  const Logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  let activeStyle = { color: "white" };
  return (
    <>
      {auth ? (
        <ul className="nav-ul">
          <li>
            <NavLink
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/add"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Add Product
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/update"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Update Product
            </NavLink>
          </li> */}

          <li>
            <NavLink
              to="/profile"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              onClick={Logout}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Logout ({JSON.parse(auth)?.user?.name})
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-ul-right">
          <li>
            <NavLink
              to="/signup"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              signup
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/login"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );
};
export default Nav;
