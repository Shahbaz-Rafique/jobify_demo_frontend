import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Skeleton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MiniDrawer from '../drawer/superadmin';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  fetchAdmins,
  updateAdmin,
  deleteAdmin,
  setPage,
  setRowsPerPage,
} from '../../Redux/AdminSlice';

const Admins = () => {
  const dispatch = useDispatch();
  const { admins, status, page, rowsPerPage } = useSelector((state) => state.admin);

  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    dispatch(fetchAdmins({ page, limit: rowsPerPage }));
  }, [dispatch, page, rowsPerPage]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleUpdateSubmit = async () => {
    if (name && email) {
      try {
        await dispatch(updateAdmin({
          id: selectedAdmin._id,
          name,
          email,
        })).unwrap();
        toast.success('Admin updated');
        setOpen(false);
        setSelectedAdmin(null);
        setName('');
        setEmail('');
        dispatch(fetchAdmins({ page, limit: rowsPerPage }));
      } catch (error) {
        console.error('Error updating admin:', error.message);
      }
    } else {
      console.log('Please fill all fields.');
    }
  };

  const handleOpenModal = (admin) => {
    setSelectedAdmin(admin);
    setName(admin.name);
    setEmail(admin.email);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAdmin(null);
    setName('');
    setEmail('');
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#04101d', minHeight: '100vh' }}>
      <Toaster />
      <MiniDrawer />
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#04101d', color: '#94a0b8' }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2, fontWeight: 'bold', color: 'white' }}>
          Manage Admins
          <Link to="/add-admin">
            <Button variant="contained" color="primary" sx={{ float: 'right' }}>
              Add Admin
            </Button>
          </Link>
        </Typography>

        <Box sx={{ mt: 4 }}>
          <TableContainer component={Paper} sx={{ backgroundColor: '#1f2a38' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }}>Admin Name</TableCell>
                  <TableCell
                    onClick={() => handleSort('email')}
                    sx={{ cursor: 'pointer', color: 'white' }}
                  >
                    Email
                    {sortColumn === 'email' &&
                      (sortOrder === 'asc' ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {status === 'loading' ? (
                  Array.from(new Array(rowsPerPage)).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Skeleton variant="text" width="100%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" width="100%" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="rectangular" width={100} height={36} />
                      </TableCell>
                    </TableRow>
                  ))
                ) : admins.length > 0 ? (
                  admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell sx={{ color: 'white' }}>{admin.name}</TableCell>
                      <TableCell sx={{ color: 'white' }}>{admin.email}</TableCell>
                      <TableCell>
                        <IconButton color="primary">
                          <EditIcon sx={{ color: 'white' }} onClick={() => handleOpenModal(admin)} />
                        </IconButton>
                        <IconButton color="secondary">
                          <DeleteIcon sx={{ color: 'white' }} onClick={() => dispatch(deleteAdmin(admin._id))} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} sx={{ textAlign: 'center', color: 'white' }}>
                      No admins found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={admins.length} 
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Edit Admin</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              margin="dense"
              label="Email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleUpdateSubmit} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Admins;
