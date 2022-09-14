import React from 'react';
import './Button.css';

export const Button = ({ click, text }) => {
  return (
    <button onClick={ click }>{ text }</button>
  )
}
