import { useEffect, useState } from "react";

const Interview = () => {
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setQuestion("Tell me about yourself.");
  }, []);

  return (
    <div className="page">
      <h2>Interview</h2>
      <p>{question}</p>
      <textarea placeholder="Your answer..." />
      <button>Submit Answer</button>
    </div>
  );
};

export default Interview;