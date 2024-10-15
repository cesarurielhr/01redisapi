const redis = require('redis');
   
   // Crear cliente de Redis
   const redisClient = redis.createClient({
       url: process.env.REDIS_URL || 'redis://localhost:6379'
   });
   
   // Verificar conexion a redis
   redisClient.connect().catch(err => {
       console.error('Error al conectar con Redis:', err);
   });
   
   redisClient.on('connect', () => {
       console.log('Conectado a Redis');
   });
   
   redisClient.on('error', (err) => {
       console.error('Error al conectar con Redis:', err);
   });

exports.postsales = async (req, res) => {
       const {sucursalId,ventasId} = req.params;
       const {ventaId, productoId, cantidad, costo_unitario,rfc, fecha, hora} = req.body;
       const redisKey = `sucursal:${sucursalId}:ventas:${ventasId} `;
        const newVenta = `VENTA:${ventaId}:PRODUCTO:${productoId}:CANTIDAD:${cantidad}:COSTO_UNITARIO:${costo_unitario}:TOTAL:${cantidad*costo_unitario}:CLIENTE:${rfc}:SUCURSAL:${sucursalId}:FECHA:${fecha}:HORA:${hora}`;
       console.log('Clave:', redisKey,"\n",newVenta);
       
    
           // Usar await para obtener los detalles del producto
           const productDetails = await redisClient.rPush(redisKey,newVenta);
           
           // Retornar los detalles del producto si se encuentra
           return res.status(200).json(req.body);
       
   };
