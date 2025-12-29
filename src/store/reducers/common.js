// types.js
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  commonData: {}
};

// ==============================|| SLICE - MENU ||============================== //

const common = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setCommonViewData(state, action) {
      return {
        ...state,
        commonData: action.payload
      };
    }
  }
});

export default common.reducer;

export const { setCommonViewData } = common.actions;
