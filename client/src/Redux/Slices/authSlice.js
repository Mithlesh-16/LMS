import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import axiosInstance from '../../helpers/axiosInstance';

const initialState = {
  isLoggedIn: localStorage.getItem('isLoggedIn') === 'true' || false,
  role: localStorage.getItem('role') || '',
  data: (() => {
    try {
      return JSON.parse(localStorage.getItem('data')) || {};
    } catch (e) {
      return {};
    }
  })(),
};

export const createAccount = createAsyncThunk('/auth/signup', async (data, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post('users/register', data);
    toast.promise(res, {
      loading: 'wait!! creating your account',
      success: (resData) => resData?.data?.message,
      error: 'Failed to create Account',
    });
    return (await res).data;
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return rejectWithValue(e?.response?.data);
  }
});

export const login = createAsyncThunk('/auth/login', async (data, { rejectWithValue }) => {
  try {
    const res = axiosInstance.post('users/login', data);
    toast.promise(res, {
      loading: 'wait!! while logging in',
      success: (resData) => resData?.data?.message,
      error: 'Failed to login',
    });
    return (await res).data;
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return rejectWithValue(e?.response?.data);
  }
});

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (data, { rejectWithValue }) => {
    try {
      const res = axiosInstance.post('users/profile-update', data);
      toast.promise(res, {
        loading: 'wait!! Profile Updation in progress',
        success: (resData) => resData?.data?.message,
        error: 'Failed to Update Profile',
      });
      return (await res).data;
    } catch (e) {
      toast.error(e?.response?.data?.message);
      return rejectWithValue(e?.response?.data);
    }
  }
);

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    const res = axiosInstance.get('users/logout');
    toast.promise(res, {
      loading: 'wait!! logout in progress..',
      success: (resData) => resData?.data?.message,
      error: 'Failed to log out!!',
    });
    return (await res).data;
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return rejectWithValue(e?.response?.data);
  }
});

export const getUserData = createAsyncThunk('user/details', async (_, { rejectWithValue }) => {
  try {
    const res = axiosInstance.get('/users/profile');
    const updatedUser = (await res)?.data;
    console.log("updatedUser: ", updatedUser);
    return updatedUser;
  } catch (e) {
    toast.error(e?.response?.data?.message);
    return rejectWithValue(e?.response?.data);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    const setAuthUser = (state, user) => {
      if (!user) return;
      localStorage.setItem('data', JSON.stringify(user));
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('role', user.role);
      state.isLoggedIn = true;
      state.data = user;
      state.role = user.role;
    };

    builder
      .addCase(login.fulfilled, (state, action) => {
        setAuthUser(state, action?.payload?.userExists);
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        setAuthUser(state, action?.payload?.user);
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isLoggedIn = false;
        state.data = {};
        state.role = '';
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        console.log("fulfilled Payload getUserData: ", action?.payload);
        setAuthUser(state, action?.payload?.users);
      });
  },
});

export default authSlice.reducer;