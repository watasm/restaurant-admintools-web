import React, {PropsWithChildren} from "react"
import cn from "classnames"
import Loading from "components/Loading"

interface Props {
  variant?: "primary" | "secondary" | "danger"
  size?: "xs" | "s" | "m"
  formSubmit?: boolean
  full?: boolean
  disabled?: boolean
  loading?: boolean
  className?: string
  onClick?: () => void
}

export default function Button({
  variant = "primary",
  size = "m",
  formSubmit,
  full,
  disabled,
  loading,
  className = "",
  onClick,
  children
}: PropsWithChildren<Props>) {
  return (
    <button
      type={formSubmit ? "submit" : undefined}
      className={cn("relative bg-darkGrey rounded-xl transition outline-none cursor-pointer select-none", {
        "hover:bg-grey active:scale-99 active:opacity-80": variant === "primary",
        "bg-green hover:scale-105 active:scale-99 active:opacity-80": variant === "secondary",
        "bg-red hover:scale-105 active:scale-99 active:opacity-80": variant === "danger",
        "py-1 px-4": size === "xs",
        "py-2 px-5": size === "s",
        "py-3 px-6": size === "m",
        "w-full": full,
        "!cursor-default opacity-70 pointer-events-none": disabled || loading
      }, className)}
      onClick={onClick}
    >
      {loading && (
        <div className="absolute w-full h-full top-0 left-0 flex items-center justify-center">
          <Loading size="s"/>
        </div>
      )}
      {children && (
        <div className={cn("relative w-full inline-flex items-center justify-center font-semibold", {
          "pointer-events-none opacity-0": loading
        })}>
          {typeof children === "string" ? (
            <span className={cn("whitespace-nowrap", {
              "text-sm": size === "xs" || size === "s"
            })}>
              {children}
            </span>
          ) : (
            children
          )}
        </div>
      )}
    </button>
  )
}
