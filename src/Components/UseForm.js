import React, {useState} from 'react'
import { makeStyles } from '@material-ui/core'


const useStyles =  makeStyles( theme => ({
    root : {
        
        '& .MuiFormControl-root' : {
            margin: theme.spacing(1),
            width : '100%', 
        }
    }
    

}))

export default function UseForm(initialState) 
{
    const [values, setValues] = useState(initialState);
    
    const  handleChange =e => {
        const {name,value} = e.target;
        setValues({
            ...values,
            [name] : value
        })
    }
    return {
        values,
        setValues,
        handleChange
    }
}

export function Form(props) {
    const classes = useStyles();
    const { children, ...other } = props;
    return (
      <form className={classes.root} autoComplete="off" {...other}>
      {props.children}
      </form>
    )
}