import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contactList: [],
  contactData: {},
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContactListData: (state, action) => {
      state.contactList = action.payload;
    },
    setContactData: (state, action) => {
      state.contactData = action.payload;
    },
  },
});

export const { setContactListData, setContactData } = contactsSlice.actions;

export default contactsSlice.reducer;
