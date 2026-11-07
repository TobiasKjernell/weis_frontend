import { useUIStore } from '../../store/useUIStore'
import type { MerchItem } from '../../schemas/merchItem'
import { MerchPlaceholderArt } from './MerchPlaceholderArt'

export function MerchCard({ item, index }: { item: MerchItem; index: number }) {
  const openReservation = useUIStore((s) => s.openReservation)
  const totalStock = item.variants.reduce((sum, variant) => sum + variant.stock, 0)
  const soldOut = totalStock <= 0

  return (
    <div className="flex flex-col">
      {item.imageUrl ? (
        <div className="plate-frame aspect-square! ">
          <img src={item.imageUrl} alt={item.name} loading="lazy" className="print" />
        </div>
      ) : (
        <MerchPlaceholderArt index={index} />
      )}

      <div className="mt-3 flex flex-1 flex-col gap-(--space-sm)">
        <div>
          <h3 className="max-w-none">{item.name}</h3>
          <p className="label num mt-1">
            {item.price.toLocaleString('en-US', { style: 'currency', currency: item.currency })}
            {soldOut ? ' (sold out)' : ''}
          </p>
        </div>
        <button
          type="button"
          disabled={soldOut}
          onClick={() => openReservation(item.id)}
          className="btn btn--sm mt-auto w-full"
        >
          {soldOut ? 'Sold out' : 'Reserve'}
        </button>
      </div>
    </div>
  )
}
