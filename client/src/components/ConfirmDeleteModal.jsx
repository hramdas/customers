import { Box, Button, Modal, Typography } from '@mui/material';
import React from 'react';

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

export default function ConfirmDeleteModal(props) {
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Do you want to delete customer?
        </Typography>
        <div style={{display: 'flex', gap:'10px', marginTop:'50px'}}>
        <Button onClick={props.handleDeleteCustomer} color="success" variant="contained">Confirm</Button>
          <Button onClick={props.handleClose} variant="contained">Cancel</Button>
          </div>
      </Box>
    </Modal>

  );
}
