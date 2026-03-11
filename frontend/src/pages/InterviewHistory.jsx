import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function InterviewHistory(){

const navigate = useNavigate();

const [history,setHistory] = useState([]);

useEffect(()=>{

const storedHistory =
JSON.parse(localStorage.getItem("interviewHistory")) || [];

setHistory(storedHistory);

},[]);

const clearHistory = ()=>{

localStorage.removeItem("interviewHistory");
setHistory([]);

};

return(

<div className="dashboard-page">

<div className="dashboard-wrapper">

<div className="how-card" style={{maxWidth:"700px",margin:"auto"}}>

<h1>Interview History</h1>

<br/>

{history.length === 0 && (
<p>No interviews taken yet.</p>
)}

{history.length > 0 && (

<button
className="secondary-btn"
onClick={clearHistory}
style={{marginBottom:"20px"}}
>
Clear History
</button>

)}

{history.map((item,index)=>(
<div
key={index}
style={{
border:"1px solid #e5e7eb",
padding:"15px",
borderRadius:"8px",
marginBottom:"10px",
background:"#f5f5f5"
}}
>

<p><strong>Company:</strong> {item.company}</p>
<p><strong>Role:</strong> {item.role}</p>
<p><strong>Score:</strong> {item.score}</p>
<p><strong>Date:</strong> {item.date}</p>

</div>
))}

<br/>

<button
className="primary-btn"
onClick={()=>navigate("/dashboard")}
>
Back to Dashboard
</button>

</div>

</div>

</div>

);

}

export default InterviewHistory;