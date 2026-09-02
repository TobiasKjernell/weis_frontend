import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReserveMerch } from '../../hooks/useReserveMerch'
import { cn } from '../../lib/utils'
import { useUIStore } from '../../store/useUIStore'
import { Button } from '../ui/Button'
import type { MerchItem } from '../../schemas/merchItem'

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function firstInStockVariant(item: MerchItem) {
  return item.variants.find((v) => v.stock > 0) ?? item.variants[0]
}

export function ReservationModal({ items }: { items: MerchItem[] }) {
  const reservingMerchItemId = useUIStore((s) => s.reservingMerchItemId)
  const closeReservation = useUIStore((s) => s.closeReservation)
  const item = items.find((i) => i.id === reservingMerchItemId) ?? null

  return (
    <AnimatePresence>
      {item && <ReservationModalContent key={item.id} item={item} onClose={closeReservation} />}
    </AnimatePresence>
  )
}

function ReservationModalContent({ item, onClose }: { item: MerchItem; onClose: () => void }) {
  const reserve = useReserveMerch()
  const [variantId, setVariantId] = useState(() => firstInStockVariant(item)?.id ?? '')
  const [quantity, setQuantity] = useState(1)
  const [email, setEmail] = useState('')
  const [instagram, setInstagram] = useState('')
  const [touched, setTouched] = useState(false)

  const selectedVariant = item.variants.find((v) => v.id === variantId)
  const emailValid = EMAIL_PATTERN.test(email)
  const canSubmit =
    Boolean(selectedVariant) &&
    (selectedVariant?.stock ?? 0) > 0 &&
    emailValid &&
    quantity >= 1 &&
    quantity <= (selectedVariant?.stock ?? 0)

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched(true)
    if (!canSubmit || !selectedVariant) return
    reserve.mutate({
      itemId: item.id,
      variantId: selectedVariant.id,
      contactEmail: email,
      contactInstagram: instagram || undefined,
      quantity,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Reserve ${item.name}`}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-void/95 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-md rounded-lg border border-line bg-surface p-6"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 font-mono text-xs uppercase tracking-[0.2em] text-ink-muted hover:text-cyan"
        >
          Close ✕
        </button>

        {reserve.isSuccess ? (
          <div className="pt-2">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan text-glow-cyan">Reserved</p>
            <h3 className="mt-2 font-display text-xl uppercase tracking-wide text-ink">You&apos;re on the list</h3>
            <p className="mt-3 text-sm text-ink-muted">
              We&apos;ve reserved {quantity} × {item.name}
              {selectedVariant?.size ? ` (${selectedVariant.size})` : ''}. We&apos;ll reach out at {email} to
              confirm pickup or shipping.
            </p>
            <Button type="button" variant="outline" className="mt-6 w-full" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-2" noValidate>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan text-glow-cyan">Reserve</p>
            <h3 className="mt-2 font-display text-xl uppercase tracking-wide text-ink">{item.name}</h3>
            <p className="mt-1 font-mono text-sm text-ink-muted">
              {item.price.toLocaleString('en-US', { style: 'currency', currency: item.currency })}
            </p>

            {item.variants.length > 1 && (
              <div className="mt-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">Size</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.variants.map((v) => {
                    const disabled = v.stock <= 0
                    const active = variantId === v.id
                    return (
                      <button
                        key={v.id}
                        type="button"
                        disabled={disabled}
                        onClick={() => setVariantId(v.id)}
                        className={cn(
                          'rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition',
                          active
                            ? 'border-magenta bg-magenta/10 text-magenta'
                            : 'border-line text-ink-muted hover:border-magenta/40 hover:text-ink',
                          disabled && 'cursor-not-allowed opacity-30 hover:border-line hover:text-ink-muted',
                        )}
                      >
                        {v.size ?? 'One size'}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-5">
              <label htmlFor="reserve-quantity" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                Quantity
              </label>
              <div className="mt-2 flex items-center gap-3">
                <input
                  id="reserve-quantity"
                  type="number"
                  min={1}
                  max={selectedVariant?.stock ?? 1}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-24 rounded-md border border-line bg-void px-3 py-2 font-mono text-sm text-ink focus:border-cyan/60 focus:outline-none"
                />
                {selectedVariant && (
                  <span className="font-mono text-[10px] uppercase tracking-widest text-ink-dim">
                    {selectedVariant.stock} in stock
                  </span>
                )}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="reserve-email" className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim">
                Email
              </label>
              <input
                id="reserve-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="mt-2 w-full rounded-md border border-line bg-void px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-dim focus:border-cyan/60 focus:outline-none"
              />
              {touched && !emailValid && (
                <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-blood">
                  Enter a valid email
                </p>
              )}
            </div>

            <div className="mt-5">
              <label
                htmlFor="reserve-instagram"
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-dim"
              >
                Instagram (optional)
              </label>
              <input
                id="reserve-instagram"
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@yourhandle"
                className="mt-2 w-full rounded-md border border-line bg-void px-3 py-2 font-mono text-sm text-ink placeholder:text-ink-dim focus:border-cyan/60 focus:outline-none"
              />
            </div>

            {reserve.isError && (
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-blood">
                Something went wrong — please try again.
              </p>
            )}

            <Button type="submit" variant="solid" disabled={reserve.isPending} className="mt-6 w-full">
              {reserve.isPending ? 'Reserving…' : 'Reserve item'}
            </Button>
          </form>
        )}
      </motion.div>
    </motion.div>
  )
}
