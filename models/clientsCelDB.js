const { Timestamp } = require('mongodb')
const {Schema, model}=require('mongoose')
const ClientCelSchema=new Schema(
{              number: {type: String, required: true},
               FirstMsjSending: { type: Date, default: Date.now },
               LastMsjSending: { type: Date, default: Date.now }
},{ collection: 'clientCel' })
module.exports=model('clientCel',ClientCelSchema)