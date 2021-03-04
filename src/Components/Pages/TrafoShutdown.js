import React , {useState,useEffect}from 'react'
import { Paper ,makeStyles, TableBody,TableRow, TableCell, Toolbar, InputAdornment} from '@material-ui/core';
import UseTable from "../UseTable";
import { Controls } from "../Controls/Controls";
import { Search } from '@material-ui/icons';
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import { Snackbar  } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close'
import EditOutlined from '@material-ui/icons/EditOutlined'
import TrafoShutdownForm from "./TrafoShutdownForm";
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
}
    

}))

const headCells = [
    {id : 'TrafoShutdownSNO', label : 'SNO' },
    {id : 'grid', label : 'Grid ' },
    {id : 'trafo', label : 'Trafo' },
    {id : 'time', label : 'Time' },
    {id : 'date', label : 'Date' },
    {id : 'feederAffected', label : 'Feeder Affected'},
    {id : 'reason', label : 'Reason' },
    {id : 'rating', label : 'Rating' },
    {id : 'load', label : 'Load taken on Trafo' },
    {id : 'gsm', label : 'GSM' },
    {id : 'dataAddedDateTime', label : 'Data Added DateTime' },
    {id : 'dataAddedBy', label : 'Data Added By' },
    
]

export default function TrafoShutdown() {

    const [filterfn, setFilter] = useState( {fn : LSData => {return LSData}});
    const [getLSData, setLSData] = useState([]);
    const [openPopup, setOpenPopup] = useState(false);
    const [isUpdated ,setUpdated] = useState("")
    const [recordForEdit ,setRecordForEdit] = useState(null)
    // useEffect(() => {
    //     console.log(isUpdated)
    //     const fetchAPI = async () => {
    //         try {
               
    //             setLSData(await GetLoadSheddings());
             
    //         } catch (error) {
    //             console.log(`Error ${error}`)
    //         }
           
    //     }
    
    
    //     fetchAPI(); 
    // },[isUpdated]);
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
        
        
      //  addExpiry(values);
    }
    

      const addOredit = async (values,resetForm) => {
        console.log(values.MasterDataSNO)
        if(values.LoadSheddingSNO === 0)
        {
          //  await InsertLSData(values);
           
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
        
        <Popup
        openPopup =  {openPopup}
        setopenPopup = {setOpenPopup} 
        title = "Shutdown Form">
       <TrafoShutdownForm></TrafoShutdownForm>
        </Popup>
        </>
    )

}

}
