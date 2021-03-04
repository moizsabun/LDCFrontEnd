import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

export default function Notifications(props) {
    const {notify,setNotify} = props
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setNotify ({
            ...notify,
            isOpen:false});
      };
    
    return (
     <Snackbar open={notify.isOpen} autoHideDuration= {2500} onClose={handleClose}>
       <Alert severity={notify.type}>
       {
           notify.message
       }</Alert>
     </Snackbar>

    )
}
