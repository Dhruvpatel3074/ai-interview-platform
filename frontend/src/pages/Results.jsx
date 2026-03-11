import { useLocation, useNavigate } from "react-router-dom";

function Results() {

const location = useLocation();
const navigate = useNavigate();

const data = location.state || {};

const results = data.results || [];
const role = data.role || "N/A";
const company = data.company || "N/A";
const score = data.score || 0;

return (

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