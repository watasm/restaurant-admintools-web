import cn from "classnames"
import _ from "lodash"
import moment from "moment"
import React, {useEffect} from "react"
import {useSocket} from "socket.io-react-hook"
import Button from "components/Button"
import {useDispatch} from "store"
import {setCurrentOrder, useCustomerOrders, requestOrders} from "store/features/customerOrders"
import {entry} from "store/features/customerOrders/requestOrders"
import {useLoadings} from "store/features/loadings"

export default function OrdersList() {
  const dispatch = useDispatch()

  const {socket} = useSocket(process.env.NEXT_PUBLIC_SOCKET_URI || "")

  const requestOrdersLoading = useLoadings(entry)
  const customerOrders = useCustomerOrders()
  const resultList = requestOrdersLoading ? ["1", "2", "3"] : customerOrders.list

  useEffect(() => {
    dispatch(requestOrders())
  }, [])

  useEffect(() => {
    socket.on("order:create", handleOnOrderCreate)
    socket.on("order:delete", handleOnOrderCreate)

    return () => {
      socket.off("order:create", handleOnOrderCreate)
      socket.off("order:delete", handleOnOrderCreate)
    }
  }, [socket])

  const getSortedList = () => {
    return _.sortBy(
      resultList,
      i => -moment(typeof i === "object" ? i.dateCreated : null).toDate()
    ) as (string | Order)[]
  }

  const handleOnOrderCreate = () => {
    dispatch(requestOrders())
  }

  const handleSelectOrder = (orderId: string) => {
    dispatch(setCurrentOrder(orderId))
  }

  return (
    <div className="relative w-full">
      <h3 className="text-2xl font-bold mb-4">Orders</h3>
      {getSortedList().length === 0 ? (
        <h3 className="text-2xl font-bold text-grey my-8">No orders for now</h3>
      ) : (
        <div className="relative w-full grid grid-cols-3 gap-10">
          {getSortedList().map(i => {
            const isPlaceholder = typeof i !== "object"
            const amount = !isPlaceholder ? i.items.reduce((total, amount) => {
              return total + Number(amount.price)
            }, 0) : 0

            return (
              <div
                key={isPlaceholder ? i : i.id}
                className={cn(
                  "relative h-40 col-span-1 flex flex-col justify-between px-8 py-6",
                  "bg-darkSecondary rounded-xl shadow-lg transition", {
                    "opacity-40 cursor-default": isPlaceholder,
                    "hover:-translate-y-1": !isPlaceholder
                  }
                )}
              >
                {!isPlaceholder && (
                  <>
                    <div className="w-full">
                      <div className="flex items-center justify-between  mb-1">
                        <h4 className="text-xl font-semibold">
                          {`Table: ${i.table.number}`}
                        </h4>
                        {i.status === "sent" ? (
                          <p className="text-xs text-red">
                            Waiting
                          </p>
                        ) : i.status === "processing" ? (
                          <p className="text-xs text-yellow">
                            Processing
                          </p>
                        ) : i.status === "awaitPayment" && (
                          <p className="text-xs text-green">
                            Await for payment
                          </p>
                        )}
                      </div>
                      <p className="text-lightGrey mr-4">
                        {`Amount: ${amount}$`}
                      </p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <p className="text-red mr-4">
                        {`Items: ${i.items.length}`}
                      </p>
                      <Button variant="secondary" size="s" onClick={() => handleSelectOrder(i.id)}>
                        View
                      </Button>
                    </div>
                  </>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
