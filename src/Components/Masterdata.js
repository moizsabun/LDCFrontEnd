import React, { useState,useEffect } from 'react'
import {AddMasterData,getAllMasterData} from "../Components/Api/api";
import XLSX from "xlsx";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
function createData(Island,GridBlock, Traffo, feederID) {
  return {Island,GridBlock, Traffo, feederID};
}

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];
export default function Masterdata() {
  const [getMasterData, setMasterData] = useState([]);
  const [getfile, setFile] = useState();

  useEffect(() => {
    const fetchAPI = async () => {
        try {
           
         setMasterData(await getAllMasterData());
        } catch (error) {
            console.log(`Error ${error}`)
        }
       
    }


    fetchAPI(); 
},[]);
console.log(getMasterData);




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
    };
    reader.readAsBinaryString(f);
  }

 

 const filePathset =(e) => {
  e.stopPropagation();
  e.preventDefault();
  var file = e.target.files[0];
  console.log(file);
 // this.setState({ file });
 setFile(file);
  console.log(getfile);

}

  const classes = useStyles();
  return (
    <div>
    <h1>Master Data File Upload and display data</h1>
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
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Island</TableCell>
              <TableCell align="right">GridBlock</TableCell>
              <TableCell align="right">Traffo</TableCell>
              <TableCell align="right">FeederId</TableCell>
              <TableCell align="right">Switch Number</TableCell>
              <TableCell align="right">Switch Type</TableCell>
              <TableCell align="right">Feeder type</TableCell>
              <TableCell align="right">Switch Make</TableCell>
              <TableCell align="right">Group</TableCell>
              <TableCell align="right">Category</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getMasterData.map((row) => (
              <TableRow key={row.masterDataSNO} >
              
                <TableCell align="right">{row.island}</TableCell>
                <TableCell align="right">{row.gridBlock}</TableCell>
                <TableCell align="right">{row.trafo}</TableCell>
                <TableCell align="right">{row.feederID}</TableCell>
                <TableCell align="right">{row.switch_Number}</TableCell>
                <TableCell align="right">{row.switch_Type}</TableCell>
                <TableCell align="right">{row.feeder_Type}</TableCell>
                <TableCell align="right">{row.switch_Make}</TableCell>
                <TableCell align="right">{row.group}</TableCell>
                <TableCell align="right">{row.category}</TableCell>
                
                <TableCell align="right">{  <IconButton onClick={ ()=> {console.log(`Edit Clicked ROW ${JSON.stringify(row)} `) } }>
                <EditIcon color="secondary" />
              </IconButton>
            }
            </TableCell>
                <TableCell align="right">{  <IconButton onClick={ ()=> {console.log("Delete Clicked") } }>
                <DeleteIcon color="secondary" />
              </IconButton>
            }
            </TableCell>
            
              </TableRow>
            )
            
            )}
          </TableBody>
         
        </Table>
      </TableContainer>
    </div>
  )
}
