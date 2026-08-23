import { create } from 'zustand'

interface UIState {
  introPlayed: boolean
  markIntroPlayed: () => void

  mobileNavOpen: boolean
  toggleMobileNav: () => void
  closeMobileNav: () => void

  lightboxIndex: number | null
  openLightbox: (index: number) => void
  closeLightbox: () => void
  stepLightbox: (delta: number, count: number) => void
}

export const useUIStore = create<UIState>()((set) => ({
  introPlayed: false,
  markIntroPlayed: () => set({ introPlayed: true }),

  mobileNavOpen: false,
  toggleMobileNav: () => set((s) => ({ mobileNavOpen: !s.mobileNavOpen })),
  closeMobileNav: () => set({ mobileNavOpen: false }),

  lightboxIndex: null,
  openLightbox: (index) => set({ lightboxIndex: index }),
  closeLightbox: () => set({ lightboxIndex: null }),
  stepLightbox: (delta, count) =>
    set((s) => {
      if (s.lightboxIndex === null) return s
      const next = (s.lightboxIndex + delta + count) % count
      return { lightboxIndex: next }
    }),
}))
