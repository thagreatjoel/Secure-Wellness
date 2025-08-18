import dotenv from 'dotenv';
import { createServer } from 'http';
import app from './src/app.js';
import './src/db.js';
dotenv.config();

const PORT = process.env.PORT || 8080;
const server = createServer(app);
server.listen(PORT, () => {
  console.log(`Hosting at port:${PORT}`);
});
