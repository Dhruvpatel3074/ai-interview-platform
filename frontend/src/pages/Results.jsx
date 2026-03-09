import { useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";

function Results() {

  const location = useLocation();
  const navigate = useNavigate();

  const answers = location.state?.answers || [];
  const result = location.state?.result || {};

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Interview Results</h2>

      <div
        style={{
          background: "white",
          padding: "30px",
          width: "400px",
          margin: "20px auto",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h3>Score: {result.score}</h3>

        <p style={{ marginTop: "10px" }}>
          {result.feedback}
        </p>
      </div>

      <h3>Your Answers</h3>

      {answers.map((ans, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <b>Answer {index + 1}</b>
          <p>{ans}</p>
        </div>
      ))}

      <br />

      <Button
        text="Back to Dashboard"
        onClick={() => navigate("/dashboard")}
      />

    </div>
  );
}

export default Results;