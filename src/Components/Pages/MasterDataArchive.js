import React, {useState, useEffect} from 'react'
import { Paper ,makeStyles, TableBody,TableRow, TableCell, Toolbar, InputAdornment} from '@material-ui/core';
import {getAllMasterDataArchive} from "../Api/api"
import UseTable from "../UseTable";
import { Snackbar  } from '@material-ui/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import AddIcon from "@material-ui/icons/Add";
import { Controls } from "../Controls/Controls";
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
    {id : 'MasterDataArchiveSNO', label : 'SNO' },
    {id : 'MasterDataSNO', label : 'MasterData SNO' },
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
    {id: 'CAP_MVAR', label : 'CAP (Faulty, drop) MVAR' },
    {id : 'CAP_OK_MVAR', label : 'CAP OK MVAR' },
    {id : 'dataAddedName', label : 'Data Added By User' },
    {id : 'dataAddedDateTime', label : 'Data Added DateTime' },
    {id : 'ArchivedataAddedName', label : 'Data Archive By User' },
    {id : 'ArchiveAddedDateTime', label : 'Archive Added DateTime' },
]

    export default function MasterDataArchive() {
        const [getMasterData, setMasterData] = useState([]);
        const [filterfn, setFilter] = useState( {fn : masterdataRecords => {return masterdataRecords}});
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
        useEffect(() => {
          
            const fetchAPI = async () => {
                try {
                   
              setMasterData(await getAllMasterDataArchive());
             console.log(`masterData ${getMasterData}`)
                } catch (error) {
                    console.log(`Error ${error}`)
                }
               
            }
        
        
            fetchAPI(); 
        },[]);

        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';
    
        const exportToCSV = (csvData, fileName) => {
            const ws = XLSX.utils.json_to_sheet(csvData);
            const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
            const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
            const data = new Blob([excelBuffer], {type: fileType});
            FileSaver.saveAs(data, fileName + fileExtension);
        }
        const {TblContainer,TblHead,TblPagination ,recordAfterPagingAndSorting} = UseTable(getMasterData,headCells,getMasterData.length,filterfn);
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
        <Paper className = {classes.pageContenet}>
        <Toolbar>
          
        <Controls.Button 
        variant = "outlined" startIcon = {<AddIcon></AddIcon> } className= {classes.addNewbtn}
        onClick = { () => {exportToCSV(getMasterData,"MasterDataArchive") } }
        >Export To Excel
        </Controls.Button>

       
        </Toolbar>
       
            <TblContainer>
            <TblHead></TblHead>
                <TableBody>
                {
                    recordAfterPagingAndSorting().map( row => (
                <TableRow key={row.MasterDataArchiveSNO}>
                <TableCell >{row.MasterDataArchiveSNO}</TableCell>
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
                <TableCell >{row.dataAddedName}</TableCell>
                <TableCell >{new Date(row.dataAddedDateTime).toDateString()}</TableCell>
                <TableCell >{row.ArchivedataAddedName}</TableCell>
                <TableCell >{new Date(row.ArchiveAddedDateTime).toDateString()}</TableCell>
               
                        </TableRow>
                    )

                    )
                }
                </TableBody>
            </TblContainer>
            <TblPagination
            ></TblPagination>
        </Paper>
    
    )
    }
}
