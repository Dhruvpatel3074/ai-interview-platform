import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Results(){

const location = useLocation();
const navigate = useNavigate();

const data = location.state || {};

const results = data.results || [];
const role = data.role || "N/A";
const company = data.company || "N/A";
const score = data.score || 0;

const [aiEvaluation,setAiEvaluation] = useState("");

useEffect(()=>{

const evaluateInterview = async () => {

try{

const response = await fetch(
"http://localhost:5000/api/evaluate-interview",
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
role:role,
company:company,
responses:results
})
}
);

const data = await response.json();

setAiEvaluation(data.evaluation);

}catch(error){

setAiEvaluation("Evaluation unavailable");

}

};

evaluateInterview();

},[]);

return(

<div className="dashboard-page">

<div className="dashboard-wrapper">

<div className="how-card" style={{maxWidth:"700px",margin:"auto"}}>

<h1>Interview Results</h1>

<br/>

<p><strong>Company:</strong> {company}</p>
<p><strong>Role:</strong> {role}</p>

<h2>Score: {score} / 100</h2>

<br/>

<h2>Your Responses</h2>

<br/>

{results.map((item,index)=>{

return(

<div
key={index}
style={{
border:"1px solid #e5e7eb",
padding:"15px",
borderRadius:"8px",
marginBottom:"15px",
background:"#f9fafb"
}}
>

<p style={{fontWeight:"600"}}>
Question {index+1}
</p>

<p style={{marginBottom:"10px"}}>
{item.question}
</p>

<p>
<strong>Answer:</strong>
<br/>
{item.answer || "Skipped"}
</p>

</div>

);

})}

<br/>

<h2>AI Interview Feedback</h2>

<div
style={{
border:"1px solid #e5e7eb",
padding:"15px",
borderRadius:"8px",
background:"#f9fafb"
}}
>

<pre style={{whiteSpace:"pre-wrap"}}>
{aiEvaluation ? aiEvaluation : "Evaluating interview..."}
</pre>

</div>

<br/>

<div style={{
display:"flex",
gap:"15px",
justifyContent:"center"
}}>

<button
className="primary-btn"
onClick={()=>navigate("/role-selection")}
>
Start New Interview
</button>

<button
className="primary-btn"
onClick={()=>navigate("/history")}
>
View Interview History
</button>

<button
className="secondary-btn"
onClick={()=>navigate("/dashboard")}
>
Back to Dashboard
</button>

</div>

</div>

</div>

</div>

);

}

export default Results;