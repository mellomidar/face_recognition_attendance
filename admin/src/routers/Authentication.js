import React, {useState, useEffect} from 'react';
import bisu_logo from '../assets/bisu-logo.png'

const Authentication = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        <img src={bisu_logo} alt='bisu logo'/>
    }

    return (
        <div className='authentication'>
            <div className='auth-form-container'>
                <div className='login_top'>
                    <img src={bisu_logo} alt='bisu logo'/>
                    <h2>Bohol Island State University</h2>
                    <hr></hr>
                </div>
            </div>
        </div>
    );
};

export default Authentication;