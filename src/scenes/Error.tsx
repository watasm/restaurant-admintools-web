import React from "react"
import Link from "components/Link"

interface Props {
  error?: "404"
}

export default function Error({error}: React.PropsWithChildren<Props>) {
  return (
    <div className="relative flex flex-col justify-center items-center h-full min-h-desktopMinHeight">
      <h1 className="font-serif text-6xl font-bold my-3">
        {error === "404" ? "Not Found" : "Something went wrong"}
      </h1>
      <Link to="/">
        <p className="text-sm underline underline-offset-2">Return to homepage</p>
      </Link>
    </div>
  )
}
