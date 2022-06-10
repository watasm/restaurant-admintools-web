import React from "react"
import Categories from "./components/Categories"
import ItemsList from "./components/ItemsList"
import Search from "./components/Search"

export default function Home() {
  return (
    <div className="relative w-full">
      <div className="relative py-10">
        <section className="relative w-full flex items-center justify-between">
          <div>
            <h2 className="font-serif text-3xl mb-2">Welcome to Restaurant</h2>
            <p className="text-l font-medium text-grey">Make orders in real time</p>
          </div>
          <div className="w-1/4">
            <Search/>
          </div>
        </section>
        <section className="relative w-full pt-16 pb-10">
          <Categories/>
        </section>
        <section className="relative w-full pb-16">
          <ItemsList/>
        </section>
      </div>
    </div>
  )
}
