import Authheader from "../../services/auth-header";


const url = "http://localhost:52293/api";

export const VerfiyLogin = async (getusername, getpassword) => {

    console.log("function called");
    console.log(`user name ${getusername}`);
    console.log(`password ${getpassword}`);

    let getToken = await fetch(`${url}/Login/authenticate`, {
        method: "POST",
        body: JSON.stringify({
            username: getusername,
            password: getpassword,
        }),
        headers: {
            
            'Accept': 'application/json',
            'Content-Type': 'application/json',
           
        },
        mode: 'cors',
    });
    console.log(getToken);

    if (getToken.status === 200) {

        let { token, expiryDate } = await getToken.json();
        localStorage.setItem("Token", token);
        console.log(token);
        console.log(expiryDate);
        return true;
    }
    else
    {
        return false;
    }

}

export const AddMasterData =async(masterdata) => {
    console.log("Getting Token")
    console.log(Authheader().token);
    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    console.log(masterdata);
   const data = [ {"userid" : 1} , {"masterdata" : masterdata}];
  console.log(
    JSON.stringify(data));

    let addMData = await fetch(`${url}/MasterData/AddMasterData`, {
        method: "POST",
        body:JSON.stringify(data),
        
        
        headers: {
             'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await addMData.json();
    console.log(getData);
  ;
}


export const InsertMasterData =async(masterdata) => {
    console.log("Getting Token")
    console.log(Authheader().token);
    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    console.log(masterdata);
   const data = { "userid" : 1 , "masterdata" : [masterdata]};
  console.log(
    JSON.stringify(data));

    let addMData = await fetch(`${url}/MasterData/InsertMasterData`, {
            method: "POST",
        body:JSON.stringify(data),
        
        
        headers: {
             //'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await addMData.json();
    console.log(getData);
  ;
}


export const updateMasterData =async(masterdata) => {
    console.log("Getting Token")
    console.log(Authheader().token);
    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    console.log(masterdata);
   const data = { "userid" : 1 ,"MasterDataSNO" : masterdata.MasterDataSNO ,"masterdata" : [masterdata]};
  console.log(
    JSON.stringify(data));

    let addMData = await fetch(`${url}/MasterData/updateMasterData`, {
        method: "POST",
        body:JSON.stringify(data),
        
        
        headers: {
             //'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await addMData.json();
    console.log(getData);
  ;
}

export const getAllMasterData =async() => {
    console.log("Getting Token")
    console.log(Authheader().token);
    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    
  


    let GetData = await fetch(`${url}/MasterData/getAllMasterData`, {
        method: "GET",
      
        
        
        headers: {
            // 'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await GetData.json();

    console.log(getData);
    return getData;
  ;
}
export const getAllMasterDataArchive =async() => {
    console.log("Getting Token")
    console.log(Authheader().token);
    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    
  


    let GetData = await fetch(`${url}/MasterData/getAllMasterDataArchive`, {
        method: "GET",
      
        
        
        headers: {
            // 'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await GetData.json();

    console.log(getData);
    return getData;
  ;
}

//LoadShedding Calls Below
export const getAllLSData =async() => {

    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    
  


    let GetData = await fetch(`${url}/LoadShediing/GetLoadSheddings`, {
        method: "GET",
      
        
        
        headers: {
            // 'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await GetData.json();

    console.log(getData);
    return getData;
  ;
}

export const getAllBlocks =async() => {

    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    
  


    let GetData = await fetch(`${url}/MasterData/getAllGridBlock`, {
        method: "GET",
      
        
        
        headers: {
            // 'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await GetData.json();

    console.log(getData);
    return getData;
  ;
}

export const getGroups =async(block) => {

    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    
  
console.log (`Block ${block}`)

    let GetData = await fetch(`${url}/MasterData/getGroup`, {
        method: "POST",
       
        body : JSON.stringify({
            "getGridBlock" : block
        }),
        
        
        headers: {
            // 'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await GetData.json();

    console.log(getData);
    return getData;
  ;
}



export const getCategory =async(block,getGroup) => {

    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    
  
console.log (`Block ${block} Group ${getGroup}`)

    let GetData = await fetch(`${url}/MasterData/getCategory`, {
        method: "POST",
       
        body : JSON.stringify({
            "getGridBlock" : block,
            "getGroup" : getGroup
        }),
        
        
        headers: {
            // 'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await GetData.json();

    console.log(getData);
    return getData;
  ;
}

export const InsertLSData =async(masterdata) => {
    console.log("Getting Token")
    console.log(Authheader().token);
    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    console.log(masterdata);
   const data = { "userid" : 1 , "ls" : masterdata};
  console.log(
    JSON.stringify(data));

    let addMData = await fetch(`${url}/LoadShediing/addLoadSheddding`, {
        method: "POST",
        body:JSON.stringify(data),
        
        
        headers: {
             //'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await addMData.json();
    console.log(getData);
  ;
}

export const updateLSData =async(lsdata) => {
    console.log("Getting Token")
  
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    console.log(lsdata);
   const data = { "userid" : 1 , "ls" : lsdata};
  console.log(
    JSON.stringify(data));

    let addMData = await fetch(`${url}/LoadShediing/editLoadShedding`, {
        method: "POST",
        body:JSON.stringify(data),
        
        
        headers: {
             //'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await addMData.json();
    console.log(getData);
  ;
}

export const GetLoadSheddings =async() => {
    
  
    let token =localStorage.getItem("Token"); 
    
 

    let addMData = await fetch(`${url}/LoadShediing/GetLoadSheddings`, {
        method: "GET",
        
        
        
        headers: {
             //'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await addMData.json();
    console.log(getData);
    return getData;
  ;
}


export const setExpiry =async(expiry) => {
    
  
    let token =localStorage.getItem("Token"); 
    
    const data = { "userid" : 1 , "dateTime" : expiry};
console.log(JSON.stringify (data))
    let addMData = await fetch(`${url}/LoadShediing/editExpiry`, {
        method: "POST",
        body :JSON.stringify (data),
        
        
        headers: {
             //'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await addMData.json();
    console.log(getData);
    return getData;
  ;
}

export const getAllLSDataArchive =async() => {
    console.log("Getting Token")
    console.log(Authheader().token);
    console.log("Getting Token from Local Storage");
    console.log(localStorage.getItem("Token"));
    let token =localStorage.getItem("Token"); 
    
  


    let GetData = await fetch(`${url}/LoadShediing/GetLSDataArchieveforDisplay`, {
        method: "GET",
      
        
        
        headers: {
            // 'Authorization' :`Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        mode: 'cors',
    })
    let getData = await GetData.json();

    console.log(getData);
    return getData;
  ;
}
