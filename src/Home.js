import React, { useContext } from 'react'
import NavBar from "./Components/NavBar/Navbar";
import {BrowserRouter as Router,Switch,Route  } from "react-router-dom";

import Masterdata from "./Components/Pages/Masterdata";
import history from "./history";
import Login from './Components/login';
import Logout from './Components/Logout';
import isAuthContext from "./Components/AppContext"
import Loadshedding from './Components/Pages/Loadshedding';
import MasterDataArchive  from "./Components/Pages/MasterDataArchive";
import LoadSheddingArchive from './Components/Pages/LoadSheddingArchive';
import TrafoShutdown from './Components/Pages/TrafoShutdown';
import Header from './Components/NavBar/Header';


export default function Home(   ) {
   
    const isAppAuth = useContext(isAuthContext)
    console.log(isAppAuth);
    
    if(!isAppAuth[0])
     {
        console.log("Executed this line 1")
        return (<Route path="/" component={Login} />)
    }
    else
    {
        console.log("Executed this line 2")
    return (
        <div className="bgHome">
        <Router history={history}>
    <Header></Header>
        <Switch>
    
        <Route exact path="/Login" component={Login}> </Route>
        <Route exact path="/" component={Home}> </Route>
        <Route  path="/Pages/masterdata" component={Masterdata} />
    
      
        <Route path="/Pages/Loadshedding" component={Loadshedding} />
        <Route path="/Pages/MasterDataArchive" component={MasterDataArchive} />
        <Route path="/Pages/LoadSheddingArchive" component={LoadSheddingArchive} />
        <Route path="/Pages/TrafoShutdown" component={TrafoShutdown} />
        <Route path="/" component={Login} />
    
       
        </Switch>
        </Router>
        </div>
    )
    }
}
