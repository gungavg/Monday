import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

// Configura el cliente Apollo
const client = new ApolloClient({
  uri: 'https://api.monday.com/v2',
  cache: new InMemoryCache(),
  headers: {
    'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM2NjA0MDUyNiwiYWFpIjoxMSwidWlkIjo2MTQyNzk4MywiaWFkIjoiMjAyNC0wNS0zMFQxODo0NjoxOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY2NTczMDMsInJnbiI6InVzZTEifQ.FR7Ta7rJp6dRtumR2cNFHTVHMLfiDognJMEJEUE8Xdo',
    'Content-Type': 'application/json',
  },
});

// Define la consulta GraphQL
const GET_BOARDS = gql`
  query {
    boards (limit: 5) {
      id
      name
    }
  }
`;

// Componente para mostrar los tableros
function BoardList() {
  const { loading, error, data } = useQuery(GET_BOARDS);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.boards.map(board => (
        <li key={board.id}>{board.name}</li>
      ))}
    </ul>
  );
}

// Componente principal de la aplicación
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <h1>Mis tableros de Monday.com</h1>
        <BoardList />
      </div>
    </ApolloProvider>
  );
}

export default App;