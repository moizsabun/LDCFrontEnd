import { makeStyles, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import React from 'react'

const useStyles = makeStyles(theme => (
  {
    root: {
      top: theme.spacing(9)
    }
  }))

export default function Notifications(props) {
  const classes = useStyles();
  const { notify, setNotify } = props
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setNotify({
      ...notify,
      isOpen: false
    });
  };

  return (
    <Snackbar open={notify.isOpen} 
    autoHideDuration={2500} 
    onClose={handleClose} 
    className={classes.root}
    anchorOrigin = { {vertical : 'top' , horizontal : 'right'}}>
      <Alert severity={notify.type} onClose={handleClose}>
        {
          notify.message
        }</Alert>
    </Snackbar>

  )
}
