import { createSlice } from '@reduxjs/toolkit'

const MessagesSlice = createSlice({
    name: 'values',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) => {
            state.messages = [action.payload, ...state.messages]
        }
    }
})

export const { addMessage } = MessagesSlice.actions
  
  export default MessagesSlice.reducer