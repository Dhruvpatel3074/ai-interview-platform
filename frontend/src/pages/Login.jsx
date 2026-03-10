import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import InputField from "../components/InputField";
import Button from "../components/Button";

function Login() {

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    const { data, status } = await loginUser(identifier, password);

    if (status === 200) {
      navigate("/dashboard");
    } else {
      alert(data.message || "Login failed");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>

      <h2>Login</h2>

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

      <Button text="Login" onClick={handleLogin} />

      <br /><br />

      <p>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/register")}
          style={{ color: "blue", cursor: "pointer" }}
        >
          Register
        </span>
      </p>

    </div>
  );
}

export default Login;