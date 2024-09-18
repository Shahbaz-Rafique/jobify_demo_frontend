import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import MiniDrawer from '../drawer/admin';
import { generateCompletion } from '../../Service/worker'; 
import { generateOutreach } from '../../Service/outreach';
import { fetchCompanies } from '../../Redux/CompanySlice';
import { addJob } from '../../Redux/JobSlice'; // Import the addJob action
import { useDispatch } from 'react-redux';

const AddJobPage = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [jobType, setJobType] = useState('');
  const [salary, setSalary] = useState('');
  const [urgency, setUrgency] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [company, setCompany] = useState([]);
  const [generatingOutreach, setGeneratingOutreach] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(100);

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

  useEffect(() => {
    const generatedDescription = ``;
    setDescription(generatedDescription);
  }, [title, location, jobType, salary, urgency]);

  const handleSubmit = async () => {
    const newJob = {
      title,
      location,
      jobType,
      salary,
      urgency,
      description,
      companyId: company, 
    };
 
    try {
      await dispatch(addJob(newJob)); 
      console.log('Job added successfully');
    } catch (error) {
      console.error('Error adding job:', error);
    }

    setTitle('');
    setLocation('');
    setJobType('');
    setSalary('');
    setUrgency('');
    setDescription('');
  };

  const handleAIDescription = async () => {
    setGenerating(true);
    const aiGeneratedDescription = await generateCompletion(title, location, jobType, salary, urgency, company);
    setDescription(aiGeneratedDescription);
    setGenerating(false);
  };

  const handleOutreach = async () => {
    setGeneratingOutreach(true);
    const aiOutReach = await generateOutreach(title, location, jobType, salary, urgency, company);
    setMessage(aiOutReach);
    setGeneratingOutreach(false);
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
          Create Job
        </Typography>

        {/* Job Form */}
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{
                  backgroundColor: '#1f2a38',
                  borderRadius: 1,
                }}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                sx={{
                  backgroundColor: '#1f2a38',
                  borderRadius: 1,
                }}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#ffffff' }}>Job Type</InputLabel>
                <Select
                  value={jobType}
                  onChange={(e) => setJobType(e.target.value)}
                  label="Job Type"
                  sx={{
                    backgroundColor: '#1f2a38',
                    borderRadius: 1,
                    color: '#ffffff',
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#1f2a38',
                        color: '#ffffff',
                      },
                    },
                  }}
                >
                  <MenuItem value="Full-Time">Full-Time</MenuItem>
                  <MenuItem value="Part-Time">Part-Time</MenuItem>
                  <MenuItem value="Contract">Contract</MenuItem>
                  <MenuItem value="Internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                <InputLabel sx={{ color: '#ffffff' }}>Salary</InputLabel>
                <Select
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  label="Job Type"
                  sx={{
                    backgroundColor: '#1f2a38',
                    borderRadius: 1,
                    color: '#ffffff',
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#1f2a38',
                        color: '#ffffff',
                      },
                    },
                  }}
                >
                  <MenuItem value="Below 1000$">Below 1000$</MenuItem>
                  <MenuItem value="1000-2500$">1000-2500$</MenuItem>
                  <MenuItem value="2500-5000$">2500-5000$</MenuItem>
                  <MenuItem value="Above 5000$">Above 5000$</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#ffffff' }}>Urgency</InputLabel>
                <Select
                  value={urgency}
                  onChange={(e) => setUrgency(e.target.value)}
                  label="Urgency"
                  sx={{
                    backgroundColor: '#1f2a38',
                    borderRadius: 1,
                    color: '#ffffff',
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#1f2a38',
                        color: '#ffffff',
                      },
                    },
                  }}
                >
                  <MenuItem value="High">High</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Low">Low</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel sx={{ color: '#ffffff' }}>Company</InputLabel>
                <Select
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  label="Urgency"
                  sx={{
                    backgroundColor: '#1f2a38',
                    borderRadius: 1,
                    color: '#ffffff',
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#1f2a38',
                        color: '#ffffff',
                      },
                    },
                  }}
                >
                  {companies.map((item,index)=>(  
                    <MenuItem value={item._id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Job Description"
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  backgroundColor: '#1f2a38',
                  borderRadius: 1,
                }}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
            </Grid>

            <Box
              sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '15px' }}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  mt: 2,
                  borderRadius: 1,
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  alignSelf: 'flex-start',
                }}
                onClick={handleAIDescription}
              >
               {generating?'Genarating...':'Generate AI Description'} 
              </Button>
            </Box>

            {/* Outreach Message */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Outreach Message"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  backgroundColor: '#1f2a38',
                  borderRadius: 1,
                }}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
            </Grid>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-start', marginLeft: '15px' }}
            >
              <Button
                variant="outlined"
                color="secondary"
                sx={{
                  mt: 2,
                  borderRadius: 1,
                  color: '#ffffff',
                  borderColor: '#ffffff',
                  alignSelf: 'flex-start',
                }}
                onClick={handleOutreach}
              >
                {generatingOutreach?'Generating...':'Generate AI Outreach Message'}
              </Button>
            </Box>
          </Grid>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, backgroundColor: '#1976d2', borderRadius: 1 }}
            onClick={handleSubmit}
          >
            Add Job
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AddJobPage;
