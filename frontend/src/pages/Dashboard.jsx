import { useNavigate } from "react-router-dom";

function Dashboard() {

const navigate = useNavigate();

return (

<div className="dashboard-page">

<div className="dashboard-wrapper">

<h1 className="dashboard-heading">
🚀 AI Interview Preparation Platform
</h1>

<p className="dashboard-description">
Practice technical interviews with AI and boost your confidence.
</p>

<div className="dashboard-buttons">

<button
className="primary-btn"
onClick={() => navigate("/role-selection")}
>
🎯 Start Interview
</button>

<button
className="secondary-btn"
onClick={() => navigate("/history")}
>
📜 Interview History
</button>

</div>

<div className="how-card">

<h2>How it works</h2>

<div className="steps">

<div className="step">
<span className="step-number">1</span>
<p>Select your role and company.</p>
</div>

<div className="step">
<span className="step-number">2</span>
<p>Answer AI generated interview questions.</p>
</div>

<div className="step">
<span className="step-number">3</span>
<p>Get feedback and improve performance.</p>
</div>

</div>

</div>

</div>

</div>

);

}

export default Dashboard;