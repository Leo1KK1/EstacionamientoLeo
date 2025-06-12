import express from 'express';
import db from './config/db';
import router from './router';

async function connectDB() {
    try {
        await db.authenticate();
        db.sync()
        console.log('Conexión exitosa a la base de datos');
    } catch (error) {
        console.log('Error al conectarse con la BS:');
        console.log(error);
    }
}
connectDB()

const server = express();

server.use(express.json()) 

server.use('/api/products', router)

// Ruta principal
server.get("/", (req, res) => {
  res.send("API Estacionamiento funcionando");
});

export default server;

