import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { UserContext } from "../contextprovider/UserContext";
import CircularLoading from "../reusable/CircularLoading";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmiResult, setBmiResult] = useState(null);
  const [status, setStatus] = useState("");
  const { LoginStatus } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = LoginStatus;

  function calculateBMI() {
    if (!weight || !height) {
      toast.warning("Please enter both weight and height");
      return;
    }
    let bmi = Number(weight / (height / 100) ** 2).toFixed(2);
    setBmiResult(bmi);

    let bmiStatus = getStatus(bmi);
    setStatus(bmiStatus);

    setHeight("");
    setWeight("");
  }

  function getStatus(bmi) {
    if (bmi < 18.5)
      return "You're a bit lighter than usual. It might be a good idea to gain some weight.";
    else if (bmi >= 18.5 && bmi < 24.9)
      return "Great job! You're in the healthy weight range.";
    else if (bmi >= 25 && bmi < 29.9)
      return "You're a bit heavier than usual. It might be a good idea to lose some weight.";
    else
      return "Your weight is significantly higher than usual. It's important for your health to start weight management.";
  }

  return (
    <>
      {loggedIn ? (
        <div className="container py-5">
          <div className="row justify-content-center">
            <div className="col-12 col-md-8 col-lg-6">
              <div className="p-4 bg-white rounded shadow-lg">
                <h1 className="text-center text-primary mb-3">
                  BMI Calculator
                </h1>
                <div className="alert alert-info" role="alert">
                  The Body Mass Index (BMI) is a measurement of a person's
                  weight with respect to their height. It is more of an
                  indicator than a direct measurement of a person's total body
                  fat.
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Height <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your height in cm"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    Weight <span className="text-danger">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Enter your weight in kg"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
                <button
                  className="btn btn-primary w-100"
                  onClick={calculateBMI}
                >
                  Calculate BMI
                </button>
                {bmiResult && (
                  <div className="mt-3">
                    <p className="font-weight-bold">
                      <span className="fw-bold">BMI:</span> {bmiResult}
                    </p>
                    <p className="font-weight-bold">
                      <span className="fw-bold">Message:</span> {status}
                    </p>
                  </div>
                )}
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

export default BMICalculator;
