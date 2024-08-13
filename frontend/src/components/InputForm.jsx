import React from "react";

const InputForm = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <label>{label} &nbsp;:</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full max-w-xs input input-bordered"
        required
      />
    </div>
  );
};

export default InputForm;
