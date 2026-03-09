import { useNavigate } from "react-router-dom";

function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer"
  ];

  const selectRole = (role) => {
    navigate("/interview-setup", { state: { role } });
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Select Interview Role</h2>

      {roles.map((role) => (
        <div key={role} style={{ marginTop: "10px" }}>
          <button onClick={() => selectRole(role)}>
            {role}
          </button>
        </div>
      ))}
    </div>
  );
}

export default RoleSelection;