import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

function InterviewHistory() {

  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const storedHistory =
      JSON.parse(localStorage.getItem("interviewHistory")) || [];

    setHistory(storedHistory);

  }, []);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h1>Interview History</h1>

      <br />

      {history.length === 0 && <p>No interviews taken yet.</p>}

      <div style={{ maxWidth: "600px", margin: "auto" }}>

        {history.map((item, index) => (

          <div
            key={index}
            style={{
              padding: "15px",
              border: "1px solid #ddd",
              marginBottom: "10px",
              borderRadius: "8px",
              background: "#f5f5f5"
            }}
          >

            <p><strong>Company:</strong> {item.company}</p>
            <p><strong>Role:</strong> {item.role}</p>
            <p><strong>Score:</strong> {item.score}</p>
            <p><strong>Date:</strong> {item.date}</p>

          </div>

        ))}

      </div>

      <br />

      <Button
        text="Back to Dashboard"
        onClick={() => navigate("/dashboard")}
      />

    </div>
  );
}

export default InterviewHistory;