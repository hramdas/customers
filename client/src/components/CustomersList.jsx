import React from 'react'
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Pagination from './Pagination';

const tableHeadCells = ["ID", "Name", "Email", "Contact", "Status", "Date added", "", ""]

export default function CustomersList({listLoader, customers, customersCount, limit, page, handlePage, handleConfirmDeleteModal, handleEditCustomerModal}) {
  return (
    <TableContainer component={Paper}>
        {listLoader ? (
          <div className="loader">
          Loading .......
          </div>
        ) : (
          <>
            <Table aria-label="simple table">
              <TableHead sx={{ background: '#dddddd' }}>
                <TableRow>
                  {tableHeadCells.map((columnName, index) => (
                    <TableCell key={index} sx={{ fontWeight: 700 }}>
                      {columnName}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {customers?.length ? (
                    customers.map((customer) => {
                      const {_id, customerId, name, email, contact, status, created_at } = customer
                      const deleteButton = <IconButton onClick={()=>handleConfirmDeleteModal(_id)}><i className="fa fa-trash"></i></IconButton>
                      const editButton = <IconButton onClick={()=>handleEditCustomerModal(customer)}><i className="fa fa-edit"></i></IconButton>

                      return(
                      <TableRow key={_id}>
                        {[ customerId, name, email, contact, status, created_at, editButton, deleteButton ].map((item, index) => (
                          <TableCell key={index}>{item}</TableCell>
                        ))}
                      </TableRow>)
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={6}>No records found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            
            <Pagination
              listCount={customersCount}
              limit={limit}
              page={page}
              handlePage={handlePage}
            />
          </>
        )}
      </TableContainer>
  )
}
