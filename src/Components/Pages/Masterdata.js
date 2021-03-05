
import React , {useState,useEffect}from 'react'
import MasterDataForm from './MasterDataForm'
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import { Paper ,makeStyles, TableBody,TableRow, TableCell, Toolbar, InputAdornment} from '@material-ui/core';
import UseTable from "../UseTable";
import { Controls } from "../Controls/Controls";
import { Search } from '@material-ui/icons';
import AddIcon from "@material-ui/icons/Add";
import Popup from "../Popup";
import { Snackbar  } from '@material-ui/core';
import {InsertMasterData, updateMasterData,AddMasterData ,getAllMasterData} from "../Api/api"
import CloseIcon from '@material-ui/icons/Close'
import EditOutlined from '@material-ui/icons/EditOutlined'
import XLSX from "xlsx";
import Notifications from '../Controls/Notifications';
import ConfirmDialogue from "../Controls/ConfirmDialogue";
import Footer from './Footer';
import {Form} from 'react-bootstrap';
import { Button as BtButton } from 'react-bootstrap';
const useStyles =  makeStyles( theme => ({
    pageContenet : {
        
        
            margin: theme.spacing(3),
            padding : theme.spacing(5), 
           width : '95%',
           
          
        
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
    {id : 'MasterDataSNO', label : 'SNO' },
    {id : 'ISLAND', label : 'ISLAND' },
    {id : 'gridBlock', label : 'Grid Block' },
    {id : 'trafo', label : 'TRAFO' },
    {id : 'feederID', label : 'Feeder ID' },
    {id : 'switch_Number', label : 'Switch #'},
    {id : 'switch_Name', label : 'Switch Name' },
    {id : 'switch_Type', label : 'Switch Type' },
    {id : 'feedeR_TYPE', label : 'FEEDER TYPE' },
    {id : 'group', label : 'Group' },
    {id : 'category', label : 'Category' },
    {id : 'switch_Make', label : 'Switch Make'},
    {id : 'region', label : 'Region' },
    {id : 'cable_Status', label : 'Cable Status Single/Double cable' },
    {id : 'ufR_SW', label : 'UFR (Sw)'},
    {id : 'stage_A', label : 'Stage A 49.4 df/dt'},
    {id : 'stage_B', label : 'Stage B 49.4 df/dt'},
    {id : 's1', label : '49.3(S1)' },
    {id : 's2', label : '49.2(S2)50 ms3' },
    {id : 's3', label : '49.0 (S3) 150ms' },
    {id : 's4', label : '48.8 (S4) 200ms' },
    {id : 's5', label : '48.6(S5)50 ms' },
    {id : 's6', label : '48.6(S6)200 ms' },
    {id : 's7', label : '48.6(S7)300 ms' },
    {id : 's8', label : '48.5(S8)100 ms' },
    {id : 's9', label : '48.5(S9)50 ms' },
    {id : 's10', label : '48.4(S10)100 ms'},
    {id : 's11', label : '48.4(S11)50 ms'},
    {id: 'caP_MVAR', label : 'CAP (Faulty, drop) MVAR' },
    {id : 'caP_OK_MVAR', label : 'CAP OK MVAR' },
    {id : 'dataAddedBy', label : 'Data Added By User' },
    {id : 'dataAddedDateTime', label : 'Data Added DateTime' },
    {id : 'actions', label : 'Actions' , disableSorting : true}














]
export default function Masterdata() {
   
    const [getMasterData, setMasterData] = useState([]);
    const [filterfn, setFilter] = useState( {fn : masterdataRecords => {return masterdataRecords}});
    const [openPopup, setOpenPopup] = useState(false);
    const [isUpdated ,setUpdated] = useState("")
    const [recordForEdit ,setRecordForEdit] = useState(null)
    const [getfile, setFile] = useState();
    const [isFileExsist, setisFileExsist] = useState(false);
    const  [notify,setNotify] =  useState({isOpen:false, message: '', type : ''});
    const [ConfirmDialog, setConfirmDialog] =  useState({title:'', subtitle : '' ,isOpen : false})
    useEffect(() => {
        console.log(isUpdated)
        const fetchAPI = async () => {
            try {
               
          setMasterData(await getAllMasterData());
    console.log(`masterData ${getMasterData}`)
            } catch (error) {
                console.log(`Error ${error}`)
            }
           
        }
    
    
        fetchAPI(); 
    },[isUpdated]);

    const  readFile = () => {
        var f = getfile;
        var name = f.name;
        const reader = new FileReader();
        reader.onload = async (evt) => {
          // evt = on_file_select event
          /* Parse data */
          const bstr = evt.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          //const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          /* Update state */
          const data = XLSX.utils.sheet_to_json(ws, {
            raw: true
        });
        console.log(data);
    
        console.log(JSON.stringify(data));
        //  console.log("Data>>>" + data);// shows that excel data is read
          //console.log(convertToJson(data)); // shows data in json format
         
        
          
          console.log("Sending Data to API");
           
          
          await AddMasterData(data);
          console.log("Data Uplaoded");
          if(isUpdated === "yes")
        {
            setUpdated("yes!")
        }
        else{
            setUpdated("yes")
        }
        };
        reader.readAsBinaryString(f);
        setisFileExsist(false);
      }
    
     
    
     const filePathset =(e) => {
      e.stopPropagation();
      e.preventDefault();
      var file = e.target.files[0];
      console.log(file);
     // this.setState({ file });
     setFile(file);
      console.log(getfile);
      setisFileExsist(true);
    }
    
    console.log("Called this Method")

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

   

    const addOredit = async (values,resetForm) => {
        console.log(values.MasterDataSNO)
        if(values.MasterDataSNO === 0)
        {
            await InsertMasterData(values);
           
        }
        else
        {
            
            await updateMasterData(values);
            
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
        setNotify({
            isOpen : true,
            message: "Record Saved Successfull",
            type : "success"
        })
        
    }
          
    const Delete= (id) => {
        setConfirmDialog ( {
            ...ConfirmDialog,
            isOpen :false
            })
        console.log("Id Selected" , id)

    }
    const hanleChange = (e) => {
        const Tvalue = e.target;
        console.log(e.target)
        console.log(Tvalue.value == "")
        console.log(Tvalue.value)
    
        setFilter ( {
            fn: masterdataRecords => {
                if(Tvalue.value == "")
                {
                    return masterdataRecords
                }
                else{
                  try {
                    return masterdataRecords.filter(x => x.switch_Type.includes(e.target.value) )
                  } catch (error) {
                    console.log(error);
                      return (
<h1> Error</h1>
                      );
                      
                  }
                   
                }
            }

        })
    }
    const openInPopup =(item) => {
        setRecordForEdit(item);
        setOpenPopup(true);
    }
    const {TblContainer,TblHead,TblPagination ,recordAfterPagingAndSorting} = UseTable(getMasterData,headCells,getMasterData.length,filterfn);
    console.log(getMasterData.length)
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
        {/* <div>
      
        <input
              type="file"
              id="file"
             
             onChange={filePathset}
              
            />
            <button
              onClick={() => {
                readFile();
              }}
            >
              Read File
            </button>
        </div> */}
        <Paper className = {classes.pageContenet}>
        <Form style={{display: "flex" ,  flexDirection: "row" }}>
        <Form.File 
          id="upload1"
          style= {{width:"200px", marginBottom: "10px" ,}}
          onChange={filePathset}
        />
            <BtButton  variant="secondary" size="sm" style={{borderRadius: "10" , marginBottom: "10px" 
        ,  height: "40px" , marginLeft: "50px"}}  onClick={() => {
            readFile();
          }} disabled = {isFileExsist === false}>Upload File</BtButton>
     

      
       
      </Form>
        <Toolbar>
        <Controls.Input
        className = {classes.inputControl}
        label = "Search Switch type"
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
        label = "Search Feeder Id"
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
        >Add New
        </Controls.Button>
        </Toolbar>
            <TblContainer>
            <TblHead></TblHead>
                <TableBody>
                {
                    recordAfterPagingAndSorting().map( row => (
                <TableRow key={row.MasterDataSNO}>
                <TableCell >{row.MasterDataSNO}</TableCell>
                <TableCell >{row.ISLAND}</TableCell>
                <TableCell >{row.GridBlock}</TableCell>
                <TableCell >{row.TRAFO}</TableCell>
                <TableCell >{row.FeederID}</TableCell>
                <TableCell >{row.Switch_Number}</TableCell>
                <TableCell >{row.Switch_Name}</TableCell>
                <TableCell >{row.Switch_Type}</TableCell>
                <TableCell >{row.FEEDER_TYPE}</TableCell>
                <TableCell >{row.Switch_Make}</TableCell>
                <TableCell >{row.Group}</TableCell>
                <TableCell >{row.Category}</TableCell>
                <TableCell >{row.Region}</TableCell>
                <TableCell >{row.Cable_Status}</TableCell>
                <TableCell >{row.UFR_SW}</TableCell>
                <TableCell >{row.Stage_A}</TableCell>
                <TableCell >{row.Stage_B}</TableCell>
                <TableCell >{row.S1}</TableCell>
                <TableCell >{row.S2}</TableCell>
                <TableCell >{row.S3}</TableCell>
                <TableCell >{row.S4}</TableCell>
                <TableCell >{row.S5}</TableCell>
                <TableCell >{row.S6}</TableCell>
                <TableCell >{row.S7}</TableCell>
                <TableCell >{row.S8}</TableCell>
                <TableCell >{row.S9}</TableCell>
                <TableCell >{row.S10}</TableCell>
                <TableCell >{row.S11}</TableCell>
                <TableCell >{row.CAP_OK_MVAR}</TableCell>
                <TableCell >{row.CAP_MVAR}</TableCell>
                <TableCell >{row.dataAddedBy}</TableCell>
                <TableCell >{new Date(row.dataAddedDateTime).toDateString()}</TableCell>
                <TableCell>
                <Controls.ActionButton color="primary"> 
                <EditOutlined fontSize= "small" onClick = { () => {openInPopup(row);console.log(row); }}></EditOutlined>
                </Controls.ActionButton>
                </TableCell>
                <TableCell>
                <Controls.ActionButton color="secondary" onClick = { () => {  setConfirmDialog({
                    isOpen: true,
                    title :'Are you sure to Delete this Record ? ',
                    subtitle : "You can't change once record Deleted",
                    onConfirm : () => { Delete(row.MasterDataSNO );}
                }) } }> 
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
        title = "Master Data Form">
        <MasterDataForm addOrEdit={addOredit} recordForEdit= {recordForEdit}></MasterDataForm> 
        </Popup>
        <Notifications notify= {notify} setNotify={setNotify}></Notifications>
        <ConfirmDialogue ConfirmDialog = {ConfirmDialog} setConfirmDialog={setConfirmDialog}></ConfirmDialogue>

        </>
    )
            }
}
