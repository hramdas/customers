const { addCustomer, updateCustomer, getCustomers, deleteCustomer } = require("../controllers/customers")
const { validateCreateCustomer } = require("../middlewares/customers")


module.exports = (app) => {
  app.post('/customer', validateCreateCustomer, addCustomer),
    app.patch('/customer/:id', updateCustomer)
  app.get('/customers', getCustomers)
  app.delete('/customer/:id', deleteCustomer)
}