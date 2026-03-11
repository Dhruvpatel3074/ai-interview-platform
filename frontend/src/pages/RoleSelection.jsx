import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RoleSelection() {

const navigate = useNavigate();

const [company, setCompany] = useState("");
const [role, setRole] = useState("");

const handleContinue = () => {

if(!company || !role) return;

navigate("/interview-setup",{
state:{
company,
role
}
});

};

return (

<div className="dashboard-page">

<div className="dashboard-wrapper">

<h1 className="dashboard-heading">
Select Role & Company
</h1>

<p className="dashboard-description">
Choose your target company and role to start practicing interview questions.
</p>

{/* Back Button */}

<div style={{marginBottom:"20px"}}>

<button
className="secondary-btn"
onClick={()=>navigate("/dashboard")}
>
← Back to Dashboard
</button>

</div>

<div className="how-card">

{/* Company */}

<div style={{marginBottom:"25px"}}>

<label style={{fontWeight:"600"}}>
Select Company <span style={{color:"red"}}>*</span>
</label>

<br/>

<select
value={company}
onChange={(e)=>setCompany(e.target.value)}
style={{
marginTop:"10px",
padding:"12px",
width:"100%",
borderRadius:"10px"
}}
>

<option value="">Choose Company</option>

<option>Google</option>
<option>Microsoft</option>
<option>Amazon</option>
<option>Meta</option>
<option>Apple</option>
<option>Netflix</option>
<option>Adobe</option>
<option>IBM</option>
<option>Intel</option>
<option>Oracle</option>
<option>Wipro</option>
<option>TCS</option>
<option>Infosys</option>
<option>HCL</option>
<option>Accenture</option>

</select>

</div>

{/* Role */}

<div style={{marginBottom:"30px"}}>

<label style={{fontWeight:"600"}}>
Select Role <span style={{color:"red"}}>*</span>
</label>

<br/>

<select
value={role}
onChange={(e)=>setRole(e.target.value)}
style={{
marginTop:"10px",
padding:"12px",
width:"100%",
borderRadius:"10px"
}}
>

<option value="">Choose Role</option>

<option>Frontend Developer</option>
<option>Backend Developer</option>
<option>Full Stack Developer</option>
<option>Software Engineer</option>
<option>DevOps Engineer</option>
<option>Data Engineer</option>
<option>Machine Learning Engineer</option>

</select>

</div>

<button
className="primary-btn"
disabled={!company || !role}
onClick={handleContinue}
style={{
width:"100%",
opacity:(!company || !role)?0.5:1,
cursor:(!company || !role)?"not-allowed":"pointer"
}}
>

Continue

</button>

</div>

</div>

</div>

);

}

export default RoleSelection;