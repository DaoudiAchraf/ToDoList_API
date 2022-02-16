
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema(
    {
        title : {type: String },
        date: {type: Date,default: Date.now }

    },
)

module.exports = mongoose.model('task', Task)