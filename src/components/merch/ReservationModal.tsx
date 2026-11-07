import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReserveMerch } from '../../hooks/useReserveMerch'
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

  const price = item.price.toLocaleString('en-US', { style: 'currency', currency: item.currency })

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="dialog"
      aria-modal="true"
      aria-label={`Reserve ${item.name}`}
      onClick={onClose}
      className="fixed inset-0 z-(--z-modal) flex items-center justify-center overflow-y-auto bg-ground p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
        onClick={(e) => e.stopPropagation()}
        className="relative my-auto w-full max-w-md border border-hair bg-plate p-6"
      >
        <button type="button" onClick={onClose} className="btn btn--sm absolute right-4 top-4">
          Close
        </button>

        {reserve.isSuccess ? (
          <div className="pt-12">
            <h3>You&apos;re on the list</h3>
            <p className="mt-3 text-fibre-2">
              We&apos;ve reserved {quantity} × {item.name}
              {selectedVariant?.size ? ` (${selectedVariant.size})` : ''}. We&apos;ll reach out at {email} to
              confirm pickup or shipping.
            </p>
            <Button type="button" variant="outline" className="mt-6 w-full" onClick={onClose}>
              Done
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-12" noValidate>
            <h3>Reserve {item.name}</h3>
            <p className="label num mt-1">{price}</p>

            {item.variants.length > 1 && (
              <div className="mt-5">
                <span className="label">Size</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {item.variants.map((v) => (
                    <button
                      key={v.id}
                      type="button"
                      disabled={v.stock <= 0}
                      aria-pressed={variantId === v.id}
                      onClick={() => setVariantId(v.id)}
                      className="cell"
                    >
                      {v.size ?? 'One size'}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-5">
              <label htmlFor="reserve-quantity" className="label">
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
                  className="field w-24"
                />
                {selectedVariant && <span className="label num">{selectedVariant.stock} in stock</span>}
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="reserve-email" className="label">
                Email
              </label>
              <input
                id="reserve-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-invalid={touched && !emailValid}
                className="field mt-2"
              />
              {touched && !emailValid && <p className="mt-1.5 text-sm text-alarm">Enter a valid email</p>}
            </div>

            <div className="mt-5">
              <label htmlFor="reserve-instagram" className="label">
                Instagram (optional)
              </label>
              <input
                id="reserve-instagram"
                type="text"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="@yourhandle"
                className="field mt-2"
              />
            </div>

            {reserve.isError && (
              <p role="alert" className="mt-4 text-sm text-alarm">
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
