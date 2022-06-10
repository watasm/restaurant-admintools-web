import cn from "classnames"
import React from "react"
import Head from "next/head"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import {useUser} from "store/features/user"
import {useCustomerOrders} from "store/features/customerOrders"
import useUserSWR from "hooks/useUserSWR"
import Loading from "components/Loading"

export default function Page({
  title,
  noHeader,
  noSidebar,
  loggedInOnly,
  notLoggedInOnly,
  children
}: React.PropsWithChildren<PageConfig>) {
  const user = useUserSWR({
    redirectTo: loggedInOnly?.redirectTo,
    redirectIfFound: notLoggedInOnly?.redirectTo
  })
  const userFromStore = useUser()
  const {list, currentOrder} = useCustomerOrders()

  const showSidebar = !userFromStore.data ? list.length > 0 : !!currentOrder

  return (
    <>
      <Head>
        <title>
          {title ? `${title} - Restaurant Admintools` : "Restaurant Admintools"}
        </title>
      </Head>
      <div className="relative w-full">
        {user.isLoading ? (
          <div className="relative h-screen min-h-desktopMinHeight">
            <Loading over size="xl"/>
          </div>
        ) : (
          <div className="relative">
            {!noHeader && (
              <div className="sticky top-0 z-20 w-full h-20 bg-darkSecondary shadow-lg">
                <Header/>
              </div>
            )}
            <div className="relative flex">
              {!noSidebar && (
                <div className={cn(
                  "sticky top-0 w-1/5 h-screenExHeader min-h-desktopMinHeightExHeader shadow-2xl",
                  "transition-translateWithWidth overflow-hidden", {
                    "top-20": !noHeader,
                    "w-0 -translate-x-1/2 scale-80": !showSidebar
                  }
                )}>
                  <Sidebar/>
                </div>
              )}
              <div className={cn("relative w-4/5 flex flex-col items-center transition-width", {
                "!w-full": noSidebar || !showSidebar
              })}>
                <div className="relative w-[72vw]">
                  {children}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
