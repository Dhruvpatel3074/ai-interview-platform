import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { loginUser } from "../services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const result = await loginUser(username, password);

    if (result.status === 200) {
      navigate("/dashboard");
    } else {
      alert(result.data.message);
    }
  };

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
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

        <Button text="Login" type="submit" />
      </form>

      <br />

      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;