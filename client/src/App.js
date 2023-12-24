import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { ToastContainer } from "react-toastify";
import Home from "./components/dash/Home";
import Navbar from "./components/Navbar";
import PageNotFound from "./components/reusable/PageNotFound";
import Talk from "./components/dash/Talk";
import ScheduleAppointment from "./components/dash/ScheduleAppointment";
import BMICalculator from "./components/dash/BMICalculator";
import DietAndTips from "./components/dash/DietAndTips";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />}>
          <Route path="talk" element={<Talk />} />
          <Route path="diet-and-tips" element={<DietAndTips />} />
          <Route
            path="schedule-appointment"
            element={<ScheduleAppointment />}
          />
          <Route path="bmi" element={<BMICalculator />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}

export default App;
