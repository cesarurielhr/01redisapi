const express = require('express');
   const router = express.Router();
   const searchController = require('../controllers/searchController');
   
   // Ruta para añadir un nuevo cliente
   router.get('/:sucursal/:latitud/:longitud/:rango/:unidad',searchController.getsearch);
   
   module.exports = router;