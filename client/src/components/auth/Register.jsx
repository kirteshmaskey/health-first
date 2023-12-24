import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [btnClicked, setBtnClicked] = useState(false);

  const setValue = (e) => {
    const { name, value } = e.target;

    setUser(() => {
      return {
        ...user,
        [name]: value,
      };
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setBtnClicked(true);
    const { fname, lname, email, password, cpassword } = user;

    if (fname === "") {
      toast.warning("First Name is required!");
    } else if (lname === "") {
      toast.warning("Last Name is required!");
    } else if (email === "") {
      toast.warning("Email is required!");
    } else if (!email.includes("@")) {
      toast.warning("Invalid email!");
    } else if (password === "") {
      toast.warning("Password is required!");
    } else if (password.length < 6) {
      toast.warning("Password must be 6 character!");
    } else if (cpassword === "") {
      toast.warning("Confirm password is required!");
    } else if (cpassword.length < 6) {
      toast.warning("Confirm password must be 6 character!");
    } else if (password !== cpassword) {
      toast.warning("Password and Confirm password are not same!");
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/api/auth/register`, {
          fname,
          lname,
          email,
          password,
          cpassword,
        });
        if (response.data.status === 201) {
          toast.success(response.data.message);
          setTimeout(() => navigate("/"), 1500);
        } else {
          toast.warning(response.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    setBtnClicked(false);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 border rounded-2 shadow p-4">
          <h2 className="text-center">Sign Up</h2>
          <form>
            <div className="row mt-4">
              <div className="col-lg-6 form-group mb-4">
                <label htmlFor="fname">
                  First Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="fname"
                  onChange={setValue}
                  value={user.fname}
                  id="fname"
                  placeholder="First Name"
                />
              </div>
              <div className="col-lg-6 form-group mb-4">
                <label htmlFor="lname">
                  Last Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="lname"
                  onChange={setValue}
                  value={user.lname}
                  id="lname"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-group">
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
            <div className="form-group my-4">
              <label htmlFor="cpassword">
                Confirm Password <span className="text-danger">*</span>
              </label>
              <input
                type="password"
                className="form-control"
                name="cpassword"
                onChange={setValue}
                value={user.cpassword}
                id="cpassword"
                placeholder="Confirm Password"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary text-align-center px-4"
                onClick={handleSignUp}
                disabled={btnClicked}
              >
                {!btnClicked ? "Signup" : "Signing Up..."}
              </button>
            </div>
          </form>
          <div className="text-center my-3">
            <p className="">
              Already have an account?{" "}
              <span>
                <Link to="/">Login</Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
