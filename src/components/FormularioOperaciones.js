import React, { useState } from 'react';
import '../styles/OperationForm.css';
const FormularioOperaciones = ({ realizarOperacion }) => {
  const [monto, setMonto] = useState('');
  const [tipoOperacion, setTipoOperacion] = useState('addition'); 

  const manejarSubmit = (e) => {
    e.preventDefault();
    const parsedMonto = parseFloat(monto);

    if (isNaN(parsedMonto) || parsedMonto <= 0) {
      alert('Por favor, introduce un monto válido'); 
      return;
    }

    realizarOperacion(tipoOperacion, parsedMonto); 
    setMonto('');
  };

  return (
    <form onSubmit={manejarSubmit}>
      <label>
        Monto:
        <input 
          type="number" 
          value={monto} 
          onChange={(e) => setMonto(e.target.value)} 
          placeholder="0.00"
        />
      </label>

      <label>
        Operación:
        <select value={tipoOperacion} onChange={(e) => setTipoOperacion(e.target.value)}>
          <option value="addition">Sumar</option>
          <option value="subtraction">Restar</option>
          <option value="multiplication">Multiplicar</option>
          <option value="division">Dividir</option>
          <option value="square_root">Raíz Cuadrada</option>
          <option value="random_string">Cadena Aleatoria</option>
        </select>
      </label>

      <button type="submit">Ejecutar</button>
    </form>
  );
};

export default FormularioOperaciones;
