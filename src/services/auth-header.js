import React from 'react'

export default function Authheader() {
    const user = localStorage.getItem("Token");
  
        if(user && user.accessToken != null)
        {
            return {Authorization : 'Bearer ' + user.accessToken};
        }
        else
        {
            return {};
        }
        
}
