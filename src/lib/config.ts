/**
 * Dev-only network simulation, driven by URL search params so the loading /
 * error / empty states can be exercised without a real backend, e.g.
 * `?debugDelay=1500` or `?debugError=tour,merch` or `?debugEmpty=gallery`.
 * None of this runs against a real API — it only shapes the mock fetchers.
 */
function debugParams(): URLSearchParams | null {
  if (typeof window === 'undefined') return null
  return new URLSearchParams(window.location.search)
}

export function getSimulatedDelay(): number {
  const params = debugParams()
  const raw = params?.get('debugDelay')
  const parsed = raw ? Number(raw) : Number.NaN
  if (!Number.isNaN(parsed)) return parsed
  return 500 + Math.random() * 400
}

export function shouldSimulateError(key: string): boolean {
  const params = debugParams()
  const raw = params?.get('debugError')
  if (!raw) return false
  return raw.split(',').includes(key)
}

export function shouldSimulateEmpty(key: string): boolean {
  const params = debugParams()
  const raw = params?.get('debugEmpty')
  if (!raw) return false
  return raw.split(',').includes(key)
}
