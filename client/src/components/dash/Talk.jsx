import { useContext, useState } from "react";
import axios from "axios";
import mic from "../asset/images/mic.webp";
import { toast } from "react-toastify";
import { UserContext } from "../contextprovider/UserContext";
import CircularLoading from "../reusable/CircularLoading";

const BASE_URL = process.env.REACT_APP_BASE_URL;

const Talk = () => {
  const { LoginStatus } = useContext(UserContext);
  const { loggedIn, setLoggedIn } = LoginStatus;
  const [input, setInput] = useState({
    userInput: "",
  });
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isBtnClicked, setIsBtnClicked] = useState(false);

  const setVal = (e) => {
    const { name, value } = e.target;
    setInput(() => {
      return {
        ...input,
        [name]: value,
      };
    });
  };

  let recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    window.mozSpeechRecognition ||
    window.msSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  const speak = () => {
    recognition.start();
    recognition.onresult = function (event) {
      let input = event.results[0][0].transcript;
      document.getElementById("input").value = input;
    };
  };

  const submit = async (e) => {
    e.preventDefault();
    setIsBtnClicked(true);
    let input = document.getElementById("input").value;
    document.getElementById("result").value = "";
    let result = document.getElementById("result");

    if (input) {
      const token = localStorage.getItem("usertoken");
      const data = await axios.post(
        `${BASE_URL}/api/dash/talk`,
        { input },
        {
          headers: {
            "Content-Type": "application/json",
            usertoken: token,
          },
        }
      );
      const res = await data;
      // console.log(res.data.message);
      result.value = res.data.message;
    } else {
      toast.info("Please ask question");
    }
    setIsBtnClicked(false);
  };
  const listen = (e) => {
    e.preventDefault();
    let result = document.getElementById("result").value;
    // Check if the browser supports speech synthesis
    if (window.speechSynthesis) {
      var utterance = new SpeechSynthesisUtterance(result);
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  };

  return (
    <>
      {loggedIn ? (
        <div className="container">
          <h2 className="my-4 text-center text-primary">
            Talk to your personalized doctor
          </h2>
          <div className="alert alert-info" role="alert">
            While you can obtain information from this chatbot, it's always
            recommended to consult with your doctor for medical advice.
          </div>
          <div className="card">
            <div className="card-body">
              <form className="mb-4">
                <div className="input-group">
                  <input
                    type="text"
                    id="input"
                    onChange={setVal}
                    placeholder="Enter text or use voice command"
                    className="form-control"
                  />
                  <div className="input-group-append">
                    <button
                      type="button"
                      onClick={speak}
                      className="btn btn-outline-secondary"
                    >
                      <img
                        src={mic}
                        alt={"mic"}
                        style={{ height: "22px", width: "13px" }}
                      />{" "}
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  onClick={submit}
                  disabled={isBtnClicked}
                  className="btn btn-primary mt-3 d-block mx-auto"
                >
                  {isBtnClicked ? "Waiting..." : "Ask"}
                </button>
              </form>
              <textarea
                id="result"
                placeholder="Response..."
                className="form-control"
                rows="15"
              />
              <br />
              <button
                onClick={listen}
                className="btn btn-primary"
                disabled={isSpeaking}
              >
                {isSpeaking ? "Listening..." : "Listen"}
              </button>{" "}
              {"   "}
              <button onClick={stopSpeaking} className="btn btn-danger">
                Stop listening
              </button>
            </div>
          </div>
        </div>
      ) : (
        <CircularLoading />
      )}
    </>
  );
};

export default Talk;
