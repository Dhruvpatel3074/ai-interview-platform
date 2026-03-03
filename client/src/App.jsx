import { useEffect, useState } from "react";

export default function App() {
  const [message, setMessage] = useState("");
  const [question, setQuestion] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then(res => res.json())
      .then(data => setMessage(data.message));
  }, []);

  const getQuestion = () => {
    fetch("http://localhost:5000/generate-question")
      .then(res => res.json())
      .then(data => setQuestion(data.question));
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>AI Interview Coach 🚀</h1>

      <h3>Backend Status:</h3>
      <p>{message}</p>

      <button onClick={getQuestion}>
        Generate Question
      </button>

      <h3>{question}</h3>
    </div>
  );
}