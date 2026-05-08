import type { Metadata } from 'next'
import { LegalPage } from '../_LegalPage'

export const metadata: Metadata = { title: 'Terms of service — Protech' }

export default function TermsOfService() {
  return (
    <LegalPage
      kicker="Legal · Terms"
      title="Terms of service"
      updated="2026-04-01"
      back={{ href: '/v2/legal', label: 'Back to legal' }}
      sections={[
        {
          heading: 'Who we are',
          body: 'Protech LLC is a Mongolian limited liability company registered at улсын бүртгэл №..., headquartered at Olympic St 12, Sükhbaatar district, Ulaanbaatar. Our tax ID is .....',
        },
        {
          heading: 'Using this site',
          body: 'You may browse, shop, and request quotes. You may not scrape, mirror, or republish our content without written permission. Reverse-engineering our pricing or fleet quote logic is prohibited.',
        },
        {
          heading: 'Accounts',
          body: 'Some features (saved carts, fleet quotes) require an account. You\'re responsible for keeping your password safe and for activity under your login. Tell us immediately if you suspect unauthorized access.',
        },
        {
          heading: 'Pricing & availability',
          body: 'Prices are in Mongolian Tugrik (₮) and include VAT where applicable. Stock and pricing change without notice. The price at checkout is the price you pay; if the displayed price is wrong, we may cancel the order and refund.',
        },
        {
          heading: 'Limitation of liability',
          body: 'To the extent permitted by law, our total liability is limited to the amount you paid for the device or service in question over the prior 12 months. We are not liable for indirect or consequential losses (lost profits, business interruption, data loss).',
        },
        {
          heading: 'Governing law',
          body: 'These terms are governed by the laws of Mongolia. Disputes are resolved by the courts of Ulaanbaatar.',
        },
      ]}
    />
  )
}
