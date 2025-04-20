import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [username, setUsernameState] = useState("");
  const [pass, setPassState] = useState("");

  function updateUsername(event) {
    setUsernameState(event.target.value);
  }

  function updatePass(event) {
    setPassState(event.target.value);
  }

  async function login() {
    const req = {
      username: username,
      pass: pass,
    };
    await axios.post("/api/user/login", req);
  }

  return (
    <>
      <div>Login Page</div>

      <div>
        <h3>Login Here</h3>
        <div>
          Username:
          <input value={username} onChange={updateUsername} />
        </div>
        <div>
          Password:
          <input value={pass} onChange={updatePass} />
        </div>

        <div>
          <button onClick={login}>Login</button>
        </div>
      </div>
    </>
  );
}
