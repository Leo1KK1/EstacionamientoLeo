import path from "path";
import { Sequelize } from "sequelize-typescript";

// Configuración optimizada para Render PostgreSQL
const db = new Sequelize({
  database: "rest_api_node_40px",
  username: "rest_api_node_40px_user",
  password: "MCJzKiu4kjdRp7FY5AbPGESFydRj4zBG",
  host: "dpg-d0v4qdffte5s73992udg-a.oregon-postgres.render.com",
  port: 5432,
  dialect: "postgres",
  models: [path.join(__dirname, "../models/**/*.model.ts")],
  logging: console.log, // Solo para desarrollo
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

// Función de conexión mejorada
async function initializeDatabase() {
  try {
    await db.authenticate();
    console.log("✅ Conexión establecida con Render PostgreSQL");

    // Opciones de sincronización seguras
    await db.sync({ 
      force: false,    // NO forzar recreación de tablas
      alter: false     // NO alterar tablas existentes
    });
    
    console.log("Base de datos conectada");
  } catch (error) {
    console.error("❌ Error crítico de base de datos:", error);
    process.exit(1); // Salir si hay errores críticos
  }
}

initializeDatabase();

export default db;