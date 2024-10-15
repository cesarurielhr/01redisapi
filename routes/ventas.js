const express = require('express');
   const router = express.Router();
   const ventasController = require('../controllers/ventasController');
   
   // Ruta para añadir un nuevo cliente
   router.post('/:ventasId/sucursal/:sucursalId',ventasController.postsales);
   
   module.exports = router;