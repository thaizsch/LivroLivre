const express = require('express')
const app = express()
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var path = require('path')
var session = require('express-session')
const passport = require("passport");
const passport1 = require("./config/passport");
var Usuario = require('./model/usuario')
var Postagem = require('./model/postagem')
app.use(cookieParser())

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
    })
);
app.use(passport.authenticate('session'));

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
    extended: false
}))

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))

///////////////////////////////////////////////ROTAS//////////////////////////////////////////////////

//login - abre tela//
app.get('/', function (req, res) {
    res.render('login.ejs', {})
})
//login - loga
app.post('/', passport1.authenticate('local', {
    successRedirect: '/principal',
    failureRedirect: '/',
}))
//cadastrar//
app.get('/cadastro', function (req, res) {
    res.render('registro.ejs')
})
app.post('/cadastro', function (req, res) {
    var usuario = new Usuario({
        nome: req.body.txtNome,
        sobrenome: req.body.txtSobrenome,
        email: req.body.txtEmail,
        senha: req.body.txtSenha
    })
    usuario.save(function (err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/');
        }
    })
})
//public//
app.get('/principal', async function (req, res) {
    const usuario = await Usuario.findById(req.user.id)
    const postagens = await Postagem.find({}).populate('usuario')
    res.render('index.ejs', {Usuario:usuario, Postagens: postagens})
})
//perfil do usuario//
app.get('/perfil', function (req, res) {
    res.render('perfil.ejs', {})
})
//rota para abrir formulário de postagem
app.post('/postagem', (req, res) => {
    res.render('postagem.ejs', {})
})
//realizar postagem
app.post('/postagem', (req, res) => {
    var postagem = new Postagem({
        texto: req.body.txtTexto,
        imglivro: req.body.imglivro
    })
})

app.listen(3000, function () {
    console.log("conexão inicializada na porta 3000")
})