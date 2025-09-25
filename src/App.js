import { useCallback, useEffect, useState } from "react";
import beep from "./sounds/BeepSound.wav";
import "./App.css";
import LengthControl from "./components/LengthControl";
import { useRef } from "react";

function App() {
  const [sessionValue, setSessionValue] = useState(25);
  const [breakValue, setBreakValue] = useState(5);
  const [seconds, setSeconds] = useState(60);
  const [start, setStart] = useState(false);
  const [timer, setTimer] = useState(sessionValue);
  const [isBreak, setIsBreak] = useState(false);

  const audio = useRef(null);
  const timerRef = useRef(null);
  const countDown = useCallback(() => {
    setSeconds((seconds) => (seconds === 0 ? 60 : seconds - 1));

    if (seconds === 60) {
      setTimer((a) => (a === 0 ? 0 : a - 1));
    }

    if (seconds === 0 && timer === 0) {
      if (!isBreak) {
        setTimer(breakValue);
      } else {
        setTimer(sessionValue);
      }

      setIsBreak((prev) => !prev);
    }
  }, [breakValue, sessionValue, seconds, isBreak, timer]);

  useEffect(() => {
    let myInterval;

    if (timerRef.current.innerText === "00:00") {
      audio.current.play();
    }

    if (start === true) {
      myInterval = setInterval(countDown, 200);
    } else {
      clearInterval(myInterval);
    }

    return () => {
      clearInterval(myInterval);
    };
  }, [start, countDown]);

  const handleTime = (e, type) => {
    if (type === "Break") {
      setBreakValue(e);
    }

    if (type === "Session") {
      setSessionValue(e);
      setTimer(e);
    }
  };

  const handleReset = () => {
    setStart(false);
    setSeconds(60);
    handleTime(25, "Session");
    handleTime(5, "Break");
    setIsBreak(false);
    audio.current.pause();
    audio.current.currentTime = 0;
  };

  return (
    <main className="main">
      <div className="main-container">
        <h1>25 + 5 Clock</h1>
        <div className="controls-and-display-container">
          <div className="controls-container">
            <LengthControl
              type="Break"
              value={breakValue}
              handleTime={handleTime}
              start={start}
            />
            <LengthControl
              type="Session"
              value={sessionValue}
              handleTime={handleTime}
              start={start}
            />
          </div>
          <div className="timer">
            <div className={`timer-wrapper ${timer === 0 && "text-red"}`}>
              <div id="timer-label">{!isBreak ? "Session" : "Break"}</div>
              <div id="time-left" ref={timerRef}>
                {timer < 10 ? `0${timer}` : timer}:
                {seconds === 60 ? "00" : seconds < 10 ? `0${seconds}` : seconds}
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
          <audio id="beep" preload="auto" src={beep} ref={audio}></audio>
        </div>
      </div>
    </main>
  );
}

export default App;
