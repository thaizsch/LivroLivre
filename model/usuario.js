var conexao = require('../config/conexao')

var UsuarioSchema = conexao.Schema({
    nome:{type:"string"},
    email:{type:"string"},
    senha:{type:"string"},
    foto:{type:"string"}

})

module.exports = conexao.model("Usuario", UsuarioSchema)