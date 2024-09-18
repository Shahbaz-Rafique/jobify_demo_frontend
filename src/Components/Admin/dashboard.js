import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import MiniDrawer from '../drawer/admin'; 

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        backgroundColor: '#04101d', 
      }}
    >
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
          color: '#94a0b8', 
        }}
      >
        <Typography variant="h5" style={{fontWeight:"bold",color:"white"}} textAlign={"left"} gutterBottom sx={{ mb: 2 }}>
          Dashboard
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#242a37', 
                color: 'white', 
              }}
            >
              <Typography variant="h6">Total Jobs Posted</Typography>
              <Typography variant="h4">120</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#242a37',
                color: 'white',
              }}
            >
              <Typography variant="h6">Applications Received</Typography>
              <Typography variant="h4">350</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                backgroundColor: '#242a37',
                color: 'white',
              }}
            >
              <Typography variant="h6">Pending Reviews</Typography>
              <Typography variant="h4">20</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
