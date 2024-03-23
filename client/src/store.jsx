import { configureStore } from '@reduxjs/toolkit'
import MessagesSlice from './reducers/messages.jsx'

export default configureStore({
  reducer: {
    messages: MessagesSlice,
  },
})