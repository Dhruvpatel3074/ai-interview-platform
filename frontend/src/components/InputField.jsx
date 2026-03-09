function InputField({ type, placeholder, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{
        padding: "10px",
        width: "250px",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
  );
}

export default InputField;