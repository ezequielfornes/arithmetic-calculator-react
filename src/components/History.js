import React from 'react';
import '../styles/History.css';

const History = ({ history }) => {
  if (history.length === 0) {
    return <p>No recent operations.</p>; 
  }

  return (
    <div className="history">
      <h3>Operation History</h3>
      <table>
        <thead>
          <tr>
            <th>Operation</th>
            <th>Result</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {history.map((op, index) => (
            <tr key={index}>
              <td>{op.OperationType}</td>
              <td>{op.OperationResponse}</td>
              <td>{op.UserBalance} USD</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
