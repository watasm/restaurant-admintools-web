import {configureStore} from "@reduxjs/toolkit"
import {useDispatch as useDispatch_UNTYPED} from "react-redux"
import loadings from "./features/loadings"
import errors from "./features/errors"
import user from "./features/user"
import items from "./features/items"
import customerOrders from "./features/customerOrders"

const store = configureStore({
  reducer: {
    loadings,
    errors,
    user,
    items,
    customerOrders
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch = () => useDispatch_UNTYPED<AppDispatch>()

export default store
