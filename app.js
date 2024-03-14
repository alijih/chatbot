const express = require('express')
const router = express.Router()
const cors= require('cors');
const app = express()
const config = require('./config.js');

app.get('/', (req, res) => {
  res.send('Hello TuSuerte!')
})
app.use(express.json());
app.use('/api',require('./routes/whatsapp.js'))

app.use(cors());
  const mongoose = require('mongoose');
  mongoose.connect(`mongodb+srv://${config.UserDB}:${config.PassDB}@cluster0.zmlxgqg.mongodb.net/`, {useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'Error de conexión:'));
  db.once('open', () => {
      console.log('Conexión exitosa a la base de datos.');
  });





  app.listen(process.env.port || 7786, () => {
    console.log(`Example app listening on port ${process.env.port|| 7786}`)
  })