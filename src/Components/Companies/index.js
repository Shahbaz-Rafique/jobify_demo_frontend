import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Skeleton,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Link } from 'react-router-dom';
import MiniDrawer from '../drawer/admin';
import UploadIcon from '@mui/icons-material/Upload';
import { useDispatch } from 'react-redux';
import {
  fetchCompanies,
  deleteCompany,
  updateCompany,
} from '../../Redux/CompanySlice';

const Companies = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [companyToDelete, setCompanyToDelete] = useState(null);
  const [editingCompany, setEditingCompany] = useState(null);
  const [logoError, setLogoError] = useState('');
  const [logo, setLogo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [dispatch, page, rowsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    const resultAction = await dispatch(fetchCompanies({ page, limit: rowsPerPage }));
    if (fetchCompanies.fulfilled.match(resultAction)) {
      setCompanies(resultAction.payload);
    }
    setLoading(false);
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setLogoError('File size exceeds 1MB.');
        setLogo(null);
      } else {
        setLogoError('');
        setLogo(file);
      }
    }
  };

  const filteredCompanies = companies
    .filter(company => company.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                       (filterLocation ? company.location.toLowerCase().includes(filterLocation.toLowerCase()) : true))
    .sort((a, b) => {
      if (sortColumn) {
        const aValue = a[sortColumn].toString().toLowerCase();
        const bValue = b[sortColumn].toString().toLowerCase();
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleChangePage = (event, newPage) => {
    dispatch(setPage(newPage));
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(setRowsPerPage(parseInt(event.target.value, 10)));
    dispatch(setPage(0));
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleDelete = async () => {
    const resultAction = await dispatch(deleteCompany(companyToDelete));
    console.log(resultAction);
    if (deleteCompany.fulfilled.match(resultAction)) {
      setCompanies(companies.filter(company => company.id !== companyToDelete));
      setDeleteDialogOpen(false);
      fetchData();
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    setEditDialogOpen(true);
    fetchData();
  };

  const handleUpdate = async () => {
    const resultAction = await dispatch(updateCompany(editingCompany));
    if (updateCompany.fulfilled.match(resultAction)) {
      setCompanies(companies.map(company => company._id === editingCompany._id ? editingCompany : company));
      setEditDialogOpen(false);
      setEditingCompany(null);
    }
  };

  return (
    <Box sx={{ display: 'flex', backgroundColor: '#04101d', minHeight: '100vh' }}>
      <MiniDrawer
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'black',
          },
        }}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: '#04101d',
          color: '#94a0b8',
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            mb: 2,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'left',
          }}
        >
          Manage Companies
          <Link to="/add-company">
            <Button
              variant="contained"
              color="primary"
              sx={{ float: 'right' }}
            >
              Add Company
            </Button>
          </Link>
        </Typography>

        {/* Search and Filter */}
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Search Companies"
                variant="outlined"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: '#1f2a38',
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Filter by Location"
                variant="outlined"
                value={filterLocation}
                onChange={(e) => setFilterLocation(e.target.value)}
                sx={{
                  mb: 2,
                  backgroundColor: '#1f2a38',
                  '& .MuiInputBase-input': {
                    color: 'white',
                  },
                  '& .MuiInputLabel-root': {
                    color: 'white',
                  },
                }}
                InputLabelProps={{ style: { color: 'white' } }}
                InputProps={{ style: { color: 'white' } }}
              />
            </Grid>
          </Grid>

          {/* Companies Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#1f2a38' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ color: 'white' }} onClick={() => handleSort('logo')}>
                    Logo {sortColumn === 'logo' && (sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }} onClick={() => handleSort('name')}>
                    Name {sortColumn === 'name' && (sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }} onClick={() => handleSort('location')}>
                    Location {sortColumn === 'location' && (sortOrder === 'asc' ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />)}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
                  Array.from({ length: rowsPerPage }).map((_, index) => (
                    <TableRow key={index}>
                      <TableCell><Skeleton /></TableCell>
                      <TableCell><Skeleton /></TableCell>
                      <TableCell><Skeleton /></TableCell>
                      <TableCell><Skeleton /></TableCell>
                    </TableRow>
                  ))
                ) : (
                  filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell sx={{ color: 'white' }}><img src={company.logo} style={{width:"100px",height:"100px"}}/></TableCell>
                      <TableCell sx={{ color: 'white' }}>{company.name}</TableCell>
                      <TableCell sx={{ color: 'white' }}>{company.location}</TableCell>
                      <TableCell>
                        <IconButton 
                          component={Link} 
                          style={{color:"white"}}
                          onClick={() => handleEdit(company)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton 
                          style={{color:"white"}} 
                          onClick={() => {
                            setCompanyToDelete(company);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50]}
            component="div"
            count={companies.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ color: 'white' }}
          />
        </Box>

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Confirm Deletion</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to delete this company?
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleDelete}
              color="error"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Edit Company Dialog */}
        <Dialog
          open={editDialogOpen}
          onClose={() => setEditDialogOpen(false)}
        >
          <DialogTitle>Edit Company</DialogTitle>
          <DialogContent>
            {editingCompany && (
              <Box>
                <TextField
                  fullWidth
                  label="Company Name"
                  variant="outlined"
                  value={editingCompany.name}
                  onChange={(e) => setEditingCompany({ ...editingCompany, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Location"
                  variant="outlined"
                  value={editingCompany.location}
                  onChange={(e) => setEditingCompany({ ...editingCompany, location: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="outlined"
                  component="label"
                  color="secondary"
                  startIcon={<UploadIcon />}
                  sx={{
                    backgroundColor: '#white',
                    borderRadius: 1,
                    color: '#2a3b50',
                    width: '100%',
                    height: 56, 
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                    borderColor: '#2a3b50', 
                    borderWidth: 1, 
                  }}
                >
                  Upload Logo
                  <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handleLogoChange}
                  />
                </Button>
                {logoError && <Typography sx={{ color: 'red', mt: 1 }}>{logoError}</Typography>}
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button
              onClick={handleUpdate}
              color="primary"
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default Companies;
