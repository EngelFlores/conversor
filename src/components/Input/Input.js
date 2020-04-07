import React from 'react';
import "./Input.css"

const Input = ({ type, label, onBlur, placeholder, onChange, value, name,idTest}) => {

  return (
    <div>
      <label> {label}
      <input type={type} placeholder={placeholder} data-testid={idTest} name ={name} onBlur={onBlur} onChange={onChange} value={value}/>
      </label>
    </div>
  )
}

export default Input

