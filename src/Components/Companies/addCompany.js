import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import MiniDrawer from '../drawer/admin';
import UploadIcon from '@mui/icons-material/Upload';
import {addCompany, uploadLogo } from '../../Redux/CompanySlice';
import toast,{Toaster} from 'react-hot-toast';

const AddCompanyPage = () => {
  const [logo, setLogo] = useState(null);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [logoError, setLogoError] = useState('');
  const dispatch = useDispatch();

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

  const handleSubmit = async () => {
    if (logo && name && location) {
      try {
        const logoUrl = await dispatch(uploadLogo(logo)).unwrap();
        
        await dispatch(addCompany({ name, location, logoUrl })).unwrap();
        toast.success('Company Added');
        setLogo(null);
        setName('');
        setLocation('');
        setLogoError('');
      } catch (error) {
        console.error('Error adding company:', error.message);
      }
    } else {
      console.log('Please fill all fields and upload a valid logo.');
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
          Add Company
        </Typography>

        {/* Company Form */}
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                }}
              >
                <Button
                  variant="outlined"
                  component="label"
                  color="secondary"
                  startIcon={<UploadIcon />}
                  sx={{
                    backgroundColor: '#1f2a38',
                    borderRadius: 1,
                    color: '#ffffff',
                    width: '100%',
                    height: 56, 
                    textAlign: 'left',
                    justifyContent: 'flex-start',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      backgroundColor: '#2a3b50',
                    },
                    borderColor: 'transparent',
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
                {logo && (
                  <Box
                    component="img"
                    src={URL.createObjectURL(logo)}
                    alt="Company Logo"
                    sx={{
                      mt: 2,
                      width: 100,
                      height: 100,
                      borderRadius: 1,
                      objectFit: 'cover',
                    }}
                  />
                )}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  backgroundColor: '#1f2a38',
                  borderRadius: 1,
                  height: 56, // Match the height of the Button
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
                  height: 56, // Match the height of the Button
                }}
                InputLabelProps={{
                  style: { color: '#ffffff' },
                }}
                InputProps={{
                  style: { color: '#ffffff' },
                }}
              />
            </Grid>
          </Grid>

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, backgroundColor: '#1976d2', borderRadius: 1 }}
            onClick={handleSubmit}
          >
            Add Company
          </Button>
        </Box>
      </Box>

      <Toaster/>
    </Box>
  );
};

export default AddCompanyPage;
