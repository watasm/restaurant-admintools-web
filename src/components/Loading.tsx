import Image from "next/image"
import React from "react"
import cn from "classnames"

interface Props {
  variant?: "white" | "dark"
  size?: "s" | "m" | "l" | "xl"
  over?: boolean
  bg?: "white" | "dark" | "darkSecondary" | "darkGrey"
}

const variantIcons = {
  "white": "/icons/spinner.svg",
  "dark": "/icons/spinnerDark.svg"
}

export default function Loading({
  variant = "white",
  size = "m",
  over,
  bg
}: Props) {
  return (
    <div className={cn("z-10 flex items-center justify-center pointer-events-none select-none", {
      [`bg-${bg}`]: bg,
      "absolute top-0 left-0 w-full h-full": over
    })}>
      <div className={cn("relative animate-spin", {
        "w-5 h-5": size === "s",
        "w-6 h-6": size === "m",
        "w-8 h-8": size === "l",
        "w-10 h-10": size === "xl"
      })}>
        <Image priority layout="fill" src={variantIcons[variant]} alt="Page builder"/>
      </div>
    </div>
  )
}
