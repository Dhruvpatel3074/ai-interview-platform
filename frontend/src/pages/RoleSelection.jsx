import { useNavigate } from "react-router-dom";
import { useState } from "react";

const RoleSelection = () => {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const startInterview = () => {
    localStorage.setItem("selectedRole", role);
    navigate("/interview");
  };

  return (
    <div className="page">
      <h2>Select Role</h2>
      <select onChange={(e) => setRole(e.target.value)}>
        <option value="">Choose role</option>
        <option value="frontend">Frontend Developer</option>
        <option value="backend">Backend Developer</option>
        <option value="data">Data Scientist</option>
      </select>
      <button onClick={startInterview}>Start Interview</button>
    </div>
  );
};

export default RoleSelection;