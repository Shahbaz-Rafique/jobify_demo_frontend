import React, {useEffect,useState} from 'react';
import {
  Divider,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { Box } from '@mui/system';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useDispatch } from 'react-redux';
import {
  fetchJobs,
} from '../../Redux/JobSlice';

function JobFilter() {
  return (
    <Card
    sx={{ p: 3 }}
    style={{ backgroundColor: "#04101d", border: "1px solid #47536b", color: "#94a0b8" }}
  >
    <Typography variant="h6" gutterBottom sx={{ textAlign: 'left' }}>
      Filter
    </Typography>

    <Divider sx={{ bgcolor: '#47536b', height: '2px', mb: 2, mt: 2 }} />

    <Typography
      variant="body1"
      sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}
    >
      Date Posted
    </Typography>
    <FormControl fullWidth>
      <Select
        defaultValue="Anytime"
        sx={{
          border: '1px solid #47536b',
          borderRadius: '4px',
          color: "#47536b",
          height: '40px',
          mb: 2,
          '& .MuiSelect-select': {
            padding: '10px',
            height: '100%',
            textAlign: 'left',
            display: 'flex',
            alignItems: 'center',
            lineHeight: 'normal',
          },
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#47536b',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#47536b',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#47536b',
          },
        }}
      >
        <MenuItem value="Anytime">Anytime</MenuItem>
        <MenuItem value="Past 24 hours">Past 24 hours</MenuItem>
        <MenuItem value="Past week">Past week</MenuItem>
        <MenuItem value="Past month">Past month</MenuItem>
      </Select>
    </FormControl>

    <Divider sx={{ bgcolor: '#47536b', height: '2px', mb: 2, mt: 2 }} />

    {/* Job Type */}
    <Typography
      variant="body1"
      sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}
    >
      Job Type
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Checkbox defaultChecked style={{ color: "white" }} />}
          label="Full-time"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="Freelance"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="Internship"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="Volunteer"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
    </Grid>

    <Divider sx={{ bgcolor: '#47536b', height: '2px', mb: 2, mt: 2 }} />

    {/* Salary Range */}
    <Typography
      variant="body1"
      sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}
    >
      Salary Range
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Checkbox defaultChecked style={{ color: "white" }} />}
          label="Below $1000"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="$1000 to $2500"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="$2500 to $5000"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="Above $5000"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
    </Grid>

    <Divider sx={{ bgcolor: '#47536b', height: '2px', mb: 2, mt: 2 }} />

    {/* On site/Remote */}
    <Typography
      variant="body1"
      sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}
    >
      On site/Remote
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={<Checkbox defaultChecked style={{ color: "white" }} />}
          label="On Site"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="Remote"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          control={
            <Checkbox
              style={{ color: "white" }}
              sx={{
                '& .MuiSvgIcon-root': { borderColor: '#47536b' },
                '&.Mui-checked': { '& .MuiSvgIcon-root': { borderColor: '#47536b' } },
              }}
            />
          }
          label="Hybrid"
          sx={{ textAlign: 'left' }}
        />
      </Grid>
    </Grid>
  </Card>
  );
}

// Job Card Component
function JobCard({ logo, title, company, location, jobType, salary, urgency, posted, description }) {
  return (
    <Card sx={{ my: 2 }} style={{backgroundColor:"#051220",border:"1px solid #47536b"}}>
      <CardContent>
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={8}>
            <Box display="flex" alignItems="center">
              <img src={logo} alt="Company Logo" style={{ width: 50, height: 50, marginRight: 10 }} />
              <Box sx={{ textAlign: 'left',color:"white" }}>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="subtitle2">{company} <Typography 
                  variant="body2" 
                  sx={{
                    backgroundColor: "#ffe6c8",
                    display: 'inline',
                    padding: '2px 6px', 
                    borderRadius:"10px",
                    color:"#ff9228",
                    marginLeft:"5px"
                  }}
                >
                  {jobType}
                </Typography></Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>{description}</Typography>
            </Box>
            </Box>
          </Grid>
          <Grid item xs={4} textAlign="right" style={{ color: 'white' }}>
            <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <LocationOnIcon sx={{ marginRight: 1 }} />
              {location}
            </Typography>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>{posted} ago</Typography>
            <Typography variant="body2" sx={{ textAlign: 'right' }}>Salary: {salary}</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

// Main Job Listing Page Component
export default function JobListing() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [jobs,setJobs]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    fetchData();
  }, [dispatch, page, rowsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    const resultAction = await dispatch(fetchJobs({ page, limit: rowsPerPage }));
    if (fetchJobs.fulfilled.match(resultAction)) {
      setJobs(resultAction.payload);
      console.log(resultAction.payload);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ backgroundColor: '#051220', color: '#ffffff', minHeight: '100vh', pb: 5 }}>
      {/* Banner */}
      <Box sx={{ 
        backgroundColor: '#051220', 
        py: 5, 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        px: 5 
        }}>
            <Box sx={{ flex: 1, textAlign: 'left' }}>
                <Typography variant="h4" sx={{ color: '#fff', fontWeight:"bold" }}>Find Your Dream Job</Typography>
                <Typography variant="subtitle1" sx={{ color: '#dcdcdc' }}>Browse our latest job openings to view & apply to the best jobs today!</Typography>
            </Box>
            <Box sx={{ 
                flex: 1, 
                textAlign: 'right', 
                display: 'flex', 
                justifyContent: 'flex-end' 
            }}>
                <img 
                src="../Assets/banner.png" 
                alt="Banner Image" 
                style={{ 
                    width: '100%', 
                    height: 'auto', 
                    maxWidth: '500px', // Adjust this value as needed
                    objectFit: 'cover' // Ensures the image covers the container
                }} 
                />
            </Box>
        </Box>

        <center>
            <Box sx={{ backgroundColor: '#051220', color: '#ffffff', minHeight: '100vh', width:"90%", pb: 5 }}>
                <Grid container spacing={4} sx={{ pt: 10, px: 2 }}>
                    <Grid item xs={12} md={3}>
                    <JobFilter />
                    </Grid>

                    <Grid item xs={12} md={9}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Search job title or keyword"
                                sx={{
                                    mb: 3,
                                    backgroundColor: '#050e18',
                                    borderColor: '#47536b',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#47536b',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#47536b',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#47536b',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                label="Country or timezone"
                                sx={{
                                    mb: 3,
                                    backgroundColor: '#050e18',
                                    borderColor: '#47536b',
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: '#47536b',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#47536b',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: '#47536b',
                                        },
                                    },
                                    '& .MuiInputLabel-root': {
                                        color: 'white',
                                    },
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{
                                    mb: 3,
                                    backgroundColor: '#009b4c',
                                    '&:hover': {
                                        backgroundColor: '#007a3d',
                                    },
                                    height: '56px', 
                                    width: 'calc(100% - 16px)',
                                    maxWidth: 'calc(100% - 16px)', 
                                    textAlign: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                Find Jobs
                            </Button>
                        </Grid>
                    </Grid>

                    <Typography
                      variant="h6"
                      sx={{ textAlign: 'left', fontWeight: 'bold', mb: 2 }}
                    >
                      Jobs results
                    </Typography>

                    {jobs.map((job,index)=>(
                      <JobCard
                        logo={job.companyId.logo}
                        title={job.title}
                        company={job.companyId.name}
                        location={job.companyId.location}
                        jobType={job.jobType}
                        salary={job.salary}
                        urgency={job.urgency}
                        posted="5 mins"
                        description={job.description}
                      />
                    ))}
                    </Grid>
                </Grid>
            </Box>
        </center>
    </Box>
  );
}
