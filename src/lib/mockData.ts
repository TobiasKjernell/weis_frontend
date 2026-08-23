import g01 from '../assets/gallery/moroii-01.jpg'
import g01t from '../assets/gallery/moroii-01-thumb.jpg'
import g02 from '../assets/gallery/moroii-02.jpg'
import g02t from '../assets/gallery/moroii-02-thumb.jpg'
import g03 from '../assets/gallery/moroii-03.jpg'
import g03t from '../assets/gallery/moroii-03-thumb.jpg'
import g04 from '../assets/gallery/moroii-04.jpg'
import g04t from '../assets/gallery/moroii-04-thumb.jpg'
import g05 from '../assets/gallery/moroii-05.jpg'
import g05t from '../assets/gallery/moroii-05-thumb.jpg'
import g06 from '../assets/gallery/moroii-06.jpg'
import g06t from '../assets/gallery/moroii-06-thumb.jpg'
import g07 from '../assets/gallery/moroii-07.jpg'
import g07t from '../assets/gallery/moroii-07-thumb.jpg'
import type { GalleryItem } from '../schemas/galleryItem'
import type { TourDate } from '../schemas/tourDate'
import type { MerchItem } from '../schemas/merchItem'

export const mockGalleryItems: GalleryItem[] = [
  { id: 'g01', src: g01, thumbSrc: g01t, alt: 'Moroii performing live under violet stage light', width: 1067, height: 1600 },
  { id: 'g02', src: g02, thumbSrc: g02t, alt: 'Moroii silhouetted at the synth rig, deep purple haze', width: 1067, height: 1600 },
  { id: 'g03', src: g03, thumbSrc: g03t, alt: 'Moroii backlit on stage, hood up', width: 1067, height: 1600 },
  { id: 'g04', src: g04, thumbSrc: g04t, alt: 'Moroii bathed in red light, hands raised', width: 1066, height: 1600 },
  { id: 'g05', src: g05, thumbSrc: g05t, alt: 'Moroii mid-performance, back logo visible', width: 1067, height: 1600 },
  { id: 'g06', src: g06, thumbSrc: g06t, alt: 'Moroii raising a hand to the crowd', width: 1067, height: 1600 },
  { id: 'g07', src: g07, thumbSrc: g07t, alt: 'Moroii at the keys, monochrome haze', width: 1067, height: 1600 },
]

export const mockTourDates: TourDate[] = [
  { id: 't01', date: '2026-09-12', city: 'Berlin', country: 'Germany', venue: 'Urban Spree', ticketUrl: 'https://tickets.example.com/moroii-berlin', soldOut: false },
  { id: 't02', date: '2026-09-19', city: 'Warsaw', country: 'Poland', venue: 'Hydrozagadka', ticketUrl: 'https://tickets.example.com/moroii-warsaw', soldOut: false },
  { id: 't03', date: '2026-10-03', city: 'London', country: 'UK', venue: 'The Dome', ticketUrl: 'https://tickets.example.com/moroii-london', soldOut: true },
  { id: 't04', date: '2026-10-11', city: 'Paris', country: 'France', venue: 'La Machine du Moulin Rouge', ticketUrl: 'https://tickets.example.com/moroii-paris', soldOut: false },
  { id: 't05', date: '2026-10-24', city: 'Stockholm', country: 'Sweden', venue: 'Slaktkyrkan', ticketUrl: 'https://tickets.example.com/moroii-stockholm', soldOut: false },
  { id: 't06', date: '2026-11-07', city: 'Los Angeles', country: 'USA', venue: 'The Regent', ticketUrl: 'https://tickets.example.com/moroii-la', soldOut: false },
]

export const mockMerchItems: MerchItem[] = [
  { id: 'm01', name: 'Moroii — Logo Tee', price: 32, currency: 'USD', tag: 'new', available: true, placeholder: true },
  { id: 'm02', name: 'Nightdrive Hoodie', price: 68, currency: 'USD', available: true, placeholder: true },
  { id: 'm03', name: 'VHS Tape — Live in Berlin', price: 24, currency: 'USD', tag: 'preorder', available: true, placeholder: true },
  { id: 'm04', name: 'Analog Grain Cap', price: 28, currency: 'USD', available: true, placeholder: true },
  { id: 'm05', name: 'Vinyl — Bloodmoon EP', price: 36, currency: 'USD', tag: 'sold-out', available: false, placeholder: true },
  { id: 'm06', name: 'Enamel Pin Set', price: 16, currency: 'USD', available: true, placeholder: true },
]
