import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "60px" }}>

      <h1>AI Interview Preparation Platform</h1>

      <p style={{ fontSize: "18px", marginTop: "10px" }}>
        Practice technical interviews with AI and improve your skills.
      </p>

      <br /><br />

      <div style={{
        display: "flex",
        justifyContent: "center",
        gap: "20px"
      }}>

        <Button
          text="Start Interview"
          onClick={() => navigate("/roles")}
        />

        <Button
          text="View Interview History"
          onClick={() => navigate("/history")}
        />

      </div>

      <br /><br />

      <div style={{
        maxWidth: "500px",
        margin: "auto",
        background: "#f5f5f5",
        padding: "20px",
        borderRadius: "10px"
      }}>

        <h3>How it works</h3>

        <p>
          1. Select your role and company.
        </p>

        <p>
          2. Answer AI generated interview questions.
        </p>

        <p>
          3. Get feedback and improve your performance.
        </p>

      </div>

    </div>
  );
}

export default Dashboard;