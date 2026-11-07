import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const variants = {
  solid: 'btn btn--primary',
  outline: 'btn',
  ghost: 'link',
}

type Variant = keyof typeof variants

export function Button({
  variant = 'solid',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(variants[variant], className)} {...props} />
}

export function LinkButton({
  variant = 'solid',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(variants[variant], className)} {...props} />
}
