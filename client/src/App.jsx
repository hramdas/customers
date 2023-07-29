import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Customers from './components/Customers'
import { Stack } from '@mui/material'

function App() {
  return (
    <>
      <Stack spacing={2}>
        <Header />
        <Customers />
       </Stack>
    </>
  )
}

export default App
