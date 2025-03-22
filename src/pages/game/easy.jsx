import React from "react";
import "../../styles/styles.css";
import Board from "../../components/Board";
import Button from "../../components/Button";
import { NavLink } from "react-router-dom";


export default function EasyMode() {
  return (
    <>
      <NavLink to="/game/easy">
        {({}) => (
          <Button
            label="Reset"
            className="button"
            id={""}
          />
        )}
        </NavLink>
      <h1>Easy Mode</h1>
      <Board isAi={true}></Board>
    </>
  );
}
