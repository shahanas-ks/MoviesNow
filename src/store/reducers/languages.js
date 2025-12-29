// types.js
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  languagess: {}
};

// ==============================|| SLICE - MENU ||============================== //

const languages = createSlice({
  name: 'languages',
  initialState,
  reducers: {
    setlanguagesListData(state, action) {
      return {
        ...state,
        languagess: action.payload
      };
    },
    addlanguagesAction(state, action) {
      const languagesData = action.payload;
      // Push the new languages data to the existing languagess array
      const updatedlanguagess = [...state.languagess, languagesData];
      return {
        ...state,
        languagess: updatedlanguagess
      };
    },
    updatelanguagesAction(state, action) {
      const updatedlanguages = action.payload;
      const idToUpdate = updatedlanguages.id;
      const indexToUpdate = state.languagess.findIndex((languages) => languages.id === idToUpdate);
      if (indexToUpdate === -1) {
        return state;
      }
      const updatedlanguagess = [...state.languagess.slice(0, indexToUpdate), updatedlanguages, ...state.languagess.slice(indexToUpdate + 1)];

      return {
        ...state,
        languagess: updatedlanguagess
      };
    },

    deletelanguagesAction(state, action) {
      const id = action.payload.id;
      const updatedlanguagess = state.languagess.filter((languages) => languages.id != id);
      return {
        ...state,
        languagess: updatedlanguagess
      };
    }
  }
});

export default languages.reducer;

export const { setlanguagesListData, addlanguagesAction, updatelanguagesAction, deletelanguagesAction } = languages.actions;
