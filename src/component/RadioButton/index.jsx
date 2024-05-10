import classNames from 'classnames';
import React from 'react';
import './index.css';
import RadioCheckIcon from '../../assets/RadioCheckIcon';

const RadioButton = ({ value, checked, onChange, label }) => {
  const callOnChange = (e) => {
    if((e.key === 'Enter' && e.type === "keydown") || e.type === 'click'){
        onChange?.(value)
    }
  }
  return (
    // handle arrow key for a11y compliance and make tabindex of 1st checked
    <div role="radio" aria-checked={checked} aria-label={label} tabIndex="0" onClick={callOnChange} onKeyDown={callOnChange} className={classNames('radio-item', {
        'radio-item-checked': checked
      })} >
      {label}
      {checked && <RadioCheckIcon className="test"/>}
    </div>
  );
};

export default RadioButton;