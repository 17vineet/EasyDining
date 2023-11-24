import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import API from '../../../axios'
import { useAuth } from '../../../contexts/AuthContext';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  // '&:last-child td, &:last-child th': {
  //   border: 0,
  // },
}));


const AvailableTable = ({ updated }) => {
  const { currentUser } = useAuth();
  const [tables, setTables] = useState([])

  useEffect(() => {
    async function fetchTables() {
      const resp = await API.post("/restaurant/availabletables", { rid: currentUser._id });
      setTables(resp.data)
    }
    fetchTables();
  }, [updated])

  return (
    <>
      {tables.length > 0 &&
        <table className='table table-striped'>
          <thead>
            <tr>
              <th scope="col">Table Capacity</th>
              <th scope="col">Available Tables</th>
            </tr>
          </thead>
          <tbody>
          {tables.map((row, index) => (
            <tr>
              <td >{row[0]}</td>
              <td >{row[1]}</td>
            </tr>
          ))}
          </tbody>
        </table>
      }
    </>
  )
}

export default AvailableTable


