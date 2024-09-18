import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, TextField, Typography, Grid } from '@mui/material';
import MiniDrawer from '../drawer/superadmin';
import { addAdmin } from '../../Redux/AdminSlice'; 
import toast, { Toaster } from 'react-hot-toast';

const AddAdminPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (name && email) {
      const userData = { name, email };
      try {
        await dispatch(addAdmin(userData)).unwrap();
        toast.success('Admin added');
        setName('');
        setEmail('');
      } catch (error) {
        console.error('Error adding admin:', error.message);
        toast.error('Error adding admin');
      }
    } else {
      console.log('Please fill all fields.');
      toast.error('Please fill all fields.');
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
          Add Admin
        </Typography>

        {/* Admin Form */}
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Admin Name"
                variant="outlined"
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{
                  backgroundColor: '#1f2a38',
                  borderRadius: 1,
                  height: 56,
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
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: '#1f2a38',
                  borderRadius: 1,
                  height: 56,
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

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, backgroundColor: '#1976d2', borderRadius: 1 }}
            onClick={handleSubmit}
          >
            Add Admin
          </Button>
        </Box>
      </Box>

      <Toaster />
    </Box>
  );
};

export default AddAdminPage;
