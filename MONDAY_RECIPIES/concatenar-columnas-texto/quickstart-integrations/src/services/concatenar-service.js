const initMondayClient = require('monday-sdk-js');
// obtener valores 
const getColumnValue = async (token, itemId, columnId1) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion('2024-04');

    const query = `query($itemId: ID!, $columnId1: String!) {
      items (ids: [$itemId]) {
        column_values(ids: [$columnId1]) {
          id
          value
        }
      }
    }`;

    const variables = { columnId1, itemId };
    console.log(variables); // Verifica los valores que se están enviando

    const response = await mondayClient.api(query, { variables });
    console.log(response.data.items[0]);  // Verifica la estructura completa de la respuesta

    if (!response.data || !response.data.items || !response.data.items[0]) {
      throw new Error('No items returned from the API');
    }

    return response.data.items[0].column_values;
  } catch (err) {
    console.error(err);
  }
};


const changeColumnValue = async (token, boardId, itemId, columnId, newValue) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);

    const mutation = `mutation ($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
      change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
        id
      }
    }`;
    const jsonValue = JSON.stringify(newValue);
    const variables = {
      boardId,
      itemId,
      columnId,
      value: jsonValue  // El valor debe ser un JSON válido
    };

    const response = await mondayClient.api(mutation, { variables });
    console.log(response);  // Verifica la respuesta completa

  } catch (err) {
    console.error(err);
  }
};


module.exports = {
  getColumnValue,
  changeColumnValue,
};
