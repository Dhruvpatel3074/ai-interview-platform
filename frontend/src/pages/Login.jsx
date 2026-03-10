import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

function Login(){

  const [identifier,setIdentifier] = useState("");
  const [password,setPassword] = useState("");
  const [showPassword,setShowPassword] = useState(false);
  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {

    if(identifier === "" || password === ""){
      setError("Please fill all fields");
      return;
    }

    setError("");

    const {data,status} = await loginUser(identifier,password);

    if(status === 200){
      navigate("/dashboard");
    }else{
      setError(data.message || "Login failed");
    }

  };

  const isDisabled = identifier === "" || password === "";

  return(

    <div className="auth-container">

      <div className="auth-card">

        <div className="logo">🤖</div>

        <h1>Welcome to</h1>
        <p className="subtitle">
          <strong>AI Interview Platform</strong>
        </p>

        {error && (
          <p className="error-text">{error}</p>
        )}

        {/* Username / Email */}

        <div className="input-group">

          <span className="input-icon">📧</span>

          <input
            className="input-field"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e)=>setIdentifier(e.target.value)}
          />

        </div>

        {/* Password */}

        <div className="input-group">

          <span className="input-icon">🔒</span>

          <input
            className="input-field"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={()=>setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁"}
          </span>

        </div>

        {/* Remember + Forgot */}

        <div className="remember-row">

          <div className="remember-left">
            <input type="checkbox"/>
            <span>Remember Me</span>
          </div>

          <span className="forgot-link">
            Forgot Password?
          </span>

        </div>

        {/* Button */}

        <button
          className="auth-btn"
          disabled={isDisabled}
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="bottom-text">
          Don't have an account?{" "}
          <span
            className="link"
            onClick={()=>navigate("/register")}
          >
            Sign Up
          </span>
        </p>

      </div>

    </div>

  );

}

export default Login;