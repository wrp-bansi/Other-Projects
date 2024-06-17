// components/ShowEmployee/ShowEmployee.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUsers, deleteUser } from '../../Slices/user/employeeSlices';
import { fetchUsersApi } from '../../helpers/api';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function ShowEmployee() {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    // Alternatively, you can dispatch directly using the API function
    // dispatch(fetchUsersApi());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteUser({ id: id }));
  };

  return (
    <>
      <div className='text-center'>
        <Link to='/create'>create +</Link>
      </div>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align='right'>Name</TableCell>
              <TableCell align='right'>Email</TableCell>
              <TableCell align='right'>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell component='th' scope='row'>
                  {row.id}
                </TableCell>
                <TableCell align='right'>{row.name}</TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>
                  <Link to={`/edit/${row.id}`} variant='contained'>
                    edit
                  </Link>
                </TableCell>
                <TableCell align='right'>
                  <Button variant='contained' onClick={() => handleDelete(row.id)}>
                    delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ShowEmployee;
