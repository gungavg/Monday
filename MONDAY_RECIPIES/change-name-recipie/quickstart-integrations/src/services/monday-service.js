const initMondayClient = require('monday-sdk-js');

const getColumnValue = async (token, itemId) => {
  try {
    const mondayClient = initMondayClient();
    mondayClient.setToken(token);
    mondayClient.setApiVersion('2024-04');

    const query = `query($itemId: [ID!]) {
        items (ids: $itemId) {
          name
        }
      }`;
    const variables = { itemId };

    const response = await mondayClient.api(query, { variables });
    console.log("este es el nombre");
    console.log(response.data.items[0].name);
    
    return response.data.items[0].name;
  } catch (err) {
    console.error(err);
  }
};

const changeColumnValue = async (token, boardId, itemId, value,columnId='name') => {
  try {
    const mondayClient = initMondayClient({ token });
    mondayClient.setApiVersion("2024-01");

    // Si el valor es un string, convierte a JSON
    const parsedValue = typeof value === 'string' ? JSON.stringify(value) : value;

    const query = `mutation change_column_value($boardId: ID!, $itemId: ID!, $columnId: String!, $value: JSON!) {
        change_column_value(board_id: $boardId, item_id: $itemId, column_id: $columnId, value: $value) {
          id
        }
      }
      `;
    const variables = { boardId, columnId, itemId, value: parsedValue };

    const response = await mondayClient.api(query, { variables });
    console.log(parsedValue);
    console.log(response)
    return response;
  } catch (err) {
    console.error(err);
  }
};


module.exports = {
  getColumnValue,
  changeColumnValue,
};
