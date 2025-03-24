import React, { useState, useEffect, useRef } from "react";
import { useTimer } from "../context/TimerContext.jsx";
import { useGame } from "../context/GameContext.jsx";
import Button from "./Button";
import "../styles/timer.css";
import "../styles/button.css";

function Timer() {
  const { gameStart, resetGame } = useTimer();

  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  const { winner } = useGame();

  useEffect(() => {
    if (gameStart && !isPlaying) {
      start();
    }
  }, [gameStart]);

  useEffect(() => {
    if (isPlaying) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isPlaying]);

  useEffect(() => {
    if (winner) {
      stop();
    }
  }, [winner]);

  function start() {
    setIsPlaying(true);
    startTimeRef.current = Date.now() - elapsedTime;
  }

  function stop() {
    setIsPlaying(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsPlaying(false);
    resetGame();
  }

  function formatTime() {
    let min = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let sec = Math.floor((elapsedTime / 1000) % 60);

    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");

    return `${min}:${sec}`;
  }

  return (
    <div className="timer">
      <div className="display">{formatTime()}</div>
      <div className="controls">
        <Button label="Reset" onClick={reset} className="button" />
      </div>
    </div>
  );
}
export default Timer;
