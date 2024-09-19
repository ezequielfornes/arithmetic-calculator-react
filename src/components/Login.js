import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(process.env.REACT_APP_API_BASE_URL+'/api/v1/auth/login', 
        { username, password }, 
        {
        headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true 
          
        }
      );
      console.log("Respuesta completa:", response);
      var token  = response.data.token;
      if (response && response.data) {
        console.log("Token recibido:", response.data.token);
    } else {
        console.log("La respuesta no contiene token:", response);
    }
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('username', username);
      navigate('/dashboard');
  
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError('Invalid username or password');
    }
  };
  

  const handleRegisterRedirect = () => {
    navigate('/register'); 
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      
      <button onClick={handleRegisterRedirect} style={{ marginTop: '10px' }}>
        Not registered? Sign up here
      </button>
    </div>
  );
};

export default Login;
