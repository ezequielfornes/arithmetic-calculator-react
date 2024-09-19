import React, { useState } from 'react';
import Calculator from './Calculator'; // Importamos el componente Calculator
import '../styles/Operations.css';

const Operaciones = ({ user, realizarOperacion }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleOperacion = async (tipoOperacion, monto) => {
    setLoading(true);
    setError(null);

    try {
      await realizarOperacion(tipoOperacion, monto); // Ejecuta la operación
    } catch (error) {
      setError('Error al realizar operación');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <p>Procesando...</p>
      ) : (
        <Calculator realizarOperacion={handleOperacion} /> // Usamos la calculadora aquí
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Operaciones;
