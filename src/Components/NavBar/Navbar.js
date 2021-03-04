import React, {useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../../Home';
import isAuthContext from  "../AppContext"

const useStyles = makeStyles((theme) => ({
  
  menuButton: {
    marginLeft: theme.spacing(3),
  },
  title: {
    marginRight: theme.spacing(3),
  },
  logoutButton: {
    marginLeft: theme.spacing(90),
  },
}));

export default function NavBar() {
  const classes = useStyles();
  const isAppAuth = useContext(isAuthContext)
    console.log(isAppAuth);
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          
          <Typography variant="h6" className={classes.title}>
            LDC Automation
          </Typography>
      <Button color="inherit"  component={Link} to = "/Pages/masterdata" className={classes.menuButton}>Master Data</Button>
         <Button color="inherit"  component={Link} to = "/Pages/Loadshedding" className={classes.menuButton}>Shutdown</Button>
         <Button color="inherit" component={Link} to = "/Pages/TrafoShutdown" className={classes.menuButton}>Trafo Shutdown</Button>
         <Button color="inherit" component={Link} to = "/Pages/MasterDataArchive" className={classes.menuButton}>Master Data Archive</Button>
         <Button color="inherit" component={Link} to = "/Pages/LoadSheddingArchive" className={classes.menuButton}>Shutdown Archive</Button>
      
         <Button color="inherit" component={Link} to = "/"  className={classes.logoutButton} onClick ={ ()=> {  localStorage.clear("Token");isAppAuth[1](false)}
      } >Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}