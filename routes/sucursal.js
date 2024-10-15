const express = require('express');
   const router = express.Router();
const sucursalController = require('../controllers/sucursalController');
router.get('/:sucursalId/clientes', sucursalController.getclients);

module.exports = router;