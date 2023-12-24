import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contextprovider/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import CircularLoading from "../reusable/CircularLoading";
import Appointments from "./Appointments";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const { UserData, LoginStatus } = useContext(UserContext);
  const { loginUser, setLoginUser } = UserData;
  const { loggedIn, setLoggedIn } = LoginStatus;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const navigate = useNavigate();

  const navItems = [
    { to: "/home/schedule-appointment", name: "Schedule Appointment" },
    { to: "/home/diet-and-tips", name: "Diet and Tips" },
    { to: "/home/talk", name: "Talk Bot" },
    { to: "/home/bmi", name: "BMI Calculator" },
  ];

  const SidebarContent = () => (
    <div className="p-4">
      <h5>{loginUser.fname + " " + loginUser.lname}</h5>
      <ul className="nav nav-pills flex-column mt-2">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item">
            <NavLink
              to={item.to}
              className="nav-link"
              activeClassName="active"
              onClick={toggle}
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );

  const Sidebar = () => (
    <div
      className={`d-flex flex-column bg-light border-right custom-style ${
        isOpen ? "" : "d-none d-md-flex"
      }`}
      style={{ width: "250px" }}
    >
      <SidebarContent />
    </div>
  );

  const getUserDetails = async () => {
    const token = localStorage.getItem("usertoken");
    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/api/dash/getuserdata`, {
          headers: {
            "Content-Type": "application/json",
            usertoken: token,
          },
        });

        if (response.data.status === 201) {
          setLoginUser(response.data.user);
          setLoggedIn(true);
        } else if (
          response.data.status === 403 ||
          response.data.status === 401
        ) {
          localStorage.removeItem("usertoken");
          navigate("/");
          toast.info("Please login again!");
        }
      } catch (error) {
        // console.log(error.message);
      }
    } else {
      navigate("/");
      toast.info("Please login again!");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      {loggedIn ? (
        <>
          <div className="d-flex">
            <div>
              <button
                className="btn btn-primary d-md-none"
                type="button"
                onClick={toggle}
              >
                ☰
              </button>

              <Sidebar />
            </div>

            <div className="flex-grow-1 px-lg-5">
              {window.location.pathname === "/home" ? (
                <Appointments />
              ) : (
                <Outlet />
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <CircularLoading />
        </>
      )}
    </>
  );
};

export default Home;
