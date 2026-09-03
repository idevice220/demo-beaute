/**
 * Registre des collections éditables : nom d'URL → modèle Prisma + validation (serveur uniquement).
 */
import { z } from 'zod'

const bool = z.boolean().optional()
const int = z.coerce.number().int()
const num = z.coerce.number()
const str = z.string().trim()
const opt = z.string().trim().optional().nullable().transform((v) => (v ? v : null))

export const RESOURCES = {
  categories: {
    model: 'category', orderable: true,
    schema: z.object({ name: str.min(1), image: str.min(1, 'Une photo est nécessaire'), blurb: str, visible: bool }),
  },
  soins: {
    model: 'soin', orderable: true,
    schema: z.object({ categoryId: int.positive(), name: str.min(1), desc: str.optional().default(''), min: int.positive(), price: num.min(0), signature: bool, isNew: bool, visible: bool }),
  },
  rituels: {
    model: 'rituel', orderable: true,
    schema: z.object({ name: str.min(1), sub: str.min(1), min: int.positive(), price: num.min(0), was: z.coerce.number().optional().nullable().transform((v) => (v ? v : null)), items: z.array(str).optional(), image: str.min(1, 'Une photo est nécessaire'), visible: bool }),
  },
  team: {
    model: 'teamMember', orderable: true,
    schema: z.object({ name: str.min(1), role: str.min(1), spec: str.min(1), image: str.min(1, 'Une photo est nécessaire'), years: int.min(0), visible: bool }),
  },
  gallery: {
    model: 'galleryItem', orderable: true,
    schema: z.object({ src: str.min(1, 'Une photo est nécessaire'), alt: str.min(1), tall: bool, visible: bool }),
  },
  reviews: {
    model: 'review', orderable: true,
    schema: z.object({ name: str.min(1), date: str.min(1), text: str.min(1), soin: str.min(1), rating: int.min(1).max(5).optional(), visible: bool }),
  },
  faq: {
    model: 'faqItem', orderable: true,
    schema: z.object({ q: str.min(1), a: str.min(1), visible: bool }),
  },
  bookings: {
    model: 'booking', orderable: false,
    schema: z.object({ status: z.enum(['confirmed', 'done', 'cancelled']) }),
  },
  gifts: {
    model: 'giftOrder', orderable: false,
    schema: z.object({ status: z.enum(['new', 'sent']) }),
  },
  subscribers: {
    model: 'subscriber', orderable: false,
    schema: z.object({}),
  },
} as const

export type ResourceName = keyof typeof RESOURCES
export function getResource(name: string) {
  return (RESOURCES as Record<string, (typeof RESOURCES)[ResourceName] | undefined>)[name]
}
// `opt` conservé pour d'éventuels champs facultatifs
void opt
