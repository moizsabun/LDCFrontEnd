import React,{useEffect, useState} from 'react'
import history  from "../history";

export default function Logout() {

    const {logout , setLogout} = useState();

    useEffect =() => {
        const logout =() => {
            setLogout(true);
        }
    }
   

    if(logout)
    {
        localStorage.removeItem("Token");
        history.push("/");
    }
    else
    {
    return (
        
        <div>
            <h3>You are successfully Logout</h3>
        </div>
    )
}
}
