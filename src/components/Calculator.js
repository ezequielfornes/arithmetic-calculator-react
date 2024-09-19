import React, { useState } from 'react';
import '../styles/Calculator.css';

const Calculator = ({ realizarOperacion }) => {
  const [amount, setAmount] = useState('');
  const [operationType, setOperationType] = useState('addition'); // Default operation

  const handleNumberClick = (value) => {
    if (value === 'C') {
        setAmount('0');
      } else if (value === '.') {
        if (!amount.includes('.')) {
          setAmount(amount + value);
        }
      } else if (value === '←') {
        setAmount(amount.length > 1 ? amount.slice(0, -1) : '0');
      } else {
        setAmount(amount === '0' ? value : amount + value);
      }
  };

  const handleOperationChange = (e) => {
    setOperationType(e.target.value);
  };

  const handleSubmit = () => {
    const parsedAmount = parseFloat(amount);
    
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    realizarOperacion(operationType, parsedAmount);
    setAmount('');
  };

  return (
     <div className="calculator">
      <input type="text" value={amount} readOnly />
      <div className="buttons">
        <button onClick={() => handleNumberClick('1')}>1</button>
        <button onClick={() => handleNumberClick('2')}>2</button>
        <button onClick={() => handleNumberClick('3')}>3</button>
        <button onClick={() => handleNumberClick('4')}>4</button>
        <button onClick={() => handleNumberClick('5')}>5</button>
        <button onClick={() => handleNumberClick('6')}>6</button>
        <button onClick={() => handleNumberClick('7')}>7</button>
        <button onClick={() => handleNumberClick('8')}>8</button>
        <button onClick={() => handleNumberClick('9')}>9</button>
        <button onClick={() => handleNumberClick('0')}>0</button>
        <button onClick={() => handleNumberClick('.')}>.</button>
        <button onClick={() => handleNumberClick('←')}>←</button>
        <button onClick={() => handleNumberClick('C')}>C</button>
      </div>
      <div className="operations">
        <select value={operationType} onChange={handleOperationChange}>
          <option value="addition">Addition</option>
          <option value="subtraction">Subtraction</option>
          <option value="multiplication">Multiplication</option>
          <option value="division">Division</option>
          <option value="square_root">Square Root</option>
          <option value="random_string">Random String</option>
        </select>
        <button onClick={handleSubmit}>Execute</button>
      </div>
    </div>
  );
};

export default Calculator;
