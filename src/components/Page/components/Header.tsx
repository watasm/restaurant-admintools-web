import Image from "next/image"
import React from "react"
import Link from "components/Link"
import {useDispatch} from "store"
import {resetUser, useUser} from "store/features/user"

export default function Header() {
  const dispatch = useDispatch()

  const user = useUser()

  const handleLogout = () => {
    dispatch(resetUser())
  }

  return (
    <header className="relative w-full h-full">
      <div className="relative h-full px-12 py-4 flex items-center justify-between">
        <div className="relative h-full flex items-center justify-center">
          <Link to="/">
            <div className="relative w-12 h-12">
              <Image priority objectFit="contain" layout="fill"
                src="/pictures/logo.png" alt="Restaurant Admintools"/>
            </div>
          </Link>
        </div>
        <div className="relative flex items-center justify-center">
          {user.data && (
            <p className="text-sm underline underline-offset-2 cursor-pointer select-none"
              onClick={handleLogout}>
              logout
            </p>
          )}
        </div>
      </div>
    </header>
  )
}
