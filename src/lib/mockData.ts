import g01 from '../assets/gallery/moroii-01.jpg'
import g02 from '../assets/gallery/moroii-02.jpg'
import g03 from '../assets/gallery/moroii-03.jpg'
import g04 from '../assets/gallery/moroii-04.jpg'
import g05 from '../assets/gallery/moroii-05.jpg'
import g06 from '../assets/gallery/moroii-06.jpg'
import g07 from '../assets/gallery/moroii-07.jpg'
import type { GalleryItem } from '../schemas/galleryItem'
import type { TourDate } from '../schemas/tourDate'
import type { MerchItem } from '../schemas/merchItem'
import type { VideoItem } from '../schemas/videoItem'

export const mockGalleryItems: GalleryItem[] = [
  { id: 'g01', src: g01, alt: 'Moroii performing live under violet stage light' },
  { id: 'g02', src: g02, alt: 'Moroii silhouetted at the synth rig, deep purple haze' },
  { id: 'g03', src: g03, alt: 'Moroii backlit on stage, hood up' },
  { id: 'g04', src: g04, alt: 'Moroii bathed in red light, hands raised' },
  { id: 'g05', src: g05, alt: 'Moroii mid-performance, back logo visible' },
  { id: 'g06', src: g06, alt: 'Moroii raising a hand to the crowd' },
  { id: 'g07', src: g07, alt: 'Moroii at the keys, monochrome haze' },
]

export const mockVideoItems: VideoItem[] = [
  { id: 'v01', youtubeId: 'gFiKYWZXM38', title: 'Death Portal Formulas (Official Music Video)' },
  { id: 'v02', youtubeId: 'IcD_KFcRe3E', title: 'Escaping Moroii Manor (Official Music Video)' },
  { id: 'v03', youtubeId: 'bQozH1flL_c', title: 'The Abzolver (Official Music Video)' },
  { id: 'v04', youtubeId: 'GUq-E8AKjgI', title: 'Untamed (Sacred Bullets)' },
  { id: 'v05', youtubeId: 'CH_sa7lEcps', title: 'Desert Spire (Official Music Video)' },
  { id: 'v06', youtubeId: 'cCzmOcpimH0', title: 'The Cruel Dance of Time (Official Music Video)' },
  { id: 'v07', youtubeId: 'UpxmE7KAzvA', title: 'Ex Luna (Official Music Video)' },
  { id: 'v08', youtubeId: 'mEIGHKF350U', title: 'Moroii + Magnavolt + Plythe — Stockholm Live Show Trailer' },
  { id: 'v09', youtubeId: '9ZS8kXInQ0Q', title: 'How to Make a Moroii Coffin' },
]

export const mockTourDates: TourDate[] = [
  { id: 't01', date: '2026-09-12', location: 'Berlin, Germany', venue: 'Urban Spree', ticketUrl: 'https://tickets.example.com/moroii-berlin', soldOut: false },
  { id: 't02', date: '2026-09-19', location: 'Warsaw, Poland', venue: 'Hydrozagadka', ticketUrl: 'https://tickets.example.com/moroii-warsaw', soldOut: false },
  { id: 't03', date: '2026-10-03', location: 'London, UK', venue: 'The Dome', ticketUrl: 'https://tickets.example.com/moroii-london', soldOut: true },
  { id: 't04', date: '2026-10-11', location: 'Paris, France', venue: 'La Machine du Moulin Rouge', ticketUrl: 'https://tickets.example.com/moroii-paris', soldOut: false },
  { id: 't05', date: '2026-10-24', location: 'Stockholm, Sweden', venue: 'Slaktkyrkan', ticketUrl: 'https://tickets.example.com/moroii-stockholm', soldOut: false },
  { id: 't06', date: '2026-11-07', location: 'Los Angeles, USA', venue: 'The Regent', ticketUrl: 'https://tickets.example.com/moroii-la', soldOut: false },
]

export const mockMerchItems: MerchItem[] = [
  { id: 'm01', name: 'Moroii — Logo Tee', price: 32, currency: 'USD', tag: 'new', available: true, placeholder: true },
  { id: 'm02', name: 'Nightdrive Hoodie', price: 68, currency: 'USD', available: true, placeholder: true },
  { id: 'm03', name: 'VHS Tape — Live in Berlin', price: 24, currency: 'USD', tag: 'preorder', available: true, placeholder: true },
  { id: 'm04', name: 'Analog Grain Cap', price: 28, currency: 'USD', available: true, placeholder: true },
  { id: 'm05', name: 'Vinyl — Bloodmoon EP', price: 36, currency: 'USD', tag: 'sold-out', available: false, placeholder: true },
  { id: 'm06', name: 'Enamel Pin Set', price: 16, currency: 'USD', available: true, placeholder: true },
]
