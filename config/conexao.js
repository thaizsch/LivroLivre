const mongoose = require('mongoose')
const uri = "mongodb://localhost:27017/livrolivre"

mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.set('strictQuery', false);

module.exports = mongoose