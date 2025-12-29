// types.js
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  users: {}
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserListData(state, action) {
      return {
        ...state,
        users: action.payload
      };
    }
  }
});

export default user.reducer;

export const { setUserListData } = user.actions;
