import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan disabled:cursor-not-allowed disabled:opacity-40'

const variants = {
  solid: 'bg-magenta text-void shadow-glow-magenta hover:bg-magenta-soft',
  outline: 'border border-cyan/60 text-cyan hover:bg-cyan/10 hover:shadow-glow-cyan',
  ghost: 'text-ink-muted hover:text-ink',
}

type Variant = keyof typeof variants

export function Button({
  variant = 'solid',
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={cn(base, variants[variant], className)} {...props} />
}

export function LinkButton({
  variant = 'solid',
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  return <a className={cn(base, variants[variant], className)} {...props} />
}
