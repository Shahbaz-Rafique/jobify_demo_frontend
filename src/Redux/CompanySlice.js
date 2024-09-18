import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

export const uploadLogo = createAsyncThunk(
  'companies/uploadLogo',
  async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dge3lt4u6/image/upload',
      formData
    );
    return response.data.secure_url;
  }
);

export const fetchCompanies = createAsyncThunk(
  'companies/fetchCompanies',
  async ({ page, limit }) => {
    const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/getCompanies?page=${page}&limit=${limit}`, {
      headers: {
        'api-key': process.env.REACT_APP_API_KEY,
        'authorization': `Bearer ${Cookies.get('token')}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data.companies; 
  }
);

export const addCompany = createAsyncThunk(
  'companies/addCompany',
  async ({ name, location, logoUrl }) => {
    const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/addCompany`, 
      { name, location, logo: logoUrl }, 
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

export const deleteCompany = createAsyncThunk(
    'companies/deleteCompany',
    async (company) => {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/admin/deleteCompany?id=${company._id}`, {
        headers: {
          'api-key': process.env.REACT_APP_API_KEY,
          'authorization': `Bearer ${Cookies.get('token')}`,
          'Content-Type': 'application/json'
        }
      });
      return company._id; 
    }
  );

  export const updateCompany = createAsyncThunk(
    'companies/editCompany',
    async (company) => {
      let logoUrl = company.logoFile ? await uploadLogo(company.logoFile) : null;
  
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/admin/editCompany?id=${company._id}`,
        {
          id: company._id, 
          name: company.name, 
          location: company.location, 
          logo: logoUrl ? logoUrl.payload : company.logoUrl 
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

const companySlice = createSlice({
  name: 'companies',
  initialState: {
    companies: [],
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
      .addCase(uploadLogo.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(uploadLogo.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(uploadLogo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchCompanies.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompanies.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = action.payload.companies;
        state.hasMore = action.payload.hasMore;
      })
      .addCase(fetchCompanies.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies.push(action.payload);
      })
      .addCase(addCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companies = state.companies.filter(company => company._id !== action.payload);
      })
      .addCase(deleteCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.companies.findIndex(company => company._id === action.payload.id);
        if (index >= 0) {
          state.companies[index] = action.payload;
        }
      })
      .addCase(updateCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },  
});

export const { setPage, setRowsPerPage } = companySlice.actions;
export default companySlice.reducer;
