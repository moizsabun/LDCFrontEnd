import React , {useState,useEffect}from 'react'
import LoadSheddingDataForm from './LoadSheddingForm'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Paper ,makeStyles, TableBody,TableRow, TableCell, Toolbar, InputAdornment} from '@material-ui/core';
import UseTable from "../UseTable";
import { Controls } from "../Controls/Controls";
import { Height, Search } from '@material-ui/icons';
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import { Snackbar  } from '@material-ui/core';
import {InsertLSData,GetLoadSheddings, setExpiry,updateLSData} from "../Api/api"
import CloseIcon from '@material-ui/icons/Close'
import EditOutlined from '@material-ui/icons/EditOutlined'
import UseForm, { Form } from "../../Components/UseForm";
import Footer from './Footer';
const useStyles =  makeStyles( theme => ({
    pageContenet : {
        
        
            margin: theme.spacing(3),
            padding : theme.spacing(5), 
            width : '95%'
        
    },
    inputControl : {
        
        
        
        //padding : theme.spacing(5), 
        margin: theme.spacing(3),
        width : '20%'
    
},
addNewbtn : {
    position : 'absolute',
    right : '10px'
},
   expiry : {
    
   } ,

   Fdiv:{
    paddingTop: '130px',
    paddingLeft: '140px'
   }
}))

const headCells = [
    {id : 'LoadSheddingSNO', label : 'SNO' },
    {id : 'group', label : 'Group' },
    {id : 'block', label : 'Block' },
    {id : 'llFeders', label : 'LL Feeders' },
    {id : 'mlFeeders', label : 'ML Feeders' },
    {id : 'hlFeeders', label : 'HL Feeders'},
    {id : 'vhlFeeders', label : 'VHL Feeders' },
    {id : 'totalFeeders', label : 'TOTAL Feeders' },
    {id : 'spell_1_to_and_From', label : 'SPELL 1 TO AND FROM' },
    {id : 'spell_2_to_and_From', label : 'SPELL 2 TO AND FROM' },
    {id : 'spell_3_to_and_From', label : 'SPELL 3 TO AND FROM' },
    {id : 'spell_4_to_and_From', label : 'SPELL 4 TO AND FROM'},
    {id : 'spell_5_to_and_From', label : 'SPELL 5 TO AND FROM' },
    {id : 'spell_6_to_and_From', label : 'SPELL 6 TO AND FROM' },
    {id : 'planExpiry', label : 'EXPIRY'},
    {id : 'dataAddedDateTime', label : 'dataAddedDateTime'},
    {id : 'dataAddedBy', label : 'dataAddedBy'}
  
]

const initialFValues = {
    expiryDate : new Date()
}
export default function Loadshedding() {
    const { values, setValues, handleChange } = UseForm(initialFValues);
    const [filterfn, setFilter] = useState( {fn : LSData => {return LSData}});
    const [getLSData, setLSData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [isUpdated ,setUpdated] = useState("")
    const [recordForEdit ,setRecordForEdit] = useState(null)
   
    useEffect(() => {
        console.log(isUpdated)
        const fetchAPI = async () => {
            try {
               
                setLSData(await GetLoadSheddings());
             
            } catch (error) {
                console.log(`Error ${error}`)
            }
           
        }
    
    
        fetchAPI(); 
    },[isUpdated]);
    const [state, setState] = useState({
        vertical : 'bottom',
        horizontal: 'center',
        isOpen : false,
        
    
      });
      
      const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setState ({isOpen:false});
      };

      const handleSubmit = e => {

        e.preventDefault();
        console.log(values);
        
        addExpiry(values);
    }
    

    const addExpiry = async (values) => {
          let getData =   await setExpiry(values.expiryDate);
          console.log(getData)
          if(isUpdated === "yes")
          {
            setUpdated("yes!")
          }
          else
          {
            setUpdated("yes")
          }
    }
      const addOredit = async (values,resetForm) => {
        console.log(values.MasterDataSNO)
        if(values.LoadSheddingSNO === 0)
        {
            await InsertLSData(values);
           
        }
        else
        {
            await updateLSData(values);
            
            
        }
        if(isUpdated === "yes")
        {
            setUpdated("yes!")
        }
        else{
            setUpdated("yes")
        }
        
        setRecordForEdit(null);
        
        
        setOpenPopup(false);
        
    }


  

        
    const hanleChange = (e) => {
        const Tvalue = e.target;
        console.log(e.target)
        console.log(Tvalue.value == "")
        console.log(Tvalue.value)
    
        setFilter ( {
            fn: LSData => {
                if(Tvalue.value == "")
                {
                    return LSData
                }
                else{
                  
                    return LSData.filter(x => x.block.includes(e.target.value) )
                }
            }

        })
    }
    const openInPopup =(item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }
    const {TblContainer,TblHead,TblPagination ,recordAfterPagingAndSorting} = UseTable(getLSData,headCells,getLSData.length ,filterfn);
    //console.log(getMasterData.length)        
    const classes = useStyles();
    const isTokenisAlive = localStorage.getItem("Token");

    if(isTokenisAlive == null || isTokenisAlive == undefined)
    {
            console.log("Token is Expired")
            return (

                <Snackbar open={state.isOpen} autoHideDuration={2500} onClose={handleClose} message="Session is Expired" >
               
                </Snackbar>
            )
    }
    else
    {
    return (
        <>
        <Paper className = {classes.pageContenet}>
       
        <Toolbar>
        <Controls.Input
        className = {classes.inputControl}
        label = "Block"
        variant = "outlined"
      
                InputProps = { {
                    startAdornment : (<InputAdornment position="start">
                    <Search></Search>
                    </InputAdornment>)
                        
                
                }}
                onChange = {hanleChange}
        >
        </Controls.Input>
        <Controls.Input
        className = {classes.inputControl}
        label = "Group"
        variant = "outlined"
        InputProps = { {
            
            startAdornment : (<InputAdornment position="start">
            <Search></Search>
            </InputAdornment>)
                
        
        }}>
        </Controls.Input>
        <Controls.Button 
        variant = "outlined" startIcon = {<AddIcon></AddIcon> } className= {classes.addNewbtn}
        onClick = { () => {setOpenPopup(true) ;setRecordForEdit(null) } }
        >Add ShutdownPlan
        </Controls.Button>
<div className={classes.Fdiv}>
<Form onSubmit={handleSubmit}>
<Controls.DatePicker
        name="expiryDate"
        label = "Set Plan Expiry"
        value= {values.expiryDate}
       className = {classes.expiry}
       onChange= {handleChange}
        >
     

        </Controls.DatePicker>
        <Controls.Button 
        variant = "outlined" startIcon = {<AddIcon></AddIcon> }
        type= "Submit"
        >Set Plan Expiry
        </Controls.Button>
        </Form>
</div>
       
        </Toolbar>
           <TblContainer>
           
            <TblHead></TblHead>
                <TableBody>
                {
                
                getLSData.map( row => (
                <TableRow key={row.LoadSheddingSNO}>
                <TableCell >{row.LoadSheddingSNO}</TableCell>
                <TableCell >{row.group}</TableCell>
                <TableCell >{row.block}</TableCell>
                <TableCell >{row.llFeders}</TableCell>
                <TableCell >{row.mlFeeders}</TableCell>
                <TableCell >{row.hlFeeders}</TableCell>
                <TableCell >{row.vhlFeeders}</TableCell>
                <TableCell >{row.totalFeeders}</TableCell>
                <TableCell >{row.spell_1_to_and_From}</TableCell>
                <TableCell >{row.spell_2_to_and_From}</TableCell>
                <TableCell >{row.spell_3_to_and_From}</TableCell>
                <TableCell >{row.spell_4_to_and_From}</TableCell>
                <TableCell >{row.spell_5_to_and_From}</TableCell>
                <TableCell >{row.spell_6_to_and_From}</TableCell>
                <TableCell >{new Date(row.planExpiry).toDateString()}</TableCell>
                <TableCell >{new Date(row.dataAddedDateTime).toDateString()}</TableCell>
                <TableCell >{row.dataAddedBy}</TableCell>
                <TableCell>
                <Controls.ActionButton color="primary"> 
                <EditOutlined fontSize= "small" onClick = { () => {openInPopup(row);console.log(row); }}></EditOutlined>
                </Controls.ActionButton>
                </TableCell>
                <TableCell>
                <Controls.ActionButton color="secondary"> 
                <CloseIcon fontSize= "small"></CloseIcon>
                </Controls.ActionButton>
                </TableCell>
                        </TableRow>
                    )

                    )
                }
                </TableBody>
            </TblContainer>
            <TblPagination
            ></TblPagination>
          
            </Paper> 
           <Footer></Footer>
        <Popup
        openPopup =  {openPopup}
        setopenPopup = {setOpenPopup} 
        title = "Shutdown Form">
        <LoadSheddingDataForm update={"yes"} addOrEdit={addOredit} recordForEdit= {recordForEdit}></LoadSheddingDataForm> 
        </Popup>
    
        </>
    )

}
}
