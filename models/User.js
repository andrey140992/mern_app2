const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    ditales: [{ type: Types.ObjectId, ref: 'Ditales'}]
})

module.exports = model('User', schema)