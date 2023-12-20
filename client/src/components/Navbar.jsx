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
      <div className="container-fluid ps-4">
        <span className="navbar-brand text-decoration-none">
          <Link to="/" className="text-decoration-none fs-3">
            Health First
          </Link>
        </span>
        {loggedIn ? (
          <>
            <ul className="navbar-nav">
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-danger px-3 py-1"
                >
                  Logout
                </button>
              </li>
            </ul>
          </>
        ) : (
          <></>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
