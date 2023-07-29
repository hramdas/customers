const CustomersSchema = require('../models/customers')

const createCustomer = async (customerId, name, email, contact, status) => {
  return CustomersSchema.create({
    customerId, name, email, contact, status
  })
}

const getLastCustomerID = () => {
  return CustomersSchema.findOne().select({ customerId: 1, _id: 0 }).sort({ _id: -1 })
}

const findCostomer = (email, contact) => {
  return CustomersSchema.findOne({ $or: [{ email }, { contact }] }).select({ customerId: 1, _id: 1 })
}
const findOneCostomer = (id) => {
  return CustomersSchema.findOne({ _id: id })
}

const findDuplicateCostomerForUpdate = (email, contact, id) => {
  return CustomersSchema.findOne({ $or: [{ email }, { contact }], _id: { $ne: id } }).select({ customerId: 1, _id: 1 })
}

const updateCustomer = (id, updatedData) => {
  return CustomersSchema.updateOne({ _id: id }, updatedData)
}

const getCustomers = (limit, offset) => {
  return CustomersSchema.find().sort({ updated_at: 'desc' }).skip(offset).limit(limit)
}
const getCustomersCount = () => {
  return CustomersSchema.count()
}
const deleteCustomer = (customerId) => {
  return CustomersSchema.deleteOne({ _id: customerId })
}

module.exports = {
  createCustomer,
  getLastCustomerID,
  updateCustomer,
  findCostomer,
  findDuplicateCostomerForUpdate,
  findOneCostomer,
  getCustomers,
  getCustomersCount,
  deleteCustomer
}