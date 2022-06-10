import React from "react"
import NextLink from "next/link"
import cn from "classnames"

interface Props {
  to?: string
  newTab?: boolean
  onClick?: () => void
  className?: string
  transparent?: boolean
  scroll?: boolean
  disabled?: boolean
}

export default function Link({
  to,
  newTab,
  onClick,
  className,
  transparent,
  scroll = true,
  disabled,
  children
}: React.PropsWithChildren<Props>) {
  if (transparent || !to) {
    return <>{children}</>
  }

  const handleClick = (e: any) => {
    if (disabled) {
      return e.preventDefault()
    }

    if (onClick) {
      onClick()
    }
  }

  if (newTab) {
    return (
      <a
        href={to}
        target="_blank"
        rel="noreferrer"
        className={cn(className, {"pointer-events-none": disabled})} onClick={handleClick}>
        {children}
      </a>
    )
  }

  return (
    <NextLink href={to} scroll={scroll} prefetch={false}>
      <a className={cn(className, {"pointer-events-none": disabled})} onClick={handleClick}>
        {children}
      </a>
    </NextLink>
  )
}
