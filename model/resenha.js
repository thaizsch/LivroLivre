var conexao = require('../config/conexao')

var ResenhaSchema = conexao.Schema({
    textoResenha: {
        type: "string"
    },
    usuario: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = conexao.model("Resenha", ResenhaSchema)