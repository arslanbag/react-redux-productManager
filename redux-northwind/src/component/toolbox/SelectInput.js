import React from "react";

const SelectInput = ({
  name,
  label,
  onChange,
  defaultOption,
  value,
  error,
  options,
}) => {
  return (
    <div className="form-group">
      <b><label htmlFor={name}>{label}</label></b>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      >
        <option value="">{defaultOption}</option>
        {options.map((c) => {
          return (
            <option key={c.id} value={c.id}>
              {c.categoryName}
            </option>
          )
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};
export default SelectInput;
