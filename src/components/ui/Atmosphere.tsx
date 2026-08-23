/** Fixed, page-wide grain + scanline texture sitting above all content. */
export function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
      <div className="grain-overlay" />
      <div className="crt-scanlines opacity-40" />
      <div className="absolute inset-0 shadow-[inset_0_0_180px_rgba(0,0,0,0.75)]" />
    </div>
  )
}
