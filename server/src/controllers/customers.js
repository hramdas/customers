const { createCustomer, getLastCustomerID, updateCustomer: updateCustomerService, findCostomer, findDuplicateCostomerForUpdate, findOneCostomer, getCustomers: getCustomersService, getCustomersCount, deleteCustomer: deleteCustomerService } = require('../services/customers')

const addCustomer = async (req, res) => {
  try {
    const { name, email, contact, status } = req.body

    const duplicateCustomer = await findCostomer(email, contact)
    if (duplicateCustomer) {
      return res.status(400).send({ message: 'Duplicate email or contact number.' })
    }

    const lastCustomer = await getLastCustomerID()
    const customerId = lastCustomer ? lastCustomer.customerId + 1 : 1

    const { _id } = await createCustomer(customerId, name, email, contact, status)

    return res.status(200).send({ message: 'Successfully created customer.', id: _id })

  } catch (error) {
    console.log("ERROR", error)
    return res.status(500).send({ message: 'Error while add customer' })
  }
}

const updateCustomer = async (req, res) => {
  try {
    const { name, email, contact, status } = req.body
    const { id } = req.params

    const customer = await findOneCostomer(id)
    if (!customer) {
      return res.status(400).send({ message: 'Invalid customer.' })
    }

    const duplicateCustomer = await findDuplicateCostomerForUpdate(email, contact, id)
    if (duplicateCustomer) {
      return res.status(400).send({ message: 'Duplicate email or contact number.' })
    }

    let { _id } = await updateCustomerService(id, { name, email, contact, status })
    return res.status(200).send({ message: 'Successfully updated customer.', id: _id })

  } catch (error) {
    console.log("ERROR", error)
    return res.status(500).send({ message: 'Error while updating customer' })
  }
}

const getCustomers = async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 1
    const offset = limit * (page - 1)

    const customers = await getCustomersService(limit, offset)
    const count = await getCustomersCount()
    return res.status(200).send({ customers, count })

  } catch (error) {
    console.log("ERROR", error)
    return res.status(500).send({ message: 'Error while getting customers.' })
  }
}

const deleteCustomer = async (req, res) => {
  try {
    let { id } = req.params
    const count = await deleteCustomerService(id)
    return res.status(200).send({ message: 'Successfully deleted customer.' })

  } catch (error) {
    console.log("ERROR", error)
    return res.status(500).send({ message: 'Error while deleting customer.' })
  }
}



module.exports = {
  addCustomer,
  updateCustomer,
  getCustomers,
  deleteCustomer
}