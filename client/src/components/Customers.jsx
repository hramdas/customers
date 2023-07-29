import React, { useEffect, useState } from 'react'
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { deleteCustomerAPI, getCustomersAPI, } from '../api/customers';
import './customers-list.css'
import AddCustomer from './AddCustomer';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import Pagination from './Pagination';
import EditCustomer from './EditCustomer';
import CustomersList from './CustomersList';

const tableHeadCells = ["ID", "Name", "Email", "Contact", "Status", "Date added", "", ""]

export default function Customers() {
  const [listLoader, setListLoader] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(5)
  const [customers, setCustomers] = useState([])
  const [customersCount, setCustomersCount] = useState(0)
  const [addCustomerModal, setAddCustomerModal] = useState(false)
  const [editCustomerModal, setEditCustomerModal] = useState(false)
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false)
  const [deleteCustomerId, setDeleteCustomerId] = useState()
  const [customerToEdit, setCustomerToEdit] = useState()

  const handleAddCustomerModal = () => {
    setAddCustomerModal(!addCustomerModal)
    
  }
  const handleEditCustomerModal = (customer) => {
    setCustomerToEdit(customer)
    setEditCustomerModal(!editCustomerModal)
  }
  const handleEditModal = ()=>   setEditCustomerModal(!editCustomerModal)
  const handleConfirmDeleteModal = (id) => {
    setDeleteCustomerId(id)
    setConfirmDeleteModal(!confirmDeleteModal)
  }


  const handlePage = (event, newPage) => setPage(newPage);
  
  const fetchCustomers = async () => {
    setListLoader(true)

    const {customers, count} = await getCustomersAPI(page, limit)
    setCustomers(customers)
    setCustomersCount(count)

    setListLoader(false)
  }

  const handleDeleteCustomer = async (id) => {
    const data = await deleteCustomerAPI(deleteCustomerId)
    fetchCustomers()
    setConfirmDeleteModal(!confirmDeleteModal)
  }
 
  useEffect(() => {
    fetchCustomers()
  }, [page])
  
  return (
    <div className="customers">
      <div style={{display: 'flex', justifyContent: 'space-between', margin: '5px 2%'}}> 
        <Button variant="contained" size="small" onClick={handleAddCustomerModal}>Add Customer</Button>
      <div className="customers-count">Customers count - {customersCount}</div></div>
    
      <CustomersList listLoader={listLoader} customers={customers} customersCount={customersCount} limit={limit} page={page} handlePage={handlePage} handleConfirmDeleteModal={handleConfirmDeleteModal} handleEditCustomerModal={handleEditCustomerModal} /> 

      {/* /Create customer */}
      <AddCustomer open={addCustomerModal} handleClose={handleAddCustomerModal}  fetchCustomers={fetchCustomers} />
      
      {/* Edit customer */}
      <EditCustomer open={editCustomerModal} handleClose={handleEditModal} customer={customerToEdit} fetchCustomers={fetchCustomers}/>

      <ConfirmDeleteModal open={confirmDeleteModal} handleClose={handleConfirmDeleteModal} handleDeleteCustomer={handleDeleteCustomer} />
    </div>
  )
}
