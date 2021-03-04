import { TextField as MuiTextField } from '@material-ui/core'
import React from 'react'

export default function Input(props) {
    const {value, label,name,placeHolder, size, variant, type, onChange, ...Other} = props
    return (
       <MuiTextField
       type = {type}
       size = {size}
       placeholder = {placeHolder}
       variant = {variant}
       onChange = {onChange}
       autoComplete = "off"
        label={label}
        value = {value}
        name={name}
       {...Other}
       >
       
       </MuiTextField>
    )
}
