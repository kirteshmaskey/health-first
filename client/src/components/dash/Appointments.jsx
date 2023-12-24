import axios from "axios";
import { useEffect, useState } from "react";
import CircularLoading from "../reusable/CircularLoading";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Appointments = () => {
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [data, setData] = useState(false);

  const sortAppointments = async (appointments) => {
    let now = new Date();
    setUpcomingAppointments(
      appointments.filter((a) => {
        let appointmentDateTime = new Date(a.date.split("T")[0] + "T" + a.time);
        return appointmentDateTime >= now;
      })
    );

    setPreviousAppointments(
      appointments.filter((a) => {
        let appointmentDateTime = new Date(a.date.split("T")[0] + "T" + a.time);
        return appointmentDateTime < now;
      })
    );

    upcomingAppointments.sort((a, b) => {
      let dateA = new Date(a.date.split("T")[0] + "T" + a.time);
      let dateB = new Date(b.date.split("T")[0] + "T" + b.time);
      return dateA - dateB;
    });
    previousAppointments.sort((a, b) => {
      let dateA = new Date(a.date.split("T")[0] + "T" + a.time);
      let dateB = new Date(b.date.split("T")[0] + "T" + b.time);
      return dateB - dateA;
    });
  };

  const getAppointment = async () => {
    try {
      const token = localStorage.getItem("usertoken");
      const response = await axios.get(
        `${BASE_URL}/api/dash/get-appointments`,
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: token,
          },
        }
      );

      if (response.data.status === 201) {
        sortAppointments(response.data.appointments);
        setData(true);
      } else {
        console.log("Error");
      }
    } catch (err) {}
  };

  useEffect(() => {
    getAppointment();
  }, []);

  return (
    <>
      {data ? (
        <>
          <div className="container py-3">
            <div className="card">
              <h2 className="text-primary text-center card-header mb-3">
                Upcoming Appointment
              </h2>
              <div className="row p-2">
                {upcomingAppointments.length === 0 ? (
                  <p className="text-center">No Upcoming Appointments</p>
                ) : (
                  <>
                    {upcomingAppointments.map((appointment, index) => (
                      <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div className="card mb-4">
                          <div className="card-body">
                            <h5 className="card-title">
                              Doctor: {appointment.dname}
                            </h5>
                            <p className="card-text">
                              Appointment Date: {appointment.date.split("T")[0]}
                              <br />
                              Appointment Time: {appointment.time}
                            </p>
                            <p className="card-text">
                              {appointment.remark &&
                                `Remark: ${appointment.remark}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="container py-3">
            <div className="card">
              <h2 className="text-primary text-center card-header mb-3">
                Previous Appointment
              </h2>
              <div className="row p-2">
                {previousAppointments.length === 0 ? (
                  <p className="text-center">
                    No Previous Appointments Available
                  </p>
                ) : (
                  <>
                    {previousAppointments.map((appointment, index) => (
                      <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div className="card mb-4">
                          <div className="card-body">
                            <h5 className="card-title">
                              Doctor: {appointment.dname}
                            </h5>
                            <p className="card-text">
                              Appointment Date: {appointment.date.split("T")[0]}
                              <br />
                              Appointment Time: {appointment.time}
                            </p>
                            <p className="card-text">
                              {appointment.remark &&
                                `Remark: ${appointment.remark}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <CircularLoading />
      )}
    </>
  );
};

export default Appointments;
