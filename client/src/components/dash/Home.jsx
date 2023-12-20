import { useContext, useEffect } from "react";
import { UserContext } from "../contextprovider/UserContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Home = () => {
  const navigate = useNavigate();
  const {UserData, LoginStatus} = useContext(UserContext);
  const {loginUser, setLoginUser} = UserData;
  const {loggedIn, setLoggedIn} = LoginStatus;

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
        } else if (response.data.status === 403 || response.data.status === 401) {
          localStorage.removeItem("usertoken");
          navigate("/");
          toast.info("Please login again!");
        }
      } catch (error) {
        // console.log(error.message);
      }
    }else {
      navigate("/");
      toast.info("Please login again!");
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
    {
      loggedIn ?
        <><h1>Name: {loginUser.fname}</h1></>
      :
       <h1>Loading...</h1>

    }
    </>
  );
};

export default Home;
