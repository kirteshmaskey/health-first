import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import CircularLoading from "../reusable/CircularLoading";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [btnClicked, setBtnClicked] = useState(false);
  const [isData, setIsData] = useState(false);

  const setValue = (e) => {
    const { name, value } = e.target;

    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setBtnClicked(true);
    const { email, password } = user;

    if (email === "") {
      toast.warning("Email is required");
    } else if (!email.includes("@")) {
      toast.warning("Invalid email");
    } else if (password === "") {
      toast.warning("Password is required");
    } else {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });

      if (response.data.status === 201) {
        localStorage.setItem("usertoken", response.data.token);
        navigate("/home");
        // toast.success(response.data.message);
      } else {
        toast.warning(response.data.message);
      }
    }
    setBtnClicked(false);
  };

  const autoLogin = async () => {
    const token = localStorage.getItem("usertoken");

    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/api/auth/valid-user`, {
          headers: {
            "Content-Type": "application/json",
            usertoken: token,
          },
        });

        if (response.data.status === 201) {
          navigate("/home");
          // toast.success(response.data.message);
        } else {
          setIsData(true);
        }
      } catch (error) {}
    } else {
      setIsData(true);
    }
  };

  useEffect(() => {
    autoLogin();
  }, []);

  return (
    <>
      {isData ? (
        <div className="container my-5">
          <div className="row justify-content-center">
            <div className="col-md-6 border rounded-2 shadow p-4">
              <h2 className="text-center">Sign In</h2>
              <form>
                <div className="form-group my-4">
                  <label htmlFor="email">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    onChange={setValue}
                    value={user.email}
                    id="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="form-group my-4">
                  <label htmlFor="password">
                    Password <span className="text-danger">*</span>
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    onChange={setValue}
                    value={user.password}
                    id="password"
                    placeholder="Enter your Password"
                  />
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary text-align-center px-4"
                    onClick={handleLogin}
                    disabled={btnClicked}
                  >
                    {!btnClicked ? "Login" : "Logging in..."}
                  </button>
                </div>
              </form>
              <div className="text-center my-3">
                <p className="">
                  Don't have an account?{" "}
                  <span>
                    <Link to="/register">Register</Link>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CircularLoading />
      )}
    </>
  );
};

export default Login;
