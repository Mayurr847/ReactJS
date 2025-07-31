import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface FormState {
  firstname: string;
  lastname: string;
  dob: string;
  gender: string;
  email: string;
  course: string;
  password: string;
  checkbox: boolean;
  isAuthenticated: boolean; // ✅ new
}

const initialState: FormState = {
  firstname: '',
  lastname: '',
  dob: '',
  gender: '',
  email: '',
  course: '',
  password: '',
  checkbox: false,
  isAuthenticated: false, // ✅ new
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<Omit<FormState, 'isAuthenticated'>>) {
      return { ...state, ...action.payload };
    },
    setAuthenticated(state, action: PayloadAction<boolean>) {
      state.isAuthenticated = action.payload; // ✅ new
    }
  },
});

export const { setFormData,setAuthenticated } = formSlice.actions;
export default formSlice.reducer;
