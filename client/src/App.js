import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import Home from "./components/dash/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/reusable/PageNotFound";
import Talk from "./components/dash/Talk";
import AddMedicine from "./components/dash/AddMedicine";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} >
          <Route path="talk" element={<Talk />} />
          <Route path="add-medicine" element={<AddMedicine />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
