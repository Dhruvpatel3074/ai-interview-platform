import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../components/Button";

function RoleSelection() {

  const navigate = useNavigate();

  const [role, setRole] = useState("Frontend Developer");
  const [company, setCompany] = useState("Google");

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer"
  ];

  const companies = [
    "Google",
    "Microsoft",
    "Amazon",
    "Apple",
    "Meta",
    "Netflix",
    "Tesla",
    "Nvidia",
    "Adobe",
    "IBM",
    "Oracle",
    "Intel",
    "Samsung",
    "Sony",
    "Uber",
    "Airbnb",
    "Spotify",
    "LinkedIn",
    "PayPal",
    "Salesforce",
    "Cisco",
    "Dell",
    "HP",
    "SAP",
    "Accenture",
    "Capgemini",
    "TCS",
    "Infosys",
    "Wipro",
    "HCLTech",
    "Tech Mahindra",
    "Zoho",
    "Freshworks",
    "Flipkart",
    "Paytm",
    "PhonePe",
    "Razorpay",
    "Zomato",
    "Swiggy",
    "Ola",
    "Postman",
    "BrowserStack",
    "Chargebee",
    "Dream11",
    "PolicyBazaar",
    "Urban Company",
    "Lenskart",
    "Udaan",
    "CRED",
    "Groww"
  ];

  const handleNext = () => {
    navigate("/interview-setup", {
      state: { role, company }
    });
  };

  return (
    <div style={{ textAlign: "center", padding: "40px" }}>

      <h2>Select Role and Company</h2>

      <br />

      <h3>Select Role</h3>

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      >
        {roles.map((r, index) => (
          <option key={index} value={r}>
            {r}
          </option>
        ))}
      </select>

      <br /><br />

      <h3>Select Company</h3>

      <select
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      >
        {companies.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select>

      <br /><br /><br />

      <Button text="Next" onClick={handleNext} />

    </div>
  );
}

export default RoleSelection;