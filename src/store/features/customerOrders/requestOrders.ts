import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "services/axios"
import {setOrders} from "store/features/customerOrders/index"
import {addError} from "store/features/errors"
import {addLoading, removeLoading} from "store/features/loadings"
import {RootState} from "store"

export const entry = "customerOrders/requestOrders"

type Params = {
  loading?: boolean
} | undefined

export default createAsyncThunk<void, Params>(entry, async (params = {
  loading: true
}, {dispatch, getState}) => {
  if (!params.loading) {
    dispatch(addLoading(entry))
  }

  const res = await axios.get("/orders?populate=table,items,items.category&filters[status][$ne]=completed", {
    headers: {
      "Authorization": `Bearer ${(getState() as RootState).user.token}`
    }
  }).then(({data}) => data.data.map(({id, attributes}: any) => {
    return {
      id: id,
      table: attributes.table.data.attributes,
      items: attributes.items.data.map((i: any) => ({
        id: i.id,
        category: {
          id: i.attributes.category.data.id,
          name: i.attributes.category.data.attributes.name,
          icon: i.attributes.category.data.attributes.icon
        },
        name: i.attributes.name,
        image: i.attributes.image,
        price: i.attributes.price,
        description: i.attributes.description,
        cookingTime: i.attributes.cookingTime
      })),
      status: attributes.status,
      dateCreated: attributes.createdAt
    }
  })).catch(() => {
    dispatch(addError({[entry]: "Something went wrong while load orders"}))
    return []
  })

  if (res) {
    dispatch(setOrders(res))
  }

  dispatch(removeLoading(entry))
})
