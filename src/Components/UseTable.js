import { Table, TableBody, TableCell, TableRow , makeStyles,TableHead, TablePagination, TableSortLabel, TableContainer} from '@material-ui/core'
import React, { useState } from 'react'


const useStyles =  makeStyles( theme => ({
  
    Table : {
       marginTop : theme.spacing(3),
        
    
       "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
      },
       '& thead th' : {
        fontWeight : '300',
          color : "black",
          backgroundColor : "White",
          height : "10px",
          whiteSpace: "nowrap"

       },
       '& tbody td' : {
        fontWeight : '100',
       },

       '& tbody tr:hover' : {
        backgroundColor : 'lightgrey',
        cursor: 'pointer'
       },

       '& .MuiTableCell-head ' :{

       
         lineHeight : "10px"
       }
   },
    

}))
export default function UseTable(records, headCells,lenght,filterfn) {

   
    console.log(lenght);
 
    
    
    const pages = [100,1500,2000, lenght];
    const  [page , setPage] = useState(0);
    const  [rowsPerpage , setrowsPerpagePage] = useState(pages[page]);
    const useClasses = useStyles();
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] =useState()

    const TblContainer = props => (
        <TableContainer>
        <Table className = {useClasses.Table}>
        {props.children}
        </Table>
        </TableContainer>
    )
      
    const TblHead = props => {
        
        try {
          const HandleSorting =(id) => {
            console.log(orderBy === id && order === 'asc')
            const isAsc = orderBy === id && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc') 
            setOrderBy(id)
        }
          return ( <TableHead>
            <TableRow>
            {headCells.map ( header => (
                <TableCell key= {header.id }
                sortDirection = {orderBy === header.id ? order : false} >
                {header.disableSorting ? header.label :
                <TableSortLabel 
                active = {orderBy ===  header.id}
                direction = {orderBy ===  header.id ? order : 'asc'}
                onClick= { () => {HandleSorting(header.id)} }>
                {header.label}
                </TableSortLabel>
             }
                
                </TableCell>
            )) }
            </TableRow>
             </TableHead>
           )
        } catch (error) {
          console.log(error)
        }
     
       }
            
            const handleChange = (event, newPage) => {
                console.log(newPage)
                setPage(newPage);
            }

            const handleRowsPerPage = (e) => {
                console.log(e.target.value)
                setrowsPerpagePage (parseInt(e.target.value, 10));
                setPage(0);
            }
            
            function getComparator(order, orderBy) {
                return order === 'desc'
                  ? (a, b) => descendingComparator(a, b, orderBy)
                  : (a, b) => -descendingComparator(a, b, orderBy);
              }
              
              function stableSort(array, comparator) {
                const stabilizedThis = array.map((el, index) => [el, index]);
                stabilizedThis.sort((a, b) => {
                  const order = comparator(a[0], b[0]);
                  if (order !== 0) return order;
                  return a[1] - b[1];
                });
                return stabilizedThis.map((el) => el[0]);
              }

              const recordAfterPagingAndSorting =() => {
                console.log( stableSort(filterfn.fn(records) ,getComparator(order,orderBy)).slice(page*rowsPerpage, (page+1) * rowsPerpage))
                                return stableSort(filterfn.fn(records) ,getComparator(order,orderBy)).slice(page*rowsPerpage, (page+1) * rowsPerpage);
            }
            function descendingComparator(a, b, orderBy) {
                if (b[orderBy] < a[orderBy]) {
                  return -1;
                }
                if (b[orderBy] > a[orderBy]) {
                  return 1;
                }
                return 0;
              }

    const TblPagination = () => (

        <TablePagination
        component="div" 
        rowsPerPageOptions = {pages}
        count = {lenght}
        rowsPerPage = {rowsPerpage} 
        page = {page}
        onChangePage = {handleChange}
        onChangeRowsPerPage = {handleRowsPerPage}
       
        
      
        
        ></TablePagination>)
    
    return {TblContainer,TblHead,TblPagination,recordAfterPagingAndSorting}
}
