import React from "react";
import "../styles/styles.css";
import "../styles/rules.css";
import Button from "../components/Button";

function Rules() {
  const izzyGit = "https://github.com/izzyli88/li.isab.github.io";
  const izzyLinkedIn = "https://www.linkedin.com/in/li-isabelle88/";
  return (
    <>
      <div>
      </div>
      {/* Rules */}
      <div className="container">
        <div className="circle">Place ships</div>
        <div className="circle">Take turns firing</div>
        <div className="circle">Hit all parts of ship</div>
        <div className="circle">Sink all ships</div>
      </div>

      {/* Credits */}
      <nav className="navBar">
        <a href={izzyGit} target="_blank" rel="noopener noreferrer">
          <Button label="GitHub" className="button" />
        </a>
        <a href={izzyLinkedIn} target="_blank" rel="noopener noreferrer">
          <Button label="LinkedIn" className="button" />
        </a>
      </nav>
    </>
  );
}

export default Rules;
