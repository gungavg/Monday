const mondayService = require('../services/concatenar-service');

async function executeAction(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;

  try {
    const { inputFields } = payload;
//obtencion de los datos que configuramos dentro de monday
    const { boardId, itemId, columnId, columnId_1, columnId_2 } = inputFields;

    const columnValues1 = await mondayService.getColumnValue(shortLivedToken, itemId, columnId);
    const columnValues2 = await mondayService.getColumnValue(shortLivedToken, itemId, columnId_1);
    console.log("value 2");
    console.log(columnValues2);
    const text1 = columnValues1[0].value;
    const text2 = columnValues2[0].value;
    
    if (!text1 || !text2) {
      return res.status(200).send({});
    }

    // Concatenar los valores como texto simple
    const concatenatedText = text1.toString().replace(/['"]/g, "") +" "+ text2.toString().replace(/['"]/g, "");
 
    // Cambiar el valor de la columna con el texto concatenado
    await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, columnId_2, concatenatedText);

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}


module.exports = {
  executeAction,
  
};
