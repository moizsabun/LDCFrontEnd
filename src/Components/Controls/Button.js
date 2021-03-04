
import { Button  as MuiButton, makeStyles } from '@material-ui/core';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    root : {
        margin : theme.spacing(0.5)
    },
    label : {
        textTransform : 'none'
    }

}))

export default function Button(props) {
    const {color, variant, type,disabled, ...Other } = props
    const classes = useStyles();
    return (
        <MuiButton
             
                type={type}
                
                variant={variant}            
                 color={color}                
                 classes = {{root:classes.root ,  label : classes.label}}
                disabled = {disabled}
                {...Other}
          
              >
             
             
              </MuiButton>
    )
}
