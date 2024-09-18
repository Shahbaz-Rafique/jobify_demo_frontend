import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

// Async thunk to fetch admins
export const fetchAdmins = createAsyncThunk(
  'admins/fetchAdmins',
  async ({ page, limit }) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/superadmin/getAdmins?page=${page}&limit=${limit}`, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.data;
  }
);

// Async thunk to update an admin
export const updateAdmin = createAsyncThunk(
  'admins/updateAdmin',
  async ({ id, name, email }) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/superadmin/updateAdmin?id=${id}`, { name, email }, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  }
);

// Async thunk to delete an admin
export const deleteAdmin = createAsyncThunk(
  'admins/deleteAdmin',
  async (id) => {
    await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/superadmin/deleteAdmin?id=${id}`, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return id;
  }
);

// Async thunk to add an admin
export const addAdmin = createAsyncThunk(
  'admins/addAdmin',
  async ({ name, email }) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/superadmin/addAdmin`, { name, email }, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data; 
  }
);

const adminSlice = createSlice({
  name: 'admins',
  initialState: {
    admins: [],
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
      .addCase(fetchAdmins.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAdmins.fulfilled, (state, action) => {
        console.log(action.payload);
        state.status = 'succeeded';
        state.admins = action.payload;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchAdmins.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateAdmin.fulfilled, (state, action) => {
        const index = state.admins.findIndex((admin) => admin._id === action.payload._id);
        if (index !== -1) {
          state.admins[index] = action.payload;
        }
      })
      .addCase(deleteAdmin.fulfilled, (state, action) => {
        state.admins = state.admins.filter((admin) => admin._id !== action.payload);
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.admins.push(action.payload); 
      });
  },
});

export const { setPage, setRowsPerPage } = adminSlice.actions;
export default adminSlice.reducer;
