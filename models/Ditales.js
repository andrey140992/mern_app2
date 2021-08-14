const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    surname: {type: String, required: true},
    midname: {type: String, required: true},
    city: {type: String, required: true},
    owner: { type: Types.ObjectId, ref: 'User'}
})

module.exports = model('Ditales', schema)