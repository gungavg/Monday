const mondayService = require('../services/monday-service');
const transformationService = require('../services/changeName-service');
const { TRANSFORMATION_TYPES } = require('../constants/changeNameTransformation');

async function changeName(req, res) {
  const { shortLivedToken } = req.session;
  const { payload } = req.body;
console.log("FUNCION CHANGE NAME");
  try {
    const { inputFields } = payload;
    //se obtienen los datos que se van a cambiar, aqui deben de esttar los keys que se ocuparon dentro de la configuracion de la receta
    const { boardId, itemId, name, transformationType } = inputFields;

    const text = await mondayService.getColumnValue(shortLivedToken, itemId, name);
    if (!text) {
      return res.status(200).send({});
    }
    const transformedText = transformationService.changeName(
      text,
      transformationType ? transformationType.value : 'Sin_espacios'
    );

    await mondayService.changeColumnValue(shortLivedToken, boardId, itemId, transformedText);

    return res.status(200).send({});
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

async function getRemoteListOptions(req, res) {
  try {
    return res.status(200).send(TRANSFORMATION_TYPES);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'internal server error' });
  }
}

module.exports = {
  changeName,
  getRemoteListOptions,
};
