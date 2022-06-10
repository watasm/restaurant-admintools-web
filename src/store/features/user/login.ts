import {createAsyncThunk} from "@reduxjs/toolkit"
import axios from "services/axios"
import {addError} from "store/features/errors"
import {addLoading, removeLoading} from "store/features/loadings"
import {setUserData, setUserToken} from "store/features/user"

export const entry = "user/login"

export default createAsyncThunk(entry, async (userData: {
  username: string,
  password: string
}, {dispatch}) => {
  dispatch(addLoading(entry))

  const {data} = await axios.post("/auth/local", {
    identifier: userData.username,
    password: userData.password
  }).catch(() => {
    dispatch(addError({[entry]: "Incorrect username or password"}))
    return {data: null}
  })

  if (data) {
    dispatch(setUserToken(data.jwt))
    dispatch(setUserData({
      id: data.user.id,
      username: data.user.username,
      email: data.user.email
    }))
  }

  dispatch(removeLoading(entry))
})
