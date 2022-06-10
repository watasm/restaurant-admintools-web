import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import _ from "lodash"
import {useSelector} from "react-redux"
import {RootState} from "store"

type Loadings = string[]

const initialState: Loadings = []

const loadingsSlice = createSlice({
  name: "loadings",
  initialState,
  reducers: {
    addLoading(state, {payload}: PayloadAction<string>) {
      return _.uniq([...state, payload])
    },
    removeLoading(state, {payload}: PayloadAction<string>) {
      return state.filter(i => i !== payload)
    }
  }
})

export default loadingsSlice.reducer

export const useLoadings = (key: string) => {
  return useSelector<RootState, boolean>(({loadings}) => loadings.includes(key))
}

export const {addLoading, removeLoading} = loadingsSlice.actions
