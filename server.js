import dotenv from 'dotenv';
   import https from 'https';
   import fs from 'fs';
   import app from './src/app.js';
   import { connectDB } from './src/config/database.js';

   dotenv.config();
   const PORT = process.env.PORT || 3000;

   connectDB();

   const httpsOptions = {
     key: fs.readFileSync('/etc/ssl/inmomarket/privkey.pem'),
     cert: fs.readFileSync('/etc/ssl/inmomarket/fullchain.pem')
   };

   https.createServer(httpsOptions, app).listen(PORT, () => {
     console.log(`HTTPS Server running on port ${PORT}`);
   });
