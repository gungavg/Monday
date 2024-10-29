import React from 'react';
import useFetchBoardItems from './hooks/useFetchBoardItems.jsx';

function App() {
  const { items, loading, error } = useFetchBoardItems();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Board Items</h1>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.column_values.map((column, idx) => (
              <div key={idx}>
                <p>ID: {column.id}</p>
                <p>Number: {column.number}</p>
                <p>Symbol: {column.symbol}</p>
                <p>Direction: {column.direction}</p>
              </div>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
