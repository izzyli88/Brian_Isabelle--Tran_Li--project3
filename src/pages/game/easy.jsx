import React from "react";
import "../../styles/styles.css";
import Board from "../../components/Board";

export default function EasyMode() {
  return (
    <>
      <Board isAi={true}></Board>
    </>
  );
}
