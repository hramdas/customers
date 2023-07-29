import { Box, Modal,Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { updateCustomerAPI } from '../api/customers';
import CustomerForm from './CustomerForm';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function EditCustomer({ open, handleClose, fetchCustomers, customer }) {
  const [name, setName] = useState('ddd')
  const [email, setEmail] = useState('')
  const [contact, setContact] = useState('')
  const [status, setStatus] = useState('')
  const [formError, setFormError] = useState(false)

  const handleChange = (e) => {
    const {name, value } = e.target
      switch (name) {
        case 'name':
          setName(value)
          break;
        case 'email':
          setEmail(value)
          break;
        case 'contact':
          setContact(value)
          break;
        case 'status':
          setStatus(value)
          break;
        default:
      }
      setFormError(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name && email && contact && status) {
      const response = await updateCustomerAPI(customer._id, name, email, contact, status)
      console.log(response)
      if (response.status === 200) {
        setFormError(false)
        fetchCustomers()
        handleClose()
      } else {
        setFormError(response?.message)
      }
    }
  }

  useEffect(() => {
    setName(customer?.name)
    setEmail(customer?.email)
    setContact(customer?.contact)
    setStatus(customer?.status)
  }, [customer])

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h5" component="h2" sx={{padding:'5px'}}> Edit customer </Typography>
       <CustomerForm handleClose={handleClose} handleSubmit={handleSubmit} customer={customer} handleChange={handleChange} error={formError} />
      </Box>
    </Modal>
  )
}
