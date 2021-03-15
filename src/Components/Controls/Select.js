import { FormControl, InputLabel, MenuItem, Select as MuiSelect } from '@material-ui/core'
import React, { useEffect, useState } from 'react'

export default function Select(props) {
    const {name,label,value,onChange, options} = props
    const [data , setData] = useState();
    console.log(options)
    useEffect( ()=> {
        if(options !== undefined || options !== null || options !== "")
        {
            setData(options)
        }
    },[options])

 
    if(data === undefined || data === null || data === "") {
        
        return (
        <FormControl variant="outlined">
        <InputLabel>{label}</InputLabel> 
        <MuiSelect
        label= {label}
        name={name}
        value={value}
        onChange={onChange}
        >
            <MenuItem value ="">None</MenuItem>
            
        </MuiSelect>
    </FormControl>
        )
    }
    else{
        console.log(data);
        return (
  
            <FormControl variant="outlined">
                <InputLabel>{label}</InputLabel> 
                <MuiSelect
                label= {label}
                name={name}
                value={value}
                onChange={onChange}
                >
                    <MenuItem value ="">None</MenuItem>
                  
                 {
                    data.map(
        
                            (option) => (
                                <MenuItem key={option.data} value ={option.data}>{option.data}</MenuItem>
                            )
                        )
                    }
                    
                </MuiSelect>
            </FormControl>
        
            )
    }
   
}
