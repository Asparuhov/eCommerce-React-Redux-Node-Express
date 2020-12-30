import React, {useState} from "react";
import './App.css';
import axios from 'axios';
export default function App() {
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState(''); 
  const register = () => {
    axios({
      method: 'post',
      data: {
        username: registerUsername,
        password: registerPassword
      },
      withCredentials: true,
      url: 'http://localhost:4002/register'
    }).then(res => console.log(res)).catch(err => console.log(err));
  };
  const login = () => {
    axios({
      method: 'post',
      data: {
        username: loginUsername,
        password: loginPassword
      },
      withCredentials: true,
      url: 'http://localhost:4002/login'
    }).then(res => console.log(res)).catch(err => console.log(err));
  };
  const getUser = () => {
    axios({
      method: 'get',
      withCredentials: true,
      url: 'http://localhost:4002/getUser'
    }).then(res => console.log(res)).catch(err => console.log(err));
  };
  return (
    <div className='app'>
      <div>
        <h1>Register</h1>
        <input type="text" palceholder="username" onChange={e => setRegisterUsername(e.target.value)}/>
        <input type="password" palceholder="password" onChange={e => setRegisterPassword(e.target.value)} />
        <button onClick={register}>Submit</button>
      </div>
      <div>
        <h1>Login</h1>
        <input type="text" palceholder="username" onChange={e => setLoginUsername(e.target.value)}/>
        <input type="password" palceholder="password" onChange={e => setLoginPassword(e.target.value)} />
        <button onClick={login}>Submit</button>
      </div>
      <div>
        <h1>Get user</h1>
        <button onClick={getUser}>Get User</button>
      </div>
    </div>
  );
}
