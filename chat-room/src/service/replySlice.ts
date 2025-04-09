import { createSlice } from "@reduxjs/toolkit";

export interface Reply {
  id: string;
  message: string;
  username: string;
}

interface MessageState {
  reply: Reply;
}

const initialState: MessageState = {
  reply: {
    id: "",
    message: "",
    username: "",
  },
};

export const replySlice = createSlice({
  name: "replySlice",
  initialState,
  reducers: {
    setReply: (state, action: { payload: Reply }) => {
      const { id, message, username } = action.payload;

      state.reply.id = id;
      state.reply.message = message;
      state.reply.username = username;
    },
    setDeleteReply: (state) => {
      state.reply.id = "";
      state.reply.message = "";
      state.reply.username = "";
    },
  }
})

export const { setReply } = replySlice.actions;

export default replySlice.reducer;
