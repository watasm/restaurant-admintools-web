import {createSlice, PayloadAction} from "@reduxjs/toolkit"
import {useSelector} from "react-redux"
import login from "store/features/user/login"
import {RootState} from "store"

type UserState = {
  token: string
  data?: User
}

const initialState: UserState = {
  token: ""
}

const userSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {
    setUserToken(state, {payload}: PayloadAction<string>) {
      localStorage.setItem("token", payload)

      return {
        ...state,
        token: payload
      }
    },
    setUserData(state, {payload}: PayloadAction<UserState["data"]>) {
      return {
        ...state,
        data: payload
      }
    },
    resetUser() {
      localStorage.removeItem("token")

      return {token: ""}
    }
  }
})

export default userSlice.reducer

export const useUser = () => useSelector<RootState, UserState>(({user}) => user)

export const {setUserToken, setUserData, resetUser} = userSlice.actions
export {login}
