import logo from '../../assets/brand/moroii-logo-white.png'

const gradients = [
  'from-magenta/25 via-void to-void',
  'from-cyan/20 via-void to-void',
  'from-violet/25 via-void to-void',
]

export function MerchPlaceholderArt({ index }: { index: number }) {
  return (
    <div className={`relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br ${gradients[index % gradients.length]}`}>
      <div className="bg-grid-horizon absolute inset-0 opacity-30" />
      <img src={logo} alt="" aria-hidden="true" className="h-1/3 w-auto opacity-15 grayscale" />
      <div className="grain-overlay" />
      <span className="absolute bottom-2 right-2 rounded-full border border-line/70 bg-void/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-ink-dim">
        Placeholder
      </span>
    </div>
  )
}
