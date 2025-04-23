import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

//Asignar variables de entorno a variables
const MONGO_URL = process.env.MONGO_URL;

// Si no lo encuentra por lo que sea, se lanza un error
if (!MONGO_URL) {
  console.error("Error: La variable de entorno MONGO_URL no está definida :(");
  process.exit(1);
}




// Conectar a la base de datos
mongoose.connect(MONGO_URL);




// Escuchar cambios en la base de datos
//Cuando se conecta lo dice por consola
mongoose.connection.on("connected", function () {
  console.log("Conectado a la base de datos" + MONGO_URL);
});




//Indica por consola el error en caso de que no se conecte
mongoose.connection.on("error", function (err) {
  console.error("Error al conectar a la base de datos:", err);
});




mongoose.connection.on("disconnected", function () {
  console.log("Desconectado de la base de datos");
});


//Indica que se ha desconectado de la base al finalizar la ejecución de la aplicación
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Desconectado de la base de datos al terminar la app");
    process.exit(0);
  });
});