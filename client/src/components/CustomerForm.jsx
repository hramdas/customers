import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

export default function CustomerForm({handleClose, handleSubmit, customer, handleChange, error, clearState}) {
  return (
    <form onSubmit={handleSubmit}>
          <div style={{display:'grid', gap:'20px'}}>
            <TextField
              required
              label="Name"
              name="name"
              defaultValue={customer.name}
              inputProps={{minLength: 2}}
              onChange={handleChange}
              />
            <TextField
              required
              label="Email"
              name="email"
              type='email'
              defaultValue={customer.email}
              onChange={handleChange}
              />
            <TextField
              required
              label="Contact"
              name="contact"
              inputProps={{ maxLength: 10, minLength: 10}}
              defaultValue={customer.contact}
              onChange={handleChange}
            />
            <FormControl required fullWidth>
              <InputLabel id="status">Status</InputLabel>
              <Select
                value={customer.status}
                label="Status"
                name="status"
                onChange={handleChange}
              >
                <MenuItem name='Active' value='Active'>Active</MenuItem>
                <MenuItem name='Inactive' value='Inactive'>Inactive</MenuItem>
              </Select>
              
            </FormControl>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div style={{display: 'flex', gap:'10px', marginTop:'40px'}}>
              <Button type="submit" variant="contained">Save</Button>
          <Button onClick={() => {
            handleClose()
            clearState()
          }} color="secondary" variant="contained">Cancel</Button>
            </div>
          </div>
        </form>
  )
}
