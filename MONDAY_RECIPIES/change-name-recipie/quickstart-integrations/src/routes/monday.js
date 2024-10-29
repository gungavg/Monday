const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController = require('../controllers/monday-controller-change-name.js');
console.log(mondayController);

//esta ruta es para obtener los datos
router.post('/monday/get_remote_list_options', authenticationMiddleware, mondayController.getRemoteListOptions);
// rura para cambiar el nombre
router.post('/monday/change_name', authenticationMiddleware, mondayController.changeName);

module.exports = router;
