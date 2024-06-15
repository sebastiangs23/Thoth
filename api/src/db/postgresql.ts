import { Sequelize } from "sequelize";

// const db = new Sequelize(
//   "mammoth",  //Db name
//   "postgres", //Db user
//   "123456",   //Db password
//   {
//     host: "192.168.1.10",
//     dialect: "postgres",
//     logging: false
//   },
// );

const db = new Sequelize(
  "mammoth_prod_db", // Nombre de la base de datos
  "mammoth_prod_db_user", // Usuario de la base de datos
  "utNdtGYDItXBZT7ouklZuAjeOLw0R7c4", // Contraseña de la base de datos
  {
    host: "dpg-cpmhvn5ds78s73ahqokg-a.oregon-postgres.render.com", // Host proporcionado por Render
    dialect: "postgres",
    port: 5432, // Puerto estándar de PostgreSQL
    logging: false, // Desactiva el logging para producción
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Necesario si Render no provee un certificado verificado
      },
    },
  }
);

// Manejador de errores de sequelize para ver si la conexión fue exitosa
db.authenticate()
  .then(() => console.log("Correct authentification!!"))
  .catch((error) => console.log("Error trying to connect to DB: ", error));

export default db;
