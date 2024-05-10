import React from 'react';

const RadioGroup = ({ children, label }) => {

  return (
    <div role="radiogroup" aria-labelledby="radio-group-label">
      <label className="radio-group-label">
        {label}
      </label>
      {children}
    </div>
  );
};

export default RadioGroup;