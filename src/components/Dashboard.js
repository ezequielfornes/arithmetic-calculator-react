import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import Operaciones from './Operaciones'; 
import History from './History';
import '../styles/Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
    loadHistory();
  }, []);

  const loadUser = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/user');
      setUser(response.data);
      setBalance(response.data.balance); 
      
    } catch (error) {
      setError('Error al cargar los datos del usuario');
    }
  };

  const loadHistory = async () => {
    try {
      const response = await axiosInstance.get('/api/v1/records'); 
      
      const fetchedHistory = response.data.records || [];
      
      if (fetchedHistory.length === 0) {
        console.log("No records found.");
      }

      setHistory(fetchedHistory);
      
    } catch (error) {
      setError('Error loading operation history');
    }
  };

  const realizarOperacion = async (type, amount, username) => {
    try { 
      const response = await axiosInstance.post('/api/v1/operation', {
        username,
        type,
        amount
      });
      loadHistory();
      setBalance(response.data.result.Balance);
      setHistory(prevHistorial => [...prevHistorial, response.data.result]); 

    } catch (error) {
      setError('Error al realizar la operación');
    }
  };

  const handleLogOut = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="dashboard">
      {error && <p className="error">{error}</p>}
      {user ? (
        <div>
           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1>Bienvenido, {user.username}!</h1>
            <button 
              onClick={handleLogOut} 
              style={{ backgroundColor: '#ff4d4d', color: '#fff', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>
              Log Out
            </button>
          </div>
          <h2>Tu saldo es: {balance} USD</h2>

          <Operaciones realizarOperacion={realizarOperacion} />

          <History history={history} />
        </div>
      ) : (
        <p>Cargando usuario...</p>
      )}
    </div>
  );
};

export default Dashboard;
