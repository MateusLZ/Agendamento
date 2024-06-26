const express = require('express');
const { createServer: createViteServer } = require('vite');
const cors = require('cors');

async function createServer() {
  const app = express();

  // Configurações de CORS
  const corsOptions = {
    origin: 'https://cabeloeart.vercel.app', // substitua pelo seu domínio
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Disposition'],
    credentials: true,
    optionsSuccessStatus: 204
  };

  app.use(cors(corsOptions));

  // Crie o servidor Vite
  const vite = await createViteServer({
    server: { middlewareMode: 'html' }
  });

  // Use o middleware do Vite
  app.use(vite.middlewares);

  app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
  });
}

createServer();
