import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '@/redux/slices/productsSlice'

export const store = configureStore({
  reducer: {
    products: productsReducer
  }
})