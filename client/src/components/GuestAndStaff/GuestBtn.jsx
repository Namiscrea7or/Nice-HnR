import React from 'react';
import { Link } from "react-router-dom";

function GuestBtn() {
  return (
    <Link to="/home" className='button'>GUEST</Link>
  );
}

export default GuestBtn;
