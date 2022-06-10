import React from "react"
import {SubmitHandler, useForm} from "react-hook-form"
import Button from "components/Button"
import Input from "components/Input"
import {useDispatch} from "store"
import {useErrors} from "store/features/errors"
import {useLoadings} from "store/features/loadings"
import {login} from "store/features/user"
import {entry} from "store/features/user/login"

type FormFields = {
  username: string
  password: string
}

export default function AdminLogin() {
  const dispatch = useDispatch()

  const loading = useLoadings(entry)
  const error = useErrors(entry)

  const {register, handleSubmit, formState} = useForm<FormFields>({
    defaultValues: {
      username: "",
      password: ""
    }
  })

  const handleSubmitForm: SubmitHandler<FormFields> = (data) => {
    dispatch(login(data))
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-screen min-h-desktopMinHeight">
      <h2 className="font-serif text-3xl font-bold mb-4">
        Admin Login
      </h2>
      <div className="relative w-1/3 px-16 py-16 rounded-xl bg-darkSecondary shadow">
        <form onSubmit={handleSubmit(handleSubmitForm)}>
          <Input
            className="mb-4"
            error={formState.errors.password}
            inputProps={{
              ...register("username", {required: true, min: 6}),
              placeholder: "Username",
              disabled: loading
            }}
          />
          <Input
            className="mb-4"
            error={formState.errors.password}
            inputProps={{
              ...register("password", {required: true, min: 6}),
              type: "password",
              placeholder: "Password",
              disabled: loading
            }}
          />
          <Button full formSubmit loading={loading}>
            Sign in
          </Button>
          {!!error && (
            <p className="absolute bottom-10 left-0 w-full text-xs text-red text-center">{error}</p>
          )}
        </form>
      </div>
    </div>
  )
}
