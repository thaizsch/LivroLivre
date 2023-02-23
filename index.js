const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
var Usuario = require('./model/usuario')

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
                                              //login//
app.get('/', function(req, res){
    res.render('login.ejs', {})
})
                                            //registro//
app.get('/add', function(req, res){
    res.render('registro.ejs')
})

app.post('/add', function(req, res){
    var usuario = new Usuario({
        nome: req.body.txtNome,
        email: req.body.txtEmail,
        senha: req.body.txtSenha
    })
    usuario.save(function(err){
        if(err){
            console.log(err)
        }
        else{
            res.redirect('/');
        }
    })
})
                                        
                                        //pagina inicial//
app.get('/paginainicial', function(req, res){
    res.render('index.ejs', {})

})
                                        //perfil do usuario//
app.get('/usuarios', function(req, res){
    res.render('usuarios.ejs', {})

})


        app.listen(3000, function () {
            console.log("conexão inicializada na porta 3000")
        })


