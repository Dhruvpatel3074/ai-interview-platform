import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../components/Button";

function InterviewSession() {

  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  useEffect(() => {

    const timer = setInterval(() => {
      setTimeLeft((prev) => {

        if (prev <= 1) {
          handleNext();
          return 120;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);

  }, [current]);

  const handleNext = async () => {

    const updatedAnswers = [...answers, answer];
    setAnswers(updatedAnswers);
    setAnswer("");
    setTimeLeft(120);

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      return;
    }

    const res = await fetch("http://localhost:5000/api/submit-interview", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        answers: updatedAnswers
      })
    });

    const data = await res.json();

    navigate("/results", {
      state: {
        answers: updatedAnswers,
        result: data
      }
    });
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>

      <h2>Interview Session</h2>

      <h3>
        Question {current + 1} / {questions.length}
      </h3>

      <h4 style={{ color: "red" }}>
        Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </h4>

      <div
        style={{
          width: "300px",
          height: "10px",
          background: "#ddd",
          margin: "10px auto",
          borderRadius: "5px"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            background: "#2b4aa0",
            borderRadius: "5px"
          }}
        />
      </div>

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

      <Button text="Next Question" onClick={handleNext} />

    </div>
  );
}

export default InterviewSession;