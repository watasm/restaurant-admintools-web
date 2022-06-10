import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "services/axios"
import {addError} from "store/features/errors"
import {addLoading, removeLoading} from "store/features/loadings"

export const entry = "orders/requestUpdateOrder"

export default createAsyncThunk(entry, async ({orderId, data}: {
  orderId: string,
  data: Partial<Order>
}, {dispatch}) => {
  dispatch(addLoading(entry))

  await axios.put(`/orders/${orderId}`, {data: {...data}}).catch(() => {
    dispatch(addError({[entry]: "Incorrect order data"}))
    return {data: null}
  })

  dispatch(removeLoading(entry))
})
