const Usuario = require('../model/usuario')
const passport = require("passport");
var LocalStrategy = require("passport-local");

passport.use(
  new LocalStrategy(async function (username, password, cb) {
    const email = username.toLowerCase()
    
    var user = await Usuario.findOne({
      email: email
    })
    
    if (!user) {
      return cb(null, false,{'msg':"Usuario não existe!"});
    } else {
      if (password != user.senha) {
        return cb(null, false, {'msg':"Senha inválida!"});
      } else {
        return cb(null, user);
      }
    }
  })
);

passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    cb(null, {
      id: user._id,
      email: user.email,
      nome: user.nome,
      sobrenome: user.sobrenome,
      telefone: user.telefone
    });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = passport;