const mongoose = require('mongoose');

mongoose
    .connect('mongodb+srv://achraf:23950@cluster0.aulvj.mongodb.net/tasks?retryWrites=true&w=majority',
     { useNewUrlParser: true })
     .then(()=>console.log('connected DB'))
    .catch(e => {
        console.error('Connection error', e.message)
    });

const db = mongoose.connection;

module.exports = db