// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  users: {}
};

// ==============================|| SLICE - MENU ||============================== //

const login = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginData(state, action) {
      return {
        ...state,
        users: action.payload
      };
    }
  }
});

export default login.reducer;

export const { setLoginData } = login.actions;
