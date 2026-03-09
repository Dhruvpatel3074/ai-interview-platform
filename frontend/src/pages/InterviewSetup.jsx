import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import { startInterview } from "../services/api";

function InterviewSetup() {

  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state.role;

  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState(5);
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {

    setLoading(true);

    const data = await startInterview(role, difficulty, questions);

    navigate("/interview-session", {
      state: {
        questions: data.questions
      }
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Generating Interview Questions...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Interview Setup</h2>

      <p>Role: {role}</p>

      <h3>Difficulty</h3>

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <br /><br />

      <h3>Number of Questions</h3>

      <select
        value={questions}
        onChange={(e) => setQuestions(e.target.value)}
      >
        <option value="3">3</option>
        <option value="5">5</option>
        <option value="10">10</option>
      </select>

      <br /><br /><br />

      <Button text="Start Interview" onClick={handleStart} />

    </div>
  );
}

export default InterviewSetup;