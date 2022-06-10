import Image from "next/image"
import React, {useEffect} from "react"
import {useForm} from "react-hook-form"
import Input from "components/Input"
import {useDispatch} from "store"
import {setSearchQuery} from "store/features/items"

type FormFields = {
  search: string
}

export default function Search() {
  const dispatch = useDispatch()

  const {register, watch} = useForm<FormFields>({
    defaultValues: {
      search: ""
    }
  })

  useEffect(() => {
    dispatch(setSearchQuery(watch("search")))
  }, [watch("search")])

  return (
    <div className="relative">
      <Input
        className="shadow-lg"
        endIcon={(
          <Image layout="fill" objectFit="contain" src="/icons/search.svg" alt="Search"/>
        )}
        inputProps={{
          ...register("search"),
          placeholder: "Search items..."
        }}
      />
    </div>
  )
}
