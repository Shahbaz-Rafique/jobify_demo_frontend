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
  InputLabel,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import {Link} from 'react-router-dom';
import MiniDrawer from '../drawer/admin';
import { useDispatch } from 'react-redux';
import {
  fetchJobs,
} from '../../Redux/JobSlice';

const JobPostingForm = () => {
  const [showAddJobForm, setShowAddJobForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterJobType, setFilterJobType] = useState('');
  const [filterUrgency, setFilterUrgency] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [jobs,setJobs]=useState([]);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    fetchData();
  }, [dispatch, page, rowsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    const resultAction = await dispatch(fetchJobs({ page, limit: rowsPerPage }));
    if (fetchJobs.fulfilled.match(resultAction)) {
      setJobs(resultAction.payload);
    }
    setLoading(false);
  };

  // Search, filter, and sort logic
  const filteredJobs = jobs
    .filter(job => job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                   (filterJobType ? job.jobType === filterJobType : true) &&
                   (filterUrgency ? job.urgency === filterUrgency : true))
    .sort((a, b) => {
      if (sortColumn) {
        const aValue = a[sortColumn].toString().toLowerCase();
        const bValue = b[sortColumn].toString().toLowerCase();
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const handleAddJobClick = () => {
    setShowAddJobForm(!showAddJobForm);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
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
          Manage Jobs
          <Link to="/post-job">
            <Button
              variant="contained"
              color="primary"
              sx={{ float: 'right' }}
            >
              Add Job
            </Button>
          </Link>
        </Typography>

        {/* Search, Filter, and Sort */}
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search Jobs"
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
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="filter-job-type-label" sx={{ color: 'white' }}>Job Type</InputLabel>
                <Select
                  labelId="filter-job-type-label"
                  value={filterJobType}
                  onChange={(e) => setFilterJobType(e.target.value)}
                  sx={{ color: 'white', backgroundColor: '#1f2a38' }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="Full-Time">Full-Time</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="filter-urgency-label" sx={{ color: 'white' }}>Urgency</InputLabel>
                <Select
                  labelId="filter-urgency-label"
                  value={filterUrgency}
                  onChange={(e) => setFilterUrgency(e.target.value)}
                  sx={{ color: 'white', backgroundColor: '#1f2a38' }}
                >
                  <MenuItem value="">All</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          {/* Job Listings Table */}
          <TableContainer component={Paper} sx={{ backgroundColor: '#1f2a38' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    onClick={() => handleSort('title')}
                    sx={{ cursor: 'pointer', color: 'white' }}
                  >
                    Title
                    {sortColumn === 'title' && (sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort('location')}
                    sx={{ cursor: 'pointer', color: 'white' }}
                  >
                    Location
                    {sortColumn === 'location' && (sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort('jobType')}
                    sx={{ cursor: 'pointer', color: 'white' }}
                  >
                    Job Type
                    {sortColumn === 'jobType' && (sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort('salary')}
                    sx={{ cursor: 'pointer', color: 'white' }}
                  >
                    Salary
                    {sortColumn === 'salary' && (sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                  </TableCell>
                  <TableCell
                    onClick={() => handleSort('urgency')}
                    sx={{ cursor: 'pointer', color: 'white' }}
                  >
                    Urgency
                    {sortColumn === 'urgency' && (sortOrder === 'asc' ? <ArrowUpwardIcon fontSize="small" /> : <ArrowDownwardIcon fontSize="small" />)}
                  </TableCell>
                  <TableCell sx={{ color: 'white' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredJobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell sx={{ color: 'white' }}>{job.title}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{job.location}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{job.jobType}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{job.salary}</TableCell>
                    <TableCell sx={{ color: 'white' }}>{job.urgency}</TableCell>
                    <TableCell>
                      <IconButton color="primary">
                        <EditIcon sx={{ color: 'white' }} />
                      </IconButton>
                      <IconButton color="secondary">
                        <DeleteIcon sx={{ color: 'white' }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default JobPostingForm;
