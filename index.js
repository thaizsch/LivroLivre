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
var Resenha = require('./model/resenha')
var upload = require('./config/upload')
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
//login - loga//
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
        telefone: req.body.txtTelefone,
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
//perfil do usuario//
app.get('/perfil', async function (req, res) {
    const postagens = await Postagem.find({usuario:req.user.id})
    const resenhas = await Resenha.find({usuario:req.user.id})
    res.render('perfil.ejs', {Usuario:req.user, Postagens:postagens, Resenhas:resenhas})
})
//Editar perfil//
app.get('/editar', async function (req, res) {
    Usuario.findById(req.user.id, function (err,docs){
        if(err){
            console.log(err)
        }else{
        res.render('editarperfil.ejs', {Usuario: docs})
        }
    })

})
//public//
app.get('/principal', async function (req, res) {
    const usuario = await Usuario.findById(req.user.id)
    const postagens = await Postagem.find({}).populate('usuario')    
    res.render('index.ejs', {Usuario:usuario, Postagens: postagens})
})

//rota para abrir formulário de postagem

//realizar postagem
app.post('/principal', upload.single('imglivro'), (req, res) => {
    console.log(req.file)
    var postagem = new Postagem({
        texto: req.body.texto,
        imglivro: req.file.filename,
        usuario: req.user.id
    })
    postagem.save(function(err, result) {
        if (err){
            return console.error(err)
        }else{
            res.redirect('/principal')
        }
    })
})
//Resenha//
app.get('/resenha', async function (req, res) {
    const usuario = await Usuario.findById(req.user.id)
    const resenhas = await Resenha.find({}).populate('usuario')    
    res.render('resenha.ejs', {Usuario:usuario, Resenhas: resenhas})
})
//Realizar postagem da resenha//
app.post('/resenha', (req, res) => {
    console.log(req.file)
    var resenha = new Resenha({
        textoresenha: req.body.textoResenha,
        usuario: req.user.id
    })
    resenha.save(function(err, result) {
        if (err){
            return console.error(err)
        }else{
            res.redirect('/resenha')
        }
    })
})

//Excluir Publicações//
app.get('/excluirpublicacao', async function (req, res) {
    const usuario = await Usuario.findById(req.user.id) 
    const postagens = await Postagem.find({usuario:req.user.id})
    res.render('publicacaousuario.ejs', {Usuario:usuario, Postagens: postagens})
})

//Excluir Resenhas//
app.get('/excluirresenha', async function (req, res) {
    const usuario = await Usuario.findById(req.user.id)
    const resenhas = await Resenha.find({usuario:req.user.id})
    res.render('resenhausuario.ejs', {Usuario:usuario, Resenhas: resenhas})
})



app.listen(3000, function () {
    console.log("conexão inicializada na porta 3000")
})