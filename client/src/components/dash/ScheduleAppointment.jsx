import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const ScheduleAppointment = () => {
  const [appointment, setAppointment] = useState({
    dname: "",
    date: "",
    time: "",
    remark: "",
  });
  const [btnClicked, setBtnClicked] = useState(false);
  const [currentDate, setCurrentDate] = useState("");

  const setValue = (e) => {
    const { name, value } = e.target;
    setAppointment(() => {
      return {
        ...appointment,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnClicked(true);
    const { dname, date, time, remark } = appointment;

    if (dname === "") {
      toast.warning("Doctor Name is required!");
    } else if (date === "") {
      toast.warning("Appointment date is required!");
    } else if (time === "") {
      toast.warning("Appointment time is required!");
    } else {
      try {
        const token = localStorage.getItem("usertoken");
        const response = await axios.post(
          `${BASE_URL}/api/dash/schedule-appointment`,
          {
            ...appointment,
          },
          {
            headers: {
              "Content-Type": "application/json",
              usertoken: token,
            },
          }
        );
        if (response.data.status === 201) {
          toast.success(response.data.message);
          setAppointment({
            dname: "",
            date: "",
            time: "",
            remark: "",
          });
        } else {
          toast.warning(response.data.message);
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    setBtnClicked(false);
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2); // Months are zero indexed
    const day = ("0" + date.getDate()).slice(-2);

    setCurrentDate(`${year}-${month}-${day}`);
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="p-4 bg-white rounded shadow-lg">
            <h1 className="text-center text-primary mb-3">
              Schedule Appointment
            </h1>
            <div className="alert alert-info" role="alert">
              Schedule Appointment with doctor
            </div>
            <div className="mb-3">
              <label htmlFor="dName" className="form-label">
                Doctor Name <span className="text-danger">*</span>
              </label>
              <input
                id="dname"
                name="dname"
                className="form-control"
                type="text"
                placeholder="Enter Doctor Name"
                value={appointment.dname}
                onChange={setValue}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date <span className="text-danger">*</span>
              </label>
              <input
                id="date"
                name="date"
                className="form-control"
                type="date"
                min={currentDate}
                value={appointment.date}
                onChange={setValue}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="time" className="form-label">
                Time <span className="text-danger">*</span>
              </label>
              <input
                id="time"
                name="time"
                className="form-control"
                type="time"
                value={appointment.time}
                onChange={setValue}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="remark" className="form-label">
                Remark (Optional)
              </label>
              <textarea
                id="remark"
                name="remark"
                className="form-control"
                placeholder="Remark for scheduling the appointment"
                value={appointment.remark}
                onChange={setValue}
                rows="3"
              />
            </div>
            <button
              className="btn btn-primary w-100"
              onClick={handleSubmit}
              disabled={btnClicked}
            >
              {!btnClicked ? "Schedule" : "Scheduling..."}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleAppointment;
