import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "services/axios"
import {addError} from "store/features/errors"
import {setItems} from "store/features/items"
import {addLoading, removeLoading} from "store/features/loadings"

export const entry = "items/requestItems"

export default createAsyncThunk(entry, async (_, {dispatch}) => {
  dispatch(addLoading(entry))

  const res = await axios.get("/items?populate=*").then(({data}) => data.data.map(({id, attributes}: any) => ({
    id: id,
    category: {
      id: attributes.category.data.id,
      name: attributes.category.data.attributes.name,
      icon: attributes.category.data.attributes.icon
    },
    name: attributes.name,
    image: attributes.image,
    price: attributes.price,
    description: attributes.description,
    cookingTime: attributes.cookingTime
  }))).catch(() => {
    dispatch(addError({[entry]: "Something went wrong while load items"}))
    return []
  })

  if (res) {
    dispatch(setItems(res))
  }

  dispatch(removeLoading(entry))
})
