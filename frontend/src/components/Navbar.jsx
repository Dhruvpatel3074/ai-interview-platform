import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "60px",
        backgroundColor: "#2b4aa0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        boxSizing: "border-box",
        color: "white",
        zIndex: "1000"
      }}
    >
      <h3 style={{ margin: 0 }}>AI Interview Platform</h3>

      <button
        onClick={handleLogout}
        style={{
          padding: "6px 14px",
          backgroundColor: "white",
          color: "#2b4aa0",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontWeight: "bold",
          width: "auto"
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Navbar;