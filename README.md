# DOCUMENTACION DE LA API  
## Bases de Datos NoSQL
> [!NOTE]
> **Alumno:** César Uriel Hernández Rodríguez `@cesarurielhr`  
> **Grupo:** 5A (7:00-8:00)  
> **Docente:** Jorge Saúl Montes Cáceres  

**1. Considere el caso de una empresa mayorista de materiales de construcción. Todas las ventas que hace una sucursal implica la emisión de una factura. A la empresa le interesan los siguientes aspectos:**

## Prerequisitos de las APIS:
**1.1 Desargar el archivo txt llamado datos.txt**

**1.2. Descargar desde DockerHub la imagen de la APIS con el siguiente comando:**
```
docker pull cesarurielhr/01_redis_api-app
```
**1.3 Inicializar un docker Compose en que incluya un contenedor api y otro contenedor que contenga la base de datos noSQL en este caso redis**
Se recomineda utilizar redisstack el puerto 8001 y si lo deseas puede agregar persistencia, ejemplo:
```
version: '3'
services:
     app:
       image: //nombre o id de la imagen
       container_name: node_app
       ports:
         - "3000:3000"
       environment:
         - //Conexion con redis
       depends_on:
         - redis
       command: npm start
   
     redis:
       image: redis/redis-stack:latest
       container_name: redis01
       ports:
         - "6379:6379"
         - "8001:8001"
       volumes:
         - /redisdb:/data 
```
**1.4 Iniciar el docker-compose**
**1.5 Implentar los datos del archivo txt, utilizando el multi excec**
**1.6 Utilizar el navegador de su preferencia y escribir localhost:3000 y tendra que salir el siguiente mensaje:**
```
  API con Node.js, Express y Redis
```
Esto confirma que contenedor de la api se creo exitosamente.

# 2. Querys

La siguiente documentacion se presenta la forma en la que puede consultar la informacion obtenida por la API con Conexion a redis

**Q1. Obtener los detalles de un producto dado su ID.**
Para el caso del cliente de redis es el siguiente:
```
HGETALL producto:1001:sucursal:111
```
La ruta para la consulta por PostMan es la siguiente:
```
/GET localhost:3000/producto/1001/sucursal/111
```
El endpoint /GET localhost:3000/producto/1001/sucursal/111 está compuesto por varias partes que cumplen diferentes funciones. Vamos a desglosarlo:

**Método HTTP: GET** Indica el tipo de operación que se va a realizar en el servidor. En este caso, es una solicitud para obtener información del servidor.

**localhost:** Se refiere a la máquina local (es decir, el servidor que está ejecutando en el mismo equipo desde donde se hace la solicitud).

**/3000** Es el puerto en el que la aplicación del servidor está escuchando. 

*nota: Estos datos se repiten para las demas querys.*

**/producto**Define el recurso al que se está accediendo, en este caso, producto. Esto indica que se está solicitando información relacionada con productos. Generalmente, este segmento define una colección o entidad.

**/1001** es un parámetro dinámico que representa el ID del producto que se está consultando.

**/111** es otro parámetro dinámico que representa el ID de la sucursal. 
Esto nos  indica que se está solicitando información relacionada con la sucursal 111 en el contexto del producto 1001 por lo cual al momento de ejecutar el meteodo get nos debe aparecer un JSON con la informacion obtenida de la consulta, **por ejemplo**:

Consulta del producto 1001 de la sucursal 111 en cual nos regresa el nombre del producto, precio y la categoria.
```
{
    "nombre": "Cemento",
    "precio": "200",
    "categoria": "Material de Construcción"
}
```

**Q2. Añadir un nuevo cliente al conjunto de clientes de una sucursal y verificar que no exista previamente**
Creacion por el cliente de redis:
```
MULTI
exists cliente:106
exists sucursal:1
SISMEMBER sucursal:111:clientes "cliente:RFC23456:nombre:'Jose Angel'
SADD sucursal:111:clientes "cliente:RFC23458:nombre:'Jose Angel'
EXEC
```
Creacion por medio de la api con el metodo POST:
```
/post localhost:3000/clients/add
```
**Método HTTP: POST** Indica que se está realizando una solicitud para enviar datos al servidor.

**/clients** Indica que el recurso al que se está accediendo o afectando es clientes. Este segmento identifica la colección de clientes dentro de la API.

**/add** La acción add especifica que se está solicitando la operación de agregar un nuevo cliente. 

Para poder agregar datos en este caso se nesesita el recurso de de body en formato JSON con los siguiente atributos:

```
{
    "nombre":"Alejandro Perez",
    "rfc":"RFC14789",
    "sucursal": "111"
}
```


**Q3.  Registrar una nueva venta para un cliente en específico.**

Por redis cliente:
```
MULTI
exists Sucursal:1
exists Cliente:106
exists Producto:204
LPUSH ventas:ST106:1 producto:204
EXEC
```

Por metodo POST de la API:
```
/POST  localhost:3000/ventas/2024/sucursal/111
```

Cuerpo de los datos a mandar:
```
{
    "ventaId":"2001",
    "productoId":"1003",
    "cantidad":"2",
    "costo_unitario":"60",
    "rfc":"RFC12345",
    "fecha":"20240922",
    "hora":"123456"
}
```
**Q4. Buscar sucursales cercanas a una ubicación geográfica específica usando consultas geoespaciales.**

Por medio de cliente de redis:
```
GEORADIUS sucursal 21.477817, -104.866843 100 km WITHDIST
```

por medio de consulta por la API
```
 /get localhost:3000/search/sucursales_geopos/-104.8946/21.5107/10/km
```

**Q5. Obtener el conjunto de clientes que han comprado en una sucursal específica.**

Por medio del cliente de redis
```
SMEMBERS sucursal:1:clientes
```
Por consulta en la API:
```
/GET localhost:3000/sucursal/111/clientes
```


**Q6. Registro histórico de los clientes que han hecho compras en cada sucursal**
Por medio del cliente de redis
```
SMEMBERS sucursal:1:clientes
```
Por consulta en la API:
```
/GET localhost:3000/sucursal/111/clientes
```
