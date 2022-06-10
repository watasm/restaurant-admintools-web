import Router from "next/router"
import {useEffect, useState} from "react"
import useSWR from "swr"
import {useDispatch} from "store"
import {setUserData, setUserToken, useUser} from "store/features/user"
import axios from "services/axios"

export default function useUserSWR({redirectTo, redirectIfFound}: {
  redirectTo?: string,
  redirectIfFound?: string
} = {}) {
  const dispatch = useDispatch()

  const userFromStore = useUser()

  const {data: user, error} = useSWR(
    !userFromStore.token ? null : ["/users/me", userFromStore.token],
    (url, token) => {
      return axios.get<User>(url, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then(({data}) => (data || null))
    }
  )

  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(!!(redirectTo || redirectIfFound))

  useEffect(() => {
    dispatch(setUserToken(localStorage.getItem("token") || ""))
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(setUserData(user))
    }
  }, [user])

  useEffect(() => {
    if (localStorage.getItem("token") && !!(user || error) && loading) {
      setFinished(true)
    } else if (!localStorage.getItem("token")) {
      setFinished(true)
    }
  }, [user, error, userFromStore.token])

  useEffect(() => {
    if ((!redirectTo && !redirectIfFound) || !finished) return

    if (redirectTo && !user) {
      Router.push(redirectTo).then(() => {setLoading(false)})
    } else if (redirectIfFound && user) {
      Router.push(redirectIfFound).then(() => {setLoading(false)})
    } else {
      setLoading(false)
    }
  }, [redirectTo, redirectIfFound, finished, loading, user])

  return {
    data: user || null,
    isLoading: loading,
    isError: error
  }
}
