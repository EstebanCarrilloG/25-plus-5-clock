import { useEffect, useState } from "react";
import beep from "./sounds/BeepSound.wav";
import "./App.css";
import LengthControl from "./components/LengthControl";

function App() {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [start, setStart] = useState(false);

  const [sessionTimer, setSessionTimer] = useState(sessionLength);
  const [breakTimer, setBreakTimer] = useState(breakLength);
  const [isBreak, setIsBreak] = useState(false);
  const countDown = () => {
    setSeconds((seconds) => (seconds === 0 ? 60 : seconds - 1));

    if (seconds === 0 && sessionTimer === 0) {
      setIsBreak(true);
      setSessionTimer(sessionLength);
    }
    if (seconds === 0 && breakTimer === 0) {
      setIsBreak(false);
      setBreakTimer(breakLength);
    }
  };

  useEffect(() => {
    let myInterval;
    const audio = document.getElementById("beep");

    if (document.getElementById("time-left").innerText === "00:00") {
      audio.play();
    }

    if (start === true) {
      myInterval = setInterval(countDown, 1000, seconds);

      if (seconds === 59 && !isBreak) {
        setSessionTimer((a) => (a === 0 ? 0 : a - 1));
      }
      if (seconds === 59 && isBreak) {
        setBreakTimer((a) => (a === 0 ? 0 : a - 1));
      }
    } else {
      clearInterval(myInterval);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [start, seconds]);

  const handleBreak = (e, type) => {
    if (type === "Break") {
      setBreakLength(e);
      setBreakTimer(e);
    }

    if (type === "Session") {
      setSessionLength(e);
      setSessionTimer(e);
    }
  };

  const handleReset = (e) => {
    const audio = document.getElementById("beep");
    setStart(false);
    setSeconds(60);
    handleBreak(25, "Session");
    handleBreak(5, "Break");
    setIsBreak(false);
    audio.pause();
    audio.currentTime = 0;
    //setSessionTimer(sessionLength);
  };

  return (
    <main className="main">
      <div className="main-container">
        <h1>25 + 5 Clock</h1>
        <div className="controls-and-display-container">
          <div className="controls-container">
            <LengthControl
              type="Break"
              value={breakLength}
              handleBreak={handleBreak}
              start={start}
            />
            <LengthControl
              type="Session"
              value={sessionLength}
              handleBreak={handleBreak}
              start={start}
            />
          </div>
          <div className="timer">
            <div
              className={`timer-wrapper ${sessionTimer === 0 && "text-red"}`}
            >
              <div id="timer-label">{!isBreak ? "Session" : "Break"}</div>
              <div id="time-left">
                {!isBreak ? (
                  <>
                    {" "}
                    {sessionTimer < 10 ? `0${sessionTimer}` : sessionTimer}:
                    {seconds === 60
                      ? "00"
                      : seconds < 10
                      ? `0${seconds}`
                      : seconds}
                  </>
                ) : (
                  <>
                    {" "}
                    {breakTimer < 10 ? `0${breakTimer}` : breakTimer}:
                    {seconds === 60
                      ? "00"
                      : seconds < 10
                      ? `0${seconds}`
                      : seconds}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="timer-control">
            <button
              id="start_stop"
              onClick={() => {
                setStart(!start);
              }}
            >
              <i className="fa fa-play fa-2x"></i>
              <i className="fa fa-pause fa-2x"></i>
            </button>
            <button id="reset" onClick={handleReset}>
              <i className="fa fa-refresh fa-2x"></i>
            </button>
          </div>
          <audio id="beep" preload="auto" src={beep}></audio>
        </div>
      </div>
    </main>
  );
}

export default App;
