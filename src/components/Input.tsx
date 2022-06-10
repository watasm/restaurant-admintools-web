import cn from "classnames"
import React from "react"
import {FieldError, useForm} from "react-hook-form"

type Props = {
  className?: string
  label?: string
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  error?: FieldError
  inputProps: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & ReturnType<ReturnType<typeof useForm>["register"]>
}

export default function Input({
  className,
  label,
  startIcon,
  endIcon,
  error,
  inputProps
}: Props) {
  return (
    <div className={cn("relative w-full", className)}>
      {!!label && (
        <label>
          <p className="px-2 pb-1">
            {label}
          </p>
        </label>
      )}
      {!!startIcon && (
        <div className="absolute top-1/2 -translate-y-1/2 left-4 w-5 h-5">
          {startIcon}
        </div>
      )}
      <input
        className={cn("w-full py-3 px-4 rounded-xl bg-darkGrey border border-dark focus:border-blue transition outline-none autofill:!bg-darkGrey", {
          "!border-red": !!error,
          "!cursor-default opacity-70 pointer-events-none": inputProps.disabled,
          "!pl-12": !!startIcon,
          "!pr-12": !!endIcon
        })}
        {...inputProps}
      />
      {!!endIcon && (
        <div className="absolute top-1/2 -translate-y-1/2 right-4 w-5 h-5">
          {endIcon}
        </div>
      )}
      {!!error?.message && (
        <p className="px-2 my-1">{error.message}</p>
      )}
    </div>
  )
}
