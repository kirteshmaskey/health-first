import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "./contextprovider/UserContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { UserData, LoginStatus } = useContext(UserContext);
  const { loginUser, setLoginUser } = UserData;
  const { loggedIn, setLoggedIn } = LoginStatus;

  const handleLogout = async () => {
    localStorage.removeItem("usertoken");
    setLoginUser("");
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <nav
      className="navbar navbar-expand-sm rounded mb-2"
      style={{ backgroundColor: "#e0e0eb" }}
    >
      <div className="container-fluid ps-4 d-flex justify-content-between">
        <span className="navbar-brand text-decoration-none">
          <Link to={loggedIn ? "/home" : "/"} className="text-decoration-none fs-3">
            Health First
          </Link>
        </span>
        {loggedIn ? (
          <button onClick={handleLogout} className="btn btn-danger px-3 py-1">
            Logout
          </button>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
