function Button({ text, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "12px 20px",
        backgroundColor: "#2b4aa0",
        color: "white",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        width: "250px",
        fontSize: "16px"
      }}
    >
      {text}
    </button>
  );
}

export default Button;