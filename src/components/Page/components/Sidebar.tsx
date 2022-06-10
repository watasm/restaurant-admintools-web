import cn from "classnames"
import _ from "lodash"
import Image from "next/image"
import React, {useEffect} from "react"
import {useSocket} from "socket.io-react-hook"
import Button from "components/Button"
import {useDispatch} from "store"
import {
  removeItem,
  useCustomerOrders,
  submitOrder,
  updateOrder,
  removeOrder,
  setCurrentOrder,
  requestOrders
} from "store/features/customerOrders"
import {entry as submitOrderEntry} from "store/features/customerOrders/submitOrder"
import requestUpdateOrder, {entry as updateOrderLoadingEntry} from "store/features/customerOrders/requestUpdateOrder"
import {useLoadings} from "store/features/loadings"
import {useUser} from "store/features/user"

export default function Sidebar() {
  const dispatch = useDispatch()

  const {socket} = useSocket(process.env.NEXT_PUBLIC_SOCKET_URI || "")

  const user = useUser()
  const customerOrders = useCustomerOrders()
  const submitOrderLoading = useLoadings(submitOrderEntry)
  const orderUpdateLoading = useLoadings(updateOrderLoadingEntry)
  const currentOrderRef = customerOrders.list.find(i => i.id === customerOrders.currentOrder)

  const getAmount = () => {
    if (!user.data) {
      return customerOrders.list[0]?.items.reduce((total, amount) => total + Number(amount.price), 0)
    } else {
      return currentOrderRef?.items.reduce((total, amount) => total + Number(amount.price), 0)
    }
  }

  useEffect(() => {
    socket.on("order:update", handleOnOrderUpdate)

    return () => {
      socket.off("order:update", handleOnOrderUpdate)
    }
  }, [socket, customerOrders])

  const getSortedOrderItems = () => {
    if (customerOrders.list.length === 0) {
      return []
    } else {
      if (!user.data) {
        return _.sortBy(customerOrders.list[0].items, i => (-parseInt(i.price)))
      } else {
        return _.sortBy(currentOrderRef?.items || [], i => (-parseInt(i.price)))
      }
    }
  }

  const handleRemove = (id: string) => {
    dispatch(removeItem({orderId: "0", itemId: id}))
  }

  const handleSubmitOrder = () => {
    dispatch(submitOrder(customerOrders.list[0]))
  }

  const handleSubmitOrderUpdate = (data: Partial<Order>) => {
    const orderId = currentOrderRef?.id || customerOrders.list[0]?.id || null

    if (orderId) {
      dispatch(requestUpdateOrder({
        orderId, data
      }))
    }
  }

  const handleOnOrderUpdate = ({data}: any) => {
    if (!!user.data && data.attributes.status === "completed" && customerOrders.currentOrder === data.id) {
      dispatch(setCurrentOrder(null))
      dispatch(requestOrders({loading: false}))
    } else {
      dispatch(updateOrder({
        orderId: data.id,
        data: data.attributes
      }))
    }
  }

  const handleCompleteOrder = () => {
    if (customerOrders.list[0].id) {
      handleSubmitOrderUpdate({id: customerOrders.list[0].id, status: "completed"})
      dispatch(removeOrder(customerOrders.list[0].id))
    }
  }

  return (
    <div className="relative w-full min-w-screen-1/5 h-full min-h-full overflow-y-auto scrollbarHidden">
      <div className="relative min-h-full pt-6">
        <h2 className="font-serif text-3xl text-center mb-4">Order</h2>
        <div className="relative w-full mb-16 pl-10 pr-6">
          {getSortedOrderItems().map((i, num) => (
            <div
              key={`${i.id}-${num}`}
              className={cn(
                "relative w-full mb-6 col-span-1 flex flex items-center py-5 pl-10 pr-5",
                "bg-darkSecondary rounded-xl shadow-lg group",
                {"pointer-events-none": submitOrderLoading}
              )}
            >
              <div className="absolute w-24 h-24 -left-6">
                <Image objectFit="contain" layout="fill" src={i.image} alt={i.name}/>
              </div>
              <div className="pl-12">
                <p className="font-semibold whitespace-nowrap">{i.name}</p>
                <p className="text-lightGrey">{i.price}$</p>
              </div>
              {!user.data && (
                <div className={cn(
                  "absolute -bottom-2 -right-2 pointer-events-none opacity-0 translate-x-4 transition",
                  "group-hover:opacity-100 group-hover:pointer-events-auto group-hover:translate-x-0"
                )}>
                  <Button variant="danger" size="xs" onClick={() => handleRemove(i.id)}>
                    Remove
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="sticky bottom-0 w-full p-8 !pt-20 flex items-center flex-col justify-center bg-gradient-to-t from-dark via-dark">
          <p className="font-semibold whitespace-nowrap text-right mb-4">Amount: {getAmount()}$</p>
          {!user.data ? (
            <>
              {customerOrders.list[0]?.status === "none" ? (
                <Button full variant="secondary" onClick={handleSubmitOrder} loading={submitOrderLoading}>
                  Send
                </Button>
              ) : customerOrders.list[0]?.status === "sent" ? (
                <h3 className="text-2xl font-bold my-2">Waiting...</h3>
              ) : customerOrders.list[0]?.status === "processing" ? (
                <h3 className="text-2xl font-bold my-2">Processing...</h3>
              ) : (
                <>
                  <Button className="mb-4" full variant="secondary" onClick={handleCompleteOrder}
                    loading={orderUpdateLoading}>
                    Pay (Cash)
                  </Button>
                  <Button full variant="secondary" onClick={handleCompleteOrder}
                    loading={orderUpdateLoading}>
                    Pay (Credit/Debit card)
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              {currentOrderRef?.status === "sent" ? (
                <Button full variant="secondary" onClick={() => handleSubmitOrderUpdate({status: "processing"})}
                  loading={orderUpdateLoading}>
                  Submit for processing
                </Button>
              ) : currentOrderRef?.status === "processing" && (
                <Button full variant="secondary" onClick={() => handleSubmitOrderUpdate({status: "awaitPayment"})}
                  loading={orderUpdateLoading}>
                  Submit as ready
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
