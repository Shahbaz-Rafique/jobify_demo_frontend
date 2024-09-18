import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({ page, limit }) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/getJobs?page=${page}&limit=${limit}`, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.jobs;
  }
);

export const addJob = createAsyncThunk(
  'jobs/addJob',
  async ({ title, location, jobType, salary, urgency, description, companyId }) => {
    console.log(title,description);
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/addJob`, 
      { title, companyId, jobType, salary, urgency, location, description }, 
      {
        headers: {
          'api-key': process.env.REACT_APP_API_KEY,
          'authorization': `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  }
);

// Async thunk to delete a job
export const deleteJob = createAsyncThunk(
  'jobs/deleteJob',
  async (job) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/deleteJob?id=${job._id}`, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return job._id;
  }
);

// Async thunk to update a job
export const updateJob = createAsyncThunk(
  'jobs/updateJob',
  async (job) => {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/api/v1/admin/updateJob?id=${job._id}`,
      {
        jobTitle: job.jobTitle,
        companyId: job.companyId,
        jobType: job.jobType,
        salary: job.salary,
        urgency: job.urgency,
        location: job.location,
        jobDescription: job.jobDescription,
      },
      {
        headers: {
          'api-key': process.env.REACT_APP_API_KEY,
          'authorization': `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  }
);

const jobSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobs: [],
    status: 'idle',
    error: null,
    hasMore: true,
    page: 0,
    rowsPerPage: 10,
  },
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setRowsPerPage: (state, action) => {
      state.rowsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload.jobs;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = state.jobs.filter(job => job._id !== action.payload);
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateJob.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.jobs.findIndex(job => job._id === action.payload.id);
        if (index >= 0) {
          state.jobs[index] = action.payload;
        }
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },  
});

export const { setPage, setRowsPerPage } = jobSlice.actions;
export default jobSlice.reducer;
