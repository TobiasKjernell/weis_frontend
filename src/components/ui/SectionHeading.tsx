import type { ReactNode } from 'react'

interface SectionHeadingProps {
  title: string
  description?: ReactNode
}

export function SectionHeading({ title, description }: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-(--gap-columns)">
      <h2>{title}</h2>
      {description ? <p className="max-w-[36ch] text-fibre-2 md:shrink-0">{description}</p> : null}
    </div>
  )
}
