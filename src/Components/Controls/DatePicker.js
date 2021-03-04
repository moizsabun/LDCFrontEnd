import React from 'react'

import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker,MuiPickersUtilsProvider } from '@material-ui/pickers'

export default function DatePicker(props) {
    const {name,label,value,onChange} = props

    const convertToEvent =(name,value) => ({
        target:{
            name,value
        }
    })
   
    return (
   
   
        <MuiPickersUtilsProvider utils = {DateFnsUtils}>
        <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined" 
        label={label}
        name={name}
        value= {value}
        format="dd/MM/yyyy"
        onChange = { date => onChange(convertToEvent(name, date))}
        />
       
        </MuiPickersUtilsProvider>
    )
}
