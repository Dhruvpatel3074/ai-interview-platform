import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateQuestions } from "../services/api";

export default function InterviewSetup() {

const navigate = useNavigate();
const location = useLocation();

const [role,setRole] = useState("");
const [company,setCompany] = useState("");

const [difficulty,setDifficulty] = useState("");
const [questionCount,setQuestionCount] = useState("");

useEffect(()=>{

if(location.state?.role && location.state?.company){

setRole(location.state.role);
setCompany(location.state.company);

localStorage.setItem("selectedRole",location.state.role);
localStorage.setItem("selectedCompany",location.state.company);

}else{

const savedRole = localStorage.getItem("selectedRole");
const savedCompany = localStorage.getItem("selectedCompany");

if(savedRole) setRole(savedRole);
if(savedCompany) setCompany(savedCompany);

}

},[location.state]);


const startInterview = async () => {

if(!difficulty || !questionCount) return;

const questions = await generateQuestions(
role,
company,
difficulty,
Number(questionCount)
);

localStorage.setItem(
"interviewQuestions",
JSON.stringify(questions)
);

navigate("/interview-session",{
state:{
role,
company,
difficulty,
questionCount
}
});

};


return (

<div className="dashboard-page">

<div className="dashboard-wrapper">

<button
className="secondary-btn"
style={{marginBottom:"25px"}}
onClick={()=>navigate("/role-selection")}
>
← Back
</button>

<h1 className="dashboard-heading">
Interview Setup
</h1>

<p className="dashboard-description">
Configure your interview settings before starting.
</p>

<div className="how-card">

<p style={{marginBottom:"10px"}}>
<strong>Role:</strong> {role || "Not Selected"}
</p>

<p style={{marginBottom:"30px"}}>
<strong>Company:</strong> {company || "Not Selected"}
</p>

<div style={{marginBottom:"25px"}}>

<label style={{fontWeight:"600"}}>
Difficulty <span style={{color:"red"}}>*</span>
</label>

<br/>

<select
value={difficulty}
onChange={(e)=>setDifficulty(e.target.value)}
style={{
marginTop:"10px",
padding:"12px",
width:"100%",
borderRadius:"10px"
}}
>

<option value="">Choose Difficulty</option>
<option value="Easy">Easy</option>
<option value="Medium">Medium</option>
<option value="Hard">Hard</option>

</select>

</div>

<div style={{marginBottom:"30px"}}>

<label style={{fontWeight:"600"}}>
Number of Questions <span style={{color:"red"}}>*</span>
</label>

<br/>

<select
value={questionCount}
onChange={(e)=>setQuestionCount(e.target.value)}
style={{
marginTop:"10px",
padding:"12px",
width:"100%",
borderRadius:"10px"
}}
>

<option value="">Choose Questions</option>
<option value="5">5</option>
<option value="10">10</option>
<option value="15">15</option>
<option value="20">20</option>

</select>

</div>

<button
className="primary-btn"
style={{
width:"100%",
opacity:(!difficulty || !questionCount)?0.5:1,
cursor:(!difficulty || !questionCount)?"not-allowed":"pointer"
}}
disabled={!difficulty || !questionCount}
onClick={startInterview}
>
Start Interview
</button>

</div>

</div>

</div>

);

}