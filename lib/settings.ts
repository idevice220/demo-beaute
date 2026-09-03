import { prisma } from './prisma'
import { DEFAULT_SETTINGS, DEFAULT_HOURS } from './seed-data'
import { parseHoursConfig, toMap, hoursRows, type HoursConfigRow, type HoursMap, type HoursRow } from './hours'

export type SettingsMap = Record<string, string>

export async function getSettings(tenant: string): Promise<SettingsMap> {
  const rows = await prisma.setting.findMany({ where: { tenant } })
  const map: SettingsMap = { ...DEFAULT_SETTINGS }
  for (const r of rows) map[r.key] = r.value
  return map
}

export type Site = {
  name: string
  tagline: string
  city: string
  phone: string
  tel: string
  email: string
  address: string
  maps: string
  instagram: string
  instagramHandle: string
  rating: number
  reviewsCount: number
  since: string
  hero: { title: string; accent: string; text: string; image: string; cardTitle: string; cardText: string; badge: string }
  marquee: string[]
  offer: { on: boolean; text: string }
  giftAmounts: number[]
  fidelity: { on: boolean; title: string; text: string }
  access: { train: string; parking: string }
  footerText: string
  newsletterTitle: string
  hoursConfig: HoursConfigRow[]
  hours: HoursMap
  hoursRows: HoursRow[]
}

const lines = (s: string) => s.split('\n').map((l) => l.trim()).filter(Boolean)
const telHref = (phone: string) => 'tel:+33' + phone.replace(/\D/g, '').replace(/^0/, '')

export function toSite(s: SettingsMap): Site {
  const hoursConfig = parseHoursConfig(s.hours, DEFAULT_HOURS)
  return {
    name: s.name,
    tagline: s.tagline,
    city: s.city,
    phone: s.phone,
    tel: telHref(s.phone),
    email: s.email,
    address: s.address,
    maps: s.maps,
    instagram: s.instagram || '#',
    instagramHandle: s.instagram_handle,
    rating: Number(s.rating.replace(',', '.')) || 5,
    reviewsCount: Number(s.reviews_count) || 0,
    since: s.since,
    hero: { title: s.hero_title, accent: s.hero_accent, text: s.hero_text, image: s.hero_image || '/images/hero.jpg', cardTitle: s.hero_card_title, cardText: s.hero_card_text, badge: s.hero_badge },
    marquee: lines(s.marquee),
    offer: { on: s.offer_on !== 'false', text: s.offer_text },
    giftAmounts: s.gift_amounts.split(',').map((n) => Number(n.trim())).filter((n) => n > 0),
    fidelity: { on: s.fidelity_on !== 'false', title: s.fidelity_title, text: s.fidelity_text },
    access: { train: s.access_train, parking: s.access_parking },
    footerText: s.footer_text,
    newsletterTitle: s.newsletter_title,
    hoursConfig,
    hours: toMap(hoursConfig),
    hoursRows: hoursRows(hoursConfig),
  }
}
