import { useState } from "react";

function InputField({
  type = "text",
  placeholder,
  value,
  onChange
}) {

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div style={{ position: "relative", width: "300px", margin: "auto" }}>

      <input
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          padding: "10px",
          paddingRight: isPassword ? "40px" : "10px",
          borderRadius: "6px",
          border: "1px solid #ccc",
          fontSize: "16px"
        }}
      />

      {isPassword && (
        <span
          onClick={() => setShowPassword(!showPassword)}
          style={{
            position: "absolute",
            right: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            cursor: "pointer",
            fontSize: "18px"
          }}
        >
          {showPassword ? "🙈" : "👁"}
        </span>
      )}

    </div>
  );
}

export default InputField;