// types.js
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  routings: []
};
// ==============================|| SLICE - MENU ||============================== //

const routing = createSlice({
    name: 'routing',
    initialState,
    reducers: {
      setRoutingListData(state, action) {
        return {
          ...state,
          routings: action.payload
        };
      },
      addRouteAction(state, action) {
        const routeData = action.payload;
        // Push the new route data to the existing vehicles array
        const updatedRoute = [routeData, ...state.routings];
        return {
          ...state,
          routings: updatedRoute
        };
      },
      deleteRouteAction(state, action) {
        const id = action.payload.id;
        const updatedRoute = state.routings.filter((item) => item.id != id);
        return {
          ...state,
          routings: updatedRoute
        };
      },
      updateRouteAction(state, action) {
        const updatedRoute = action.payload;
        const idToUpdate = updatedRoute.id;
  
        // Find the index of the vehicle with the specified ID
        const indexToUpdate = state.routings.findIndex((item) => item.id === idToUpdate);
  
        // If the vehicle with the specified ID is not found, return the current state
        if (indexToUpdate === -1) {
          return state;
        }
  
        // Replace the existing vehicle data with the updated data
        const updatedRoutes = [
          ...state.routings.slice(0, indexToUpdate), // Elements before the updated vehicle
          updatedRoute, // Updated vehicle
          ...state.routings.slice(indexToUpdate + 1) // Elements after the updated vehicle
        ];
  
        return {
          ...state,
          routings: updatedRoutes
        };
      },
     
    }
})
export default routing.reducer;

export const { setRoutingListData,addRouteAction,deleteRouteAction,updateRouteAction } = routing.actions;