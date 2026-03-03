import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="auth-container">
      <h2>Dashboard</h2>
      <p>Welcome to AI Interview Platform</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;