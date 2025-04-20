import { useState } from "react";
import axios from "axios";
import EntryField from "../components/EntryField";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsernameState] = useState("");
  const [password, setPasswordState] = useState("");
  const navigate = useNavigate();

  function updateUsername(event) {
    setUsernameState(event.target.value);
  }

  function updatePassword(event) {
    setPasswordState(event.target.value);
  }

  async function register() {
    const req = {
      username: username,
      password: password,
    };
    await axios.post("/api/user/register", req);
    navigate("/")
    
  }

  return (
    <>
      <h1> User Registration</h1>

      <EntryField label="Username" onChange= {updateUsername}/>
      <EntryField label="Password" onChange= {updatePassword} />
      <Button label="Register" className="button" onClick={register} />
    </>
  );
}
