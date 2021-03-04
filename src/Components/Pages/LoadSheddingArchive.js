import React, { useState, useEffect } from 'react'
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { getAllLSDataArchive } from "../Api/api"
import UseTable from "../UseTable";
import { Snackbar } from '@material-ui/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import AddIcon from "@material-ui/icons/Add";
import { Controls } from "../Controls/Controls";
const useStyles = makeStyles(theme => ({
    pageContenet: {


        margin: theme.spacing(3),
        padding: theme.spacing(5),
        width: '95%'

    },
    inputControl: {



        //padding : theme.spacing(5), 
        margin: theme.spacing(3),
        width: '20%'

    },
    addNewbtn: {
        position: 'absolute',
        right: '10px'
    }


}))

const headCells = [
    { id: 'ArchiveLoadSheddingSNO', label: 'SNO' },
    { id: 'LoadSheddingSNO', label: 'Load Shedding SNO' },
    { id: 'group', label: 'Group' },
    { id: 'block', label: 'Block' },
    { id: 'llFeders', label: 'LL Feeders' },
    { id: 'mlFeeders', label: 'ML Feeders' },
    { id: 'hlFeeders', label: 'HL Feeders' },
    { id: 'vhlFeeders', label: 'VHL Feeders' },
    { id: 'totalFeeders', label: 'Total Feeders' },
    { id: 'spell_1_to_and_From', label: 'Spell 1 [To and From]' },
    { id: 'spell_2_to_and_From', label: 'Spell 2 [To and From]' },
    { id: 'spell_3_to_and_From', label: 'Spell 3 [To and From]' },
    { id: 'spell_4_to_and_From', label: 'Spell 4 [To and From]' },
    { id: 'spell_5_to_and_From', label: 'Spell 5 [To and From]' },
    { id: 'spell_6_to_and_From', label: 'Spell 6 [To and From]' },
    { id: 'planExpiry', label: 'Plan Expiry Date' },
    { id: 'dataAddedDateTime', label: 'Plan Added Date Time' },
    { id: 'dataAddedByName', label: 'Plan Added by User' },
    { id: 'ArchiveAddedDateTime', label: 'Plan Archive Date Time' },
    { id: 'ArchiveAddedByName', label: 'Plan Archive by User' },

]
export default function LoadSheddingArchive() {
    const [getLSData, setLSData] = useState([]);
    const [filterfn, setFilter] = useState({ fn: masterdataRecords => { return masterdataRecords } });
    const [state, setState] = useState({
        vertical: 'bottom',
        horizontal: 'center',
        isOpen: false,


    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setState({ isOpen: false });
    };
    useEffect(() => {

        const fetchAPI = async () => {
            try {

                setLSData(await getAllLSDataArchive());
                console.log(getLSData)
            } catch (error) {
                console.log(`Error ${error}`)
            }

        }


        fetchAPI();
    }, []);

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }
    const { TblContainer, TblHead, TblPagination, recordAfterPagingAndSorting } = UseTable(getLSData, headCells, getLSData.length, filterfn);
    const classes = useStyles();
    const isTokenisAlive = localStorage.getItem("Token");
    if (isTokenisAlive == null || isTokenisAlive == undefined) {
        console.log("Token is Expired")
        return (

            <Snackbar open={state.isOpen} autoHideDuration={2500} onClose={handleClose} message="Session is Expired" >

            </Snackbar>
        )
    }
    else {
        return (
            <Paper className={classes.pageContenet}>
            <Toolbar>
          
            <Controls.Button 
            variant = "outlined" startIcon = {<AddIcon></AddIcon> } className= {classes.addNewbtn}
            onClick = { () => {exportToCSV(getLSData,"LoadSheddingArchive") } }
            >Export To Excel
            </Controls.Button>
  
           
            </Toolbar>

                <TblContainer>
                    <TblHead></TblHead>
                    <TableBody>
                        {
                            recordAfterPagingAndSorting().map(row => (
                                <TableRow key={row.ArchiveLoadSheddingSNO}>
                                <TableCell >{row.ArchiveLoadSheddingSNO}</TableCell>
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
                                <TableCell >{row.dataAddedByName}</TableCell>
                                <TableCell >{new Date(row.ArchiveAddedDateTime).toDateString()}</TableCell>
                                <TableCell >{row.ArchiveAddedByName}</TableCell>
                           
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
