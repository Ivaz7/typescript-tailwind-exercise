import { createSlice } from "@reduxjs/toolkit";

interface userData {
  idRoom: string;
  userName: string;
}

const initialState: userData = {
  idRoom: sessionStorage.getItem("idRoom") || "",
  userName: sessionStorage.getItem("userName") || "",
};

export const userDataSlice = createSlice({
  name: "userDataSlice",
  initialState,
  reducers: {
    setIdRoom: (state, action: { payload: string }) => {
      sessionStorage.setItem("idRoom", action.payload);
      state.idRoom = action.payload;
    },
    setDeleteIdRoom: (State) => {
      sessionStorage.removeItem("idRoom");
      State.idRoom = "";
    },
    setUserName: (state, action: { payload: string }) => {
      sessionStorage.setItem("userName", action.payload);
      state.userName = action.payload;
    },
    setDeleteUserName: (State) => {
      sessionStorage.removeItem("userName");
      State.userName = "";
    }
  },
});

export const { setIdRoom, setDeleteIdRoom, setUserName, setDeleteUserName } = userDataSlice.actions;

export default userDataSlice.reducer;
