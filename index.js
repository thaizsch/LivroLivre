require ('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')

app.use(cookieParser())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

///////////////////////////////////////////////ROTAS//////////////////////////////////////////////////

                                              //get//
                                            //public//
app.get('/', (req, res) =>{
    res.render('inicio.ejs', {})

})
                                        //pagina inicial//
app.get('/paginainicial', function(req, res){
    res.render('index.ejs', {})

})
                                        //perfil do usuario//
app.get('/usuarios', function(req, res){
    res.render('usuarios.ejs', {})

})
                                        //teste do post /add//
//add
app.get('/add', function(req, res){
    res.render('adiciona.')
})
//post
app.post('/add',function(req, res){
    console.log("chegou aqui")
})

//banco de dados
//const dbUser = process.env.DB_USER 
//const dbPassword = process.env.DB_PASS

//mongoose
//    .connect()
//   .then(() => {

        app.listen(3000, function () {
            console.log("conexão inicializada na porta 3000")
        })
//    })
//    .catch((err) => console.log(err))

