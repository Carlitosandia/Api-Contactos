const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

let contactos = [];

// Middlewares
app.use(morgan('dev')); // Para registrar cada solicitud en la consola
app.use(cors()); // Permitir solicitudes CORS
app.use(express.json()); // Para manejar datos JSON en solicitudes

// Rutas

// GET - Obtener la lista de contactos
app.get('/api/contactos', (req, res) => {
  res.json(contactos);
});

// POST - Agregar un nuevo contacto
app.post('/api/contactos', (req, res) => {
  const { nombre, numero } = req.body;

  if (!nombre || !numero) {
    return res.status(400).json({ message: 'Nombre y número son requeridos' });
  }

  const nuevoContacto = {
    id: contactos.length + 1,
    nombre,
    numero,
  };

  contactos.push(nuevoContacto);
  console.log(contactos)
  res.status(201).json(nuevoContacto);
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
