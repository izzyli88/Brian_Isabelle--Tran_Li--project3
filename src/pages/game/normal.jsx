import React from "react";
import "../../styles/styles.css";
import Board from "../../components/Board";

export default function NormalMode() {
  return (
    <>
      <Board isAi={true}></Board>
      <Board isAi={false}></Board>
    </>
  );
}
