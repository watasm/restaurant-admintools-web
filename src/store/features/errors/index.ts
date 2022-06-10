import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import {RootState} from "store"

type Errors = { [key: string]: string }

const initialState: Errors = {}

const errorsSlice = createSlice({
  name: "errors",
  initialState,
  reducers: {
    addError(state, {payload}: PayloadAction<Errors>) {
      const errorKey = Object.keys(payload)[0]

      const newErrors = {...state}
      newErrors[errorKey] = payload[errorKey]

      return newErrors
    },
    removeError(state, {payload}: PayloadAction<string>) {
      const newErrors = {...state}
      delete newErrors[payload]

      return newErrors
    }
  }
})

export default errorsSlice.reducer

export const useErrors = (key: string) => {
  return useSelector<RootState, string | undefined>(({errors}) => errors[key])
}

export const {addError, removeError} = errorsSlice.actions
