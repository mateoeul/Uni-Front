import React from 'react';
import './style.css';

const Select = ({
  name,
  placeholder,
  value,
  onChange,
  error,
  required = false,
  options = [],
  className = '',
  ...props
}) => {
  return (
    <div className="select-container">
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`custom-select ${error ? 'select-error' : ''} ${className}`}
        {...props}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => (
          <option key={index} value={option.value || option}>
            {option.label || option}
          </option>
        ))}
      </select>
      {error && <span className="select-error-message">{error}</span>}
    </div>
  );
};

export default Select; 