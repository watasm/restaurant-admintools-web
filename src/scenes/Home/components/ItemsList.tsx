import cn from "classnames"
import _ from "lodash"
import Image from "next/image"
import React, {useCallback, useEffect} from "react"
import Button from "components/Button"
import {useDispatch} from "store"
import {addOrder, addItem, useCustomerOrders} from "store/features/customerOrders"
import {requestItems, useItems} from "store/features/items"

export default function ItemsList() {
  const dispatch = useDispatch()

  const items = useItems()
  const customerOrders = useCustomerOrders()

  useEffect(() => {
    dispatch(requestItems())
  }, [])

  const getFilteredItems = useCallback(() => {
    let result = items.list

    items.filters.forEach(filter => {
      result = _.filter(result, item => {
        return _.get(item, Object.keys(filter)[0]) === Object.values(filter)[0]
      })
    })

    const sortedList = _.orderBy(result, ...items.sort)

    if (!items.searchQuery) {
      return sortedList
    } else {
      return sortedList.filter(i => (`${i.name} ${i.category.name}`).toLowerCase().includes(items.searchQuery.toLowerCase()))
    }
  }, [items])

  const resultList = (items.list.length > 0 ? getFilteredItems() : ["1", "2", "3", "4"])

  const handleOrder = (input: Item) => {
    if (customerOrders.list.length) {
      dispatch(addItem({orderId: "0", item: input}))
    } else {
      const order: Order = {
        id: "0",
        table: {
          id: "0",
          number: 0,
          status: "none"
        },
        items: [input],
        status: "none",
        dateCreated: new Date().toDateString()
      }
      dispatch(addOrder(order))
    }
  }

  return (
    <div className="relative w-full">
      <h3 className="text-2xl font-bold text-right mb-4">Menu</h3>
      {resultList.length === 0 ? (
        <h3 className="text-2xl font-bold text-grey text-right my-8">No items found</h3>
      ) : (
        <div className="relative w-full grid grid-cols-4 gap-10">
          {resultList.map(i => {
            const isPlaceholder = typeof i !== "object"

            return (
              <div
                key={isPlaceholder ? i : i.id}
                className={cn(
                  "relative h-64 mt-24 col-span-1 flex flex-col items-center justify-end px-4 py-5",
                  "bg-darkSecondary rounded-xl shadow-lg cursor-pointer transition", {
                    "opacity-40 cursor-default": isPlaceholder,
                    "hover:-translate-y-2": !isPlaceholder
                  }
                )}
              >
                {!isPlaceholder && (
                  <>
                    <div className="absolute w-52 h-52 -top-1/3">
                      <Image objectFit="contain" layout="fill" src={i.image} alt={i.name}/>
                    </div>
                    <h4 className="text-center text-xl font-semibold mb-6">{i.name}</h4>
                    <div className="flex justify-center items-center w-full">
                      <p className="text-lightGrey mr-4">{i.price}$</p>
                      <Button variant="secondary" onClick={() => handleOrder(i)}>
                        Order
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
