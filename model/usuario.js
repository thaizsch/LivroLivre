var conexao = require('../config/conexao')

var UsuarioSchema = conexao.Schema({
    nome: {
        type: "string"
    },
    sobrenome: {
        type: "string"
    },
    email: {
        type: "string"
    },
    senha: {
        type: "string"
    }

})

module.exports = conexao.model("Usuario", UsuarioSchema)