 const express = require('express');
 const dotenv = require('dotenv');
   
   // Import routes
   const productRoutes = require('./routes/producto');
   const clientRoutes = require('./routes/clients');
   const salesRoutes = require('./routes/ventas');
   const searchRoutes = require('./routes/search');
   const sucursalRoutes = require('./routes//sucursal');
   
   dotenv.config();
   
   const app = express();
  
   app.use(express.json());
   
   
   app.use('/producto', productRoutes);
   app.use('/clients', clientRoutes);
   app.use('/ventas', salesRoutes);
  app.use('/search', searchRoutes);
  app.use('/sucursal', sucursalRoutes);

   module.exports = app;