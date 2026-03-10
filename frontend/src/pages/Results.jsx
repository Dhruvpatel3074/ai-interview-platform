import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../components/Button";

function Results() {

  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const answers = location.state?.answers || [];
  const result = location.state?.result || {};
  const role = location.state?.role;
  const company = location.state?.company;

  useEffect(() => {

    const history = JSON.parse(localStorage.getItem("interviewHistory")) || [];

    const newEntry = {
      company,
      role,
      score: result.score,
      date: new Date().toLocaleString()
    };

    history.push(newEntry);

    localStorage.setItem("interviewHistory", JSON.stringify(history));

  }, []);


  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h1>Interview Results</h1>

      <h3>Company: {company}</h3>
      <h3>Role: {role}</h3>

      <h2>Score: {result.score}</h2>

      <p>{result.feedback}</p>

      <br />

      <h2>Your Responses</h2>

      <div style={{ maxWidth: "700px", margin: "auto", textAlign: "left" }}>

        {questions.map((question, index) => (

          <div
            key={index}
            style={{
              marginBottom: "20px",
              padding: "15px",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#f9f9f9"
            }}
          >

            <p><strong>Question {index + 1}</strong></p>
            <p>{question}</p>

            <p><strong>Your Answer:</strong></p>

            <p style={{ color: answers[index] === "SKIPPED" ? "red" : "black" }}>
              {answers[index] === "SKIPPED" ? "Skipped" : answers[index]}
            </p>

          </div>

        ))}

      </div>

      <br /><br />

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

        <Button
          text="Start New Interview"
          onClick={() => navigate("/roles")}
        />

        <Button
          text="View Interview History"
          onClick={() => navigate("/history")}
        />

        <Button
          text="Back to Dashboard"
          onClick={() => navigate("/dashboard")}
        />

      </div>

    </div>
  );
}

export default Results;