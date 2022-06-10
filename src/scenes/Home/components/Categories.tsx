import cn from "classnames"
import Image from "next/image"
import React, {useEffect} from "react"
import {useDispatch} from "store"
import {requestCategories, setFilters, useItems} from "store/features/items"

export default function Categories() {
  const dispatch = useDispatch()

  const items = useItems()

  useEffect(() => {
    dispatch(requestCategories())
  }, [])

  const getCategories = (): (ItemCategory | string)[] => {
    return items.categories.length === 0 ? ["1", "2", "3", "4"] : [
      {id: "0", name: "All", icon: ""},
      ...items.categories
    ]
  }

  const handleSelectCategory = (key?: string) => {
    if (!key) {
      dispatch(setFilters([]))
    } else {
      dispatch(setFilters([{"category.id": key}]))
    }
  }

  return (
    <div className="relative w-full">
      <h3 className="text-2xl font-bold mb-4">Categories</h3>
      <div className="relative w-full grid grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-6">
        {getCategories().map(i => {
          const isPlaceholder = typeof i !== "object"
          const currentCategory = !isPlaceholder ? (
            items.filters.find(i => Object.keys(i)[0] === "category.id")?.["category.id"] || "0"
          ) : undefined
          const isCurrent = isPlaceholder ? false : currentCategory === i.id

          return (
            <div
              key={isPlaceholder ? i : i.id}
              className={cn(
                "relative h-48 col-span-1 flex flex-col items-center justify-between px-4 py-5",
                "bg-darkSecondary rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 active:scale-100 transition", {
                  "opacity-40 cursor-default pointer-events-none": isPlaceholder,
                  "outline outline-green transition": !isPlaceholder && isCurrent
                }
              )}
              onClick={!isPlaceholder ? () => handleSelectCategory(i.id !== "0" ? i.id : undefined) : undefined}
            >
              <div className={cn(
                "absolute w-40 h-40 top-0 right-0 translate-x-4 -translate-y-8 bg-grey rounded-full opacity-20",
                {"!bg-yellow": typeof i === "object" && i.id === "0"}
              )}/>
              {!isPlaceholder && (
                <>
                  <div className="relative w-16 h-16 mt-4 mb-6">
                    {i.icon && (
                      <Image objectFit="contain" layout="fill" src={i.icon} alt={i.name}/>
                    )}
                  </div>
                  <p className="text-center font-semibold">{i.name}</p>
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
