import React from 'react';
import '../App.css'

function IconButton(props) {

  return (
    <img
      src={props.src}
      alt={props.alt}
      onClick={props.onClick}
      className='register-records'
    />
  );
}

export default IconButton;