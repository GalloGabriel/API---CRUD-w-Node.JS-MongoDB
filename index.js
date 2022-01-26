//config inicial
require('dotenv').config()
const express = require('express'); //importando pasta express
const mongoose = require('mongoose');
const app = express(); //Inicializando express


//configurando forma de ler JSON
app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(
  express.json()
)

//Rotas da API
const personRoutes = require('./routes/personRoutes');

app.use('/person', personRoutes)


//criando rota inicial / endpoint
app.get('/', (req, res) => {

  // mostrar req

  res.json({
    message: 'Oi Express!'
  })

})


const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;


//entregar uma porta
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.i2o3i.mongodb.net/bancodaapi?retryWrites=true&w=majority`)
.then(()=>{
  console.log("Conectamos ao MongoDB!")
  app.listen(3000)


})
.catch((err) => console.log(err))

