import type { ReactNode } from 'react'
import type { UseQueryResult } from '@tanstack/react-query'
import { ErrorState } from './ErrorState'
import { EmptyState } from './EmptyState'

interface QueryBoundaryProps<T> {
  query: UseQueryResult<T[]>
  skeleton: ReactNode
  emptyMessage: string
  errorMessage?: string
  children: (data: T[]) => ReactNode
}

export function QueryBoundary<T>({ query, skeleton, emptyMessage, errorMessage, children }: QueryBoundaryProps<T>) {
  if (query.isPending) return <>{skeleton}</>

  if (query.isError) {
    return (
      <ErrorState
        message={errorMessage ?? query.error.message}
        onRetry={() => query.refetch()}
      />
    )
  }

  if (query.data.length === 0) return <EmptyState message={emptyMessage} />

  return <>{children(query.data)}</>
}
