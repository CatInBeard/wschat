import { createSlice } from '@reduxjs/toolkit'

const MessagesSlice = createSlice({
    name: 'values',
    initialState: {
        messages: []
    },
    reducers: {
        addMessage: (state, action) => {
            let message = action.payload
            const now = new Date();
            const options = {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
            const locale = navigator.language;
            message.date = new Intl.DateTimeFormat(locale, options).format(now);
            state.messages = [message, ...state.messages]
        }
    }
})

export const { addMessage } = MessagesSlice.actions
  
  export default MessagesSlice.reducer