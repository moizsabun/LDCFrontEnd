import React, { useContext, useState } from 'react'

import { Grid, Paper, Avatar, TextField, Button, Link, Box, Snackbar  } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import CssBaseline from '@material-ui/core/CssBaseline';



import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {VerfiyLogin}  from "../Components/Api/api";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from '../Home';
import { Controls } from "../Components/Controls/Controls";
import isAuthContext from "../Components/AppContext"
import 'bootstrap/dist/css/bootstrap.css';
import Footer from './Pages/Footer';
import TrafoShutdown from './Pages/TrafoShutdown';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
 
}));






export default function Login() {
 let isAuth = useContext(isAuthContext);
  const [state, setState] = useState({
    isLoading : false,
    vertical : 'bottom',
    horizontal: 'center',
    isOpen : false,
    

  });
  //const [isLoading, setLoading] = useState();
  //const [open, setOpen] = useState(false);
  const Verifylogin = async e => {
    e.preventDefault();
    console.log("Login Button Clicked");
     

    try {
      console.log("in Try Block"); 
      //setLoading('loading');
      setState ({ isLoading:true});
    
      let isSucess = await    VerfiyLogin(username, password);
      
      console.log("Executed this line")
      //setLoading('');
      setState ({isLoading:false});
      if(isSucess)
      {
        isAuth[1](true)
      }
      else
      {
        setState ({...state, isOpen:true});
        isAuth[1](false)
      }
     
     
      
    
    
    }

    
    catch (error) {
     // setOpen(true);
      //setLoading();
      setState ({...state, isLoading:false, isOpen:true});
      console.log("Error Occured");
      console.log(error);
      isAuth[1](false)
    
    }


  }
 

  

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setState ({isOpen:false});
  };
  const [username, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();
  const paperStyle = { padding: 10, height: 'auto', width: 350, margin: '150px auto' }

if(isAuth[0])
{
  return (
    <Router>
    <Route component={Home} exact path="/"></Route>
    <Route component={Home} exact path="/Pages/masterdata"></Route>
    <Route component={Home} exact path="/Pages/LoadShedding"></Route>
     <Route component={Home} exact path="/Pages/MasterDataArchive"></Route>
  <Route component={Home} exact path="/Pages/LoadSheddingArchive"></Route> 
  <Route path="/Pages/TrafoShutdown" component={TrafoShutdown} />
    </Router>

    
  ) 
 
 
}
  return (
    <div className="container-fluid bg">
    <div className="row">
        <div className="col-md-4 col-sm-4 col-xs-12">  </div>
        <div className="col-md-4 col-sm-4 col-xs-12">

        <Grid>
        <Paper elevation={3} style={paperStyle}>
          <Grid align='Center'>
  
  
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <CssBaseline />
              <Typography component="h1" variant="h5">
                Sign in
        </Typography>
              <form className={classes.form} onSubmit={Verifylogin}>
  
                <Controls.Input
                variant="outlined"
                  
                  name="username"
                  label="User Name"
                  type="text"
                  size = "small"
                  placeholder = "Enter User Name Here"
                  margin="normal"
                  required
                  fullWidth
                  id="userName"
                  onChange={(e) => { setuserName(e.target.value) }}
                >
                
                
                </Controls.Input>
                <Controls.Input
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={(e) => { setPassword(e.target.value) }}
                />
  
                <Controls.Button
               
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                 // className={classes.submit}
                  disabled={state.isLoading}
                >
             SIGN IN
  
                </Controls.Button>

              <Controls.LoadingControl open={state.isLoading}></Controls.LoadingControl>
               <Snackbar open={state.isOpen} autoHideDuration={2500} onClose={handleClose} message="Error Occured, Please Contact Administrator" >
                 
                </Snackbar>
              </form>
  
            </div>
           
          </Grid>
      
        </Paper>
        <Footer></Footer>
        
      </Grid>
    
    <div className="col-md-4 col-sm-4 col-xs-12"></div>
    </div></div>
    </div>
  );

}
