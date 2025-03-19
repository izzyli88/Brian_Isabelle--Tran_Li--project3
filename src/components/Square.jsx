import "../styles/button.css";
import "../styles/styles.css";

export default function Square({ status, onHit, isAi }) {
  let currClass = "square";
  let currSymbol = "";

  if (status === "hit") {
    currClass += isAi ? " filledBox hitBox" : " filledBox missBox";
    currSymbol = isAi ? "✔" : "X";
  } else if (!isAi && status === "hasShip") {
    currClass += " shipBox";
    currSymbol = "●";
  }

  return (
    <div className={currClass} onClick={onHit}>
      {currSymbol}
    </div>
  );
}
