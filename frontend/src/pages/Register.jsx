import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

function Register(){

  const [identifier,setIdentifier] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);

  const [error,setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {

    if(password !== confirmPassword){
      setError("Passwords do not match");
      return;
    }

    setError("");

    const {data,status} = await registerUser(identifier,password);

    if(status === 200){
      navigate("/");
    }else{
      setError(data.message || "Registration failed");
    }

  };

  const isDisabled =
    identifier.trim()==="" ||
    password.trim()==="" ||
    confirmPassword.trim()==="";

  return(

    <div className="auth-container">

      <div className="auth-card">

        <div className="logo">🤖</div>

        <h1>Create Account</h1>

        {error && (
          <p className="error-text">{error}</p>
        )}

        {/* username/email */}

        <div className="input-group">

          <span className="input-icon">📧</span>

          <input
            className="input-field"
            placeholder="Username or Email"
            value={identifier}
            onChange={(e)=>setIdentifier(e.target.value)}
          />

        </div>

        {/* password */}

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

        {/* confirm password */}

        <div className="input-group">

          <span className="input-icon">🔒</span>

          <input
            className="input-field"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <span
            className="eye-icon"
            onClick={()=>setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? "🙈" : "👁"}
          </span>

        </div>

        <button
          className="auth-btn"
          disabled={isDisabled}
          onClick={handleRegister}
        >
          Sign Up
        </button>

        <p className="bottom-text">
          Already have an account?{" "}
          <span
            className="link"
            onClick={()=>navigate("/")}
          >
            Login
          </span>
        </p>

      </div>

    </div>

  );

}

export default Register;