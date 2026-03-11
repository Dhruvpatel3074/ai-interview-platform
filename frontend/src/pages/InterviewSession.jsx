import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function InterviewSession() {

const navigate = useNavigate();
const location = useLocation();

/* questions */

const [questions,setQuestions] = useState([]);

/* question index */

const [currentQuestionIndex,setCurrentQuestionIndex] = useState(0);

/* answers */

const [answers,setAnswers] = useState({});

/* timer */

const [timeLeft,setTimeLeft] = useState(120);

/* role + company */

const role =
location.state?.role ||
localStorage.getItem("selectedRole") ||
"N/A";

const company =
location.state?.company ||
localStorage.getItem("selectedCompany") ||
"N/A";


/* load questions once */

useEffect(()=>{

const storedQuestions =
JSON.parse(localStorage.getItem("interviewQuestions")) || [];

setQuestions(storedQuestions);

},[]);


/* timer */

useEffect(()=>{

if(timeLeft === 0){
handleNext();
return;
}

const timer = setTimeout(()=>{
setTimeLeft(timeLeft - 1);
},1000);

return ()=>clearTimeout(timer);

},[timeLeft]);


/* reset timer when question changes */

useEffect(()=>{
setTimeLeft(120);
},[currentQuestionIndex]);


/* answer change */

const handleAnswerChange = (e)=>{

setAnswers({
...answers,
[currentQuestionIndex]:e.target.value
});

};


/* next */

const handleNext = ()=>{

if(currentQuestionIndex < questions.length - 1){
setCurrentQuestionIndex(currentQuestionIndex + 1);
}

};


/* previous */

const handlePrevious = ()=>{

if(currentQuestionIndex > 0){
setCurrentQuestionIndex(currentQuestionIndex - 1);
}

};


/* skip */

const handleSkip = ()=>{

setAnswers({
...answers,
[currentQuestionIndex]:"Skipped"
});

handleNext();

};


/* submit */

const handleSubmit = ()=>{

const results = questions.map((q,index)=>({
question:q,
answer:answers[index] || "Skipped"
}));

let score = 0;

results.forEach((r)=>{
if(r.answer && r.answer !== "Skipped" && r.answer.trim().length > 10){
score += 20;
}
});

if(score > 100) score = 100;


/* save history */

const history =
JSON.parse(localStorage.getItem("interviewHistory")) || [];

history.push({
company,
role,
score,
date:new Date().toLocaleString()
});

localStorage.setItem(
"interviewHistory",
JSON.stringify(history)
);


/* navigate to results */

navigate("/results",{
state:{
results,
role,
company,
score
}
});

};


/* loading */

if(questions.length === 0){

return(

<div className="dashboard-page">
<div className="dashboard-wrapper">
<h2>Loading Questions...</h2>
</div>
</div>

);

}


return(

<div className="interview-session-container">

<div className="interview-card">

<button
className="secondary-btn"
style={{marginBottom:"20px"}}
onClick={()=>navigate("/interview-setup")}
>
← Back
</button>


{/* ROLE + COMPANY */}

<div style={{marginBottom:"15px"}}>

<p style={{
fontSize:"18px",
fontWeight:"600",
marginBottom:"4px"
}}>
Role: {role}
</p>

<p style={{
fontSize:"18px",
fontWeight:"600"
}}>
Company: {company}
</p>

</div>


{/* TIMER */}

<div className="timer">

⏳ {Math.floor(timeLeft/60)}:
{String(timeLeft%60).padStart(2,"0")}

</div>


{/* PROGRESS BAR */}

<div className="progress-bar">

<div
className="progress-fill"
style={{
width:`${((currentQuestionIndex+1)/questions.length)*100}%`
}}
></div>

</div>


<h3>
Question {currentQuestionIndex + 1} / {questions.length}
</h3>


{/* QUESTION */}

<div className="question-box">

{questions[currentQuestionIndex]}

</div>


{/* ANSWER BOX */}

<textarea
placeholder="Type your answer..."
value={answers[currentQuestionIndex] || ""}
onChange={handleAnswerChange}
/>


{/* BUTTONS */}

<div className="interview-buttons">

<button
className="secondary-btn"
onClick={handlePrevious}
disabled={currentQuestionIndex === 0}
>
Previous
</button>


<button
className="secondary-btn"
onClick={handleSkip}
>
Skip
</button>


{currentQuestionIndex === questions.length - 1 ? (

<button
className="primary-btn"
onClick={handleSubmit}
>
Submit
</button>

) : (

<button
className="primary-btn"
onClick={handleNext}
>
Next
</button>

)}

</div>

</div>

</div>

);

}

export default InterviewSession;