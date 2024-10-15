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

exports.getclients = async (req, res) => {
  try {
    // Obtener todos los IDs de los clientes
    const {sucursalId} = req.params;
    const key = `sucursal:${sucursalId}:clientes`;
    const clientIds = await redisClient.sMembers(key);

    res.json(clientIds); // Devuelve los clientes como JSON
  } catch (error) {
    console.error('Error retrieving clients:', error);
    res.status(500).send('Error retrieving clients');
  }
};