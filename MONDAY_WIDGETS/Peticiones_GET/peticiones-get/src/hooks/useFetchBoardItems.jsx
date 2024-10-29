import { useState, useEffect } from 'react';


const useFetchBoardItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBoardItems() {
      const query = `
        query {
          boards (ids: 7680917962){
            items_page {
              items {
              name
                column_values {
                  ... on NumbersValue {
                    number
                    id
                    symbol
                    direction
                  }
                }
              }
            }
          }
        }
      `;

      try {
        const response = await fetch('https://api.monday.com/v2', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'eyJhbGciOiJIUzI1NiJ9.eyJ0aWQiOjM2NjA0MDUyNiwiYWFpIjoxMSwidWlkIjo2MTQyNzk4MywiaWFkIjoiMjAyNC0wNS0zMFQxODo0NjoxOS4wMDBaIiwicGVyIjoibWU6d3JpdGUiLCJhY3RpZCI6MTY2NTczMDMsInJnbiI6InVzZTEifQ.FR7Ta7rJp6dRtumR2cNFHTVHMLfiDognJMEJEUE8Xdo' // Reemplaza con tu clave de API
          },
          body: JSON.stringify({ query })
        });

        const data = await response.json();
        setItems(data.data.boards[0].items_page.items); // Guardar los datos en el estado
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchBoardItems();
  }, []);

  return { items, loading, error };
};

export default useFetchBoardItems;
