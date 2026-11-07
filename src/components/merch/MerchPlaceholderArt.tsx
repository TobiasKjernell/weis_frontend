import logo from '../../assets/brand/moroii-logo-white.png'

export function MerchPlaceholderArt({ index }: { index: number }) {
  return (
    <div
      data-placeholder={index}
      className="well grained relative flex aspect-square items-center justify-center"
    >
      <img src={logo} alt="" aria-hidden="true" className="h-1/3 w-auto opacity-30" />
      <span className="label absolute bottom-3 left-3">Placeholder</span>
    </div>
  )
}
