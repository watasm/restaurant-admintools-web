import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import {RootState} from "store"
import requestCategories from "store/features/items/requestCategories"
import requestItems from "store/features/items/requestItems"

type Items = {
  categories: ItemCategory[],
  list: Item[],
  searchQuery: string,
  filters: {"category.id": string}[],
  sort: [string, "asc" | "desc"]
}

const initialState: Items = {
  categories: [],
  list: [],
  searchQuery: "",
  filters: [],
  sort: ["name", "asc"]
}

const items = createSlice({
  name: "items",
  initialState,
  reducers: {
    setCategories(state, {payload}: PayloadAction<Items["categories"]>) {
      return {...state, categories: payload}
    },
    setItems(state, {payload}: PayloadAction<Items["list"]>) {
      return {...state, list: payload}
    },
    setSearchQuery(state, {payload}: PayloadAction<Items["searchQuery"]>) {
      return {...state, searchQuery: payload}
    },
    setFilters(state, {payload}: PayloadAction<Items["filters"]>) {
      return {...state, filters: payload}
    },
    setSort(state, {payload}: PayloadAction<Items["sort"]>) {
      return {...state, sort: payload}
    }
  }
})

export default items.reducer

export const useItems = () => {
  return useSelector<RootState, Items>(({items}) => items)
}

export const {setCategories, setSearchQuery, setItems, setFilters, setSort} = items.actions
export {requestCategories, requestItems}
