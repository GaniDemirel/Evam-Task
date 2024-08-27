import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  message: string;
  isVisible: boolean;
}

const initialState: NotificationState = {
  message: "",
  isVisible: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isVisible = true;
    },
    hideNotification: (state) => {
      state.isVisible = false;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
