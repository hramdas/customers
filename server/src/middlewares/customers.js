const validateCreateCustomer = (req, res, next) => {
  let { name, email, contact, status } = req.body
  contact = parseInt(contact)
  if (!name || !email || !contact || (contact.toString().length !== 10) || !status || !['Active', 'Inactive'].includes(status)) {
    return res.status(400).send({ message: 'Invalid customer details.' })
  }
  next()
}

module.exports = { validateCreateCustomer }