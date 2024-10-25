const router = require('express').Router();
const { authenticationMiddleware } = require('../middlewares/authentication');
const mondayController2 = require('../controllers/monday-controller');


router.post('/monday/execute_action', authenticationMiddleware, mondayController2.executeAction);

module.exports = router;
