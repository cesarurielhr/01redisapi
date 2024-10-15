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

   
    exports.getsearch = async (req, res) => {
       const {sucursal,latitud, longitud,rango,unidad} = req.params;

       console.log('Clave:', sucursal);
   
       try {
           // Usar await para obtener los detalles del producto
           // Usar sendCommand para ejecutar el comando GEORADIUS
           const locations = await redisClient.sendCommand(['GEORADIUS', sucursal,latitud, longitud,rango, unidad, 'WITHDIST']);
            
        res.status(202).json(locations);
          
       
       } catch (error) {
           console.error('Error:', error);
           return res.status(500).json({ message: 'Error al procesar la solicitud', error });
       }
   };