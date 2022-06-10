import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import submitOrder from "store/features/customerOrders/submitOrder"
import requestOrders from "store/features/customerOrders/requestOrders"
import {RootState} from "store"

type CustomerOrders = {
  tables: Table[]
  list: Order[],
  currentOrder: string | null
}

const initialState: CustomerOrders = {
  tables: [],
  list: [],
  currentOrder: null
}

const customerOrders = createSlice({
  name: "customerOrders",
  initialState,
  reducers: {
    setTables(state, {payload}: PayloadAction<CustomerOrders["tables"]>) {
      return {
        ...state,
        tables: payload
      }
    },
    setOrders(state, {payload}: PayloadAction<Order[]>) {
      return {
        ...state,
        list: payload
      }
    },
    setCurrentOrder(state, {payload}: PayloadAction<CustomerOrders["currentOrder"]>) {
      return {
        ...state,
        currentOrder: payload
      }
    },
    addOrder(state, {payload}: PayloadAction<Order>) {
      return {
        ...state,
        list: [...state.list, payload]
      }
    },
    updateOrder(state, {payload}: PayloadAction<{orderId: string, data: Partial<Order>}>) {
      return {
        ...state,
        list: state.list.map(i => {
          if (i.id === payload.orderId) {
            return {...i, ...payload.data}
          } else {
            return i
          }
        })
      }
    },
    removeOrder(state, {payload}: PayloadAction<string>) {
      return {
        ...state,
        list: state.list.filter(i => i.id !== payload)
      }
    },
    addItem(state, {payload}: PayloadAction<{orderId: string, item: Item}>) {
      return{
        ...state,
        list: state.list.map(i => {
          if (i.id === payload.orderId) {
            return {...i, items: [...i.items, payload.item]}
          } else {
            return i
          }
        })
      }
    },
    removeItem(state, {payload}: PayloadAction<{orderId: string, itemId: string}>) {
      const customerOrders = {
        ...state,
        list: state.list.map(i => {
          if (i.id === payload.orderId) {
            return {...i, items: i.items.filter(i => i.id !== payload.itemId)}
          } else {
            return i
          }
        })
      }

      if (!(customerOrders.list.find(i => i.id === payload.orderId)?.items.length)) {
        customerOrders.list = customerOrders.list.filter(i => i.id !== payload.orderId)
      }

      return customerOrders
    }
  }
})

export default customerOrders.reducer

export const useCustomerOrders = () => {
  return useSelector<RootState, CustomerOrders>(({customerOrders}) => customerOrders)
}

export const {
  setTables, setOrders, setCurrentOrder, addOrder, removeOrder,
  updateOrder, addItem, removeItem
} = customerOrders.actions
export {submitOrder, requestOrders}
