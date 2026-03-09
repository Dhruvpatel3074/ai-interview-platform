import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser } from "../services/api";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const result = await registerUser(username, password);

    if (result.status === 200) {
      alert("Registration successful");
      navigate("/");
    } else {
      alert(result.data.message);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
        <InputField
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <Button text="Register" type="submit" />
      </form>

      <br />

      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}

export default Register;