import React from "react"
import OrdersList from "./components/OrdersList"
import {useUser} from "store/features/user"

export default function Admin() {
  const user = useUser()

  return (
    <div className="relative w-full">
      <div className="relative py-10">
        <section className="relative w-full">
          <h2 className="font-serif text-3xl text-right mb-2">
            {`Hello, ${user.data?.username || ""}`}
          </h2>
          <p className="text-l font-medium text-grey text-right">
            View and process orders from customers
          </p>
        </section>
        <section className="relative w-full py-10">
          <OrdersList/>
        </section>
      </div>
    </div>
  )
}
