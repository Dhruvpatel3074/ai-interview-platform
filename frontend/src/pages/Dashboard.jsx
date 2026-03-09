import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h1>AI Interview Preparation Platform</h1>

      <p>Practice technical interviews with AI.</p>

      <br />

      <Button
        text="Start Interview"
        onClick={() => navigate("/roles")}
      />

    </div>
  );
}

export default Dashboard;