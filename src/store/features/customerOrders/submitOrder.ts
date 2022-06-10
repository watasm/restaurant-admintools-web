import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "services/axios"
import {updateOrder} from "store/features/customerOrders"
import {addError} from "store/features/errors"
import {addLoading, removeLoading} from "store/features/loadings"

export const entry = "orders/submitOrder"

export default createAsyncThunk(entry, async (customerOrder: Order, {dispatch}) => {
  dispatch(addLoading(entry))

  await axios.post("/orders", {data: {
    status: "sent",
    items: customerOrder.items.map(i => i.id),
    table: 4
  }}).then(({data}) => {
    dispatch(updateOrder({
      orderId: customerOrder.id,
      data: {status: "sent", id: data.data.id}
    }))
  }).catch(() => {
    dispatch(addError({[entry]: "Incorrect order data"}))
    return {data: null}
  })

  dispatch(removeLoading(entry))
})
