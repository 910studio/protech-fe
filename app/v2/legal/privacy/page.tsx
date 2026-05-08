import type { Metadata } from 'next'
import { LegalPage } from '../_LegalPage'

export const metadata: Metadata = { title: 'Privacy policy — Protech' }

export default function PrivacyPolicy() {
  return (
    <LegalPage
      kicker="Legal · Privacy"
      title="Privacy policy"
      updated="2026-04-01"
      back={{ href: '/v2/legal', label: 'Back to legal' }}
      sections={[
        {
          heading: 'What we collect',
          body: 'We collect the minimum needed to fulfill orders and run leasing/fleet contracts: name, company, tax ID, contact email, phone number, billing address, and device serial numbers for warranty.\n\nWe do not collect browsing analytics beyond aggregate page-view counts. We do not run third-party advertising trackers on this site.',
        },
        {
          heading: 'What we don\'t collect',
          body: 'No personal data beyond the above. No location, no behavioral profiling, no device fingerprinting. No data is sold to third parties — ever.',
        },
        {
          heading: 'Where data lives',
          body: 'Order data, fleet contracts, and leasing files are stored on Mongolian-hosted infrastructure (Datacom DC, Ulaanbaatar). Backups are encrypted at rest with AES-256.',
        },
        {
          heading: 'Who we share with',
          body: 'Only the parties needed to deliver the device or service: shipping partner (Tushig), warranty depots (Apple AASP Seoul, Lenovo Premier, Dell ProSupport), and the bank processing your payment. Each receives only the data needed for their step.',
        },
        {
          heading: 'Your rights',
          body: 'You can request a copy of all data we hold on you, or request deletion (subject to statutory retention for tax records — six years per MN tax code). Email legal@protech.mn and we respond within 14 days.',
        },
        {
          heading: 'Cookies',
          body: 'A single httpOnly session cookie for cart/checkout. No advertising or analytics cookies. No cross-site tracking.',
        },
      ]}
    />
  )
}
