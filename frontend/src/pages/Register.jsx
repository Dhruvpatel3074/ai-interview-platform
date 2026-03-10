import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Register() {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");

    const { data, status } = await registerUser(identifier, password);

    if (status === 200) {
      alert("Registration successful");
      navigate("/");
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>

      <h2>Register</h2>

      <InputField
        placeholder="Username or Email"
        value={identifier}
        onChange={(e) => setIdentifier(e.target.value)}
      />

      <br /><br />

      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <InputField
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      {error && (
        <p style={{ color: "red", marginTop: "5px" }}>
          {error}
        </p>
      )}

      <br />

      <Button text="Register" onClick={handleRegister} />

      <br /><br />

      <p>
        Already have an account?{" "}
        <span
          onClick={() => navigate("/")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Login
        </span>
      </p>

    </div>
  );
}

export default Register;