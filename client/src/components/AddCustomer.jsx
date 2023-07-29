import { Box, Modal,Typography } from '@mui/material'
import React, { useState } from 'react'
import { createCustomerAPI } from '../api/customers';
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

export default function AddCustomer({ open, handleClose,fetchCustomers }) {
  const [name, setName] = useState('')
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

  const clearState = () => {
    setEmail('')
    setContact('')
    setStatus('')
    setName('')
    
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (name && email && contact && status) {
      const response = await createCustomerAPI({ name, email, contact, status })
      if (response.status === 200) {
        setFormError(false)
        handleClose()
        clearState()
        fetchCustomers()
      } else {
        setFormError(response?.message)
      }
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="transition-modal-title" variant="h5" component="h2" sx={{padding:'5px'}}> Add customer </Typography>
        <CustomerForm handleClose={handleClose} handleSubmit={handleSubmit} customer={{name, email, status}} handleChange={handleChange} error={formError} clearState={clearState} />
      </Box>
    </Modal>
  )
}
