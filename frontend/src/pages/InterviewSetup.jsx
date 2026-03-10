import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";
import { generateQuestions } from "../services/api";

function InterviewSetup() {

  const location = useLocation();
  const navigate = useNavigate();

  const role = location.state?.role;
  const company = location.state?.company;

  const [difficulty, setDifficulty] = useState("medium");
  const [count, setCount] = useState(5);
  const [loading, setLoading] = useState(false);


  const handleStart = async () => {

    setLoading(true);

    try {

      const data = await generateQuestions(role, company, difficulty, count);

      navigate("/interview-session", {
        state: {
          questions: data.questions,
          role,
          company,
          difficulty
        }
      });

    } catch (error) {

      alert("Error generating questions");

    }

    setLoading(false);
  };


  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h2>Generating AI Interview Questions...</h2>
      </div>
    );
  }


  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Interview Setup</h2>

      <p>Company: {company}</p>
      <p>Role: {role}</p>

      <br />

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
        value={count}
        onChange={(e) => setCount(e.target.value)}
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