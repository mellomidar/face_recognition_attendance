import React, {useState} from 'react';
import bisu_logo from '../assets/bisu-logo.png';
import Axios from 'axios';
import Alert from '../components/Alert';
import Cookies from 'js-cookie';

const Authentication = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await Axios.get('http://localhost:5000/api/authenticate', {
                params: {
                    username: username,
                    password: password
                }
            });
            console.log(response)
            if(response.data.token) {
                console.log(response.data.token)
                Cookies.set('jwt', response.data.token, {expires: 7});
                localStorage.setItem('jwt', response.data.token)
                document.getElementById('auth').style.display = 'none';
            } else {
                setAlertText("Login Failed");
                setShowAlert(!showAlert);
            }
            clearForm();
        } catch (error) {
            console.log('Login Failed')
        }
    }

    const clearForm = () => {
        setUsername("");
        setPassword("");
    }

    return (
        <div className='authentication' id='auth'>
            <div className='auth-form-container'>
                <div className='login_top'>
                    <img src={bisu_logo} alt='bisu logo'/>
                    <h2>Bohol Island State University</h2>
                    <hr></hr>
                </div>
                <form className='auth-form' onSubmit={handleLogin}>
                    <div className='input-group'>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text' 
                            id='username' 
                            name='username' 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className='input-group'>
                    <label htmlFor='password'>Password</label>  
                        <input 
                            type='password' 
                            id='password' 
                            name='password' 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <p>Forgot Password?</p>
                    <button type='submit'>Login</button>
                </form>
            </div>
            {showAlert && (<Alert type="sucess" message={alertText}/>)}
        </div>
    );
};

export default Authentication;