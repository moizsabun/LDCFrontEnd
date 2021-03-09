import React, {useState} from 'react'
import {CircularProgress, makeStyles , Backdrop } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));
export default function LoadingControl({open}) {
    const classes = useStyles();

    return (
        <div>
            <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
        </div>
    )
}
