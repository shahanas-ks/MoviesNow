// types.js
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  bookings: {}
};
// ==============================|| SLICE - MENU ||============================== //

const booking = createSlice({
    name: 'booking',
    initialState,
    reducers: {
      setBookingListData(state, action) {
        return {
          ...state,
          bookings: action.payload
        };
      },
     
    }
})
export default booking.reducer;

export const { setBookingListData } = booking.actions;