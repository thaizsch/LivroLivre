var conexao = require('../config/conexao')

var PostagemSchema = conexao.Schema({
    texto: {
        type: "string"
    },
    imglivro: {
        type: "string"
    },
    usuario: {
        type: conexao.Schema.Types.ObjectId,
        ref: 'Usuario'
    }
})

module.exports = conexao.model("Postagem", PostagemSchema)