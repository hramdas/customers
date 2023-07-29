const mongoose = require('mongoose')

const customersSchema = new mongoose.Schema({
  customerId: { type: Number, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true, unique: true, maxlength: 10, minlength: 10 },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active', required: true }
},
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  })

module.exports = mongoose.model('customers', customersSchema)