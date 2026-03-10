import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";

function InterviewSession() {

  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];
  const role = location.state?.role;
  const company = location.state?.company;

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(120);

  useEffect(() => {

    const timer = setInterval(() => {

      setTimeLeft((prev) => {

        if (prev <= 1) {
          handleSkip();
          return 120;
        }

        return prev - 1;

      });

    }, 1000);

    return () => clearInterval(timer);

  }, [current]);

  const handleNext = () => {

    if (answer.trim() === "") {
      alert("Please answer the question or skip it.");
      return;
    }

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);

    moveNext(updatedAnswers);

  };

  const handleSkip = () => {

    const updatedAnswers = [...answers, "SKIPPED"];
    setAnswers(updatedAnswers);

    moveNext(updatedAnswers);

  };

  const moveNext = (updatedAnswers) => {

    setAnswer("");
    setTimeLeft(120);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      return;
    }

    navigate("/results", {
      state: {
        questions,
        answers: updatedAnswers,
        role,
        company,
        result: { score: updatedAnswers.length }
      }
    });

  };

  const handleQuit = () => {

    const confirmQuit = window.confirm(
      "Are you sure you want to quit the interview?"
    );

    if (confirmQuit) {
      navigate("/dashboard");
    }

  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Interview Session</h2>

      <h3>Company: {company}</h3>
      <h3>Role: {role}</h3>

      <h3>
        Question {current + 1} / {questions.length}
      </h3>

      <h4 style={{ color: "red" }}>
        Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h4>

      <p style={{ fontSize: "18px", marginTop: "20px" }}>
        {questions[current]}
      </p>

      <textarea
        rows="5"
        cols="50"
        value={answer}
        placeholder="Type your answer here..."
        onChange={(e) => setAnswer(e.target.value)}
      />

      <br /><br />

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>

        <Button text="Submit Answer" onClick={handleNext} />

        <Button text="Skip" onClick={handleSkip} />

        <Button text="Quit Interview" onClick={handleQuit} />

      </div>

    </div>
  );
}

export default InterviewSession;