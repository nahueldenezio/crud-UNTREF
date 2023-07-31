import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

// Importa los módulos de Node.js primero
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Luego importa los módulos locales
import { connectDB } from './db.js';
import guitarRoutes from './routes/crudOfGuitars.js';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use("/api", guitarRoutes);
app.use("/temp", express.static(path.join(__dirname, "../temp")));

app.get("/", async (req, res) => {
  try {
    res.send("Bienvenido a la API de Guitarras");
  } catch (error) {
    res.status(500).send("Error de servidor");
  }
});

app.listen(port, () => console.log("Recibiendo en puerto:", port));
