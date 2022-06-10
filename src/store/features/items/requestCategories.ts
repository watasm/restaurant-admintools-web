import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "services/axios"
import {addError} from "store/features/errors"
import {setCategories} from "store/features/items"
import {addLoading, removeLoading} from "store/features/loadings"

export const entry = "items/requestCategories"

export default createAsyncThunk(entry, async (_, {dispatch}) => {
  dispatch(addLoading(entry))

  const res = await axios.get("/categories").then(({data}) => data.data.map((i: any) => ({
    id: i.id,
    name: i.attributes.name,
    icon: i.attributes.icon
  }))).catch(() => {
    dispatch(addError({[entry]: "Something went wrong while load item categories"}))
    return []
  })

  if (res) {
    dispatch(setCategories(res))
  }

  dispatch(removeLoading(entry))
})
