import type { Metadata } from 'next'
import { LegalPage } from '../_LegalPage'

export const metadata: Metadata = { title: 'Sales terms — Protech' }

export default function SalesTerms() {
  return (
    <LegalPage
      kicker="Legal · Sales"
      title="Sales terms"
      updated="2026-04-01"
      back={{ href: '/v2/legal', label: 'Back to legal' }}
      sections={[
        {
          heading: 'Warranty',
          body: 'Every device sold by Protech carries the manufacturer warranty plus our two-year warranty extension on fleet purchases. AppleCare+ is included on every fleet Apple device. Lenovo Premier Support is bundled on every ThinkPad-class device sold through fleet. Warranty does not cover physical damage, liquid damage, or unauthorized modification.',
        },
        {
          heading: 'Returns',
          body: 'Standard retail orders may be returned within 14 days, unopened, for a full refund (less courier fees). Opened devices are subject to a 15% restocking fee, charged at our discretion based on device condition. Fleet and leasing orders are non-refundable once dispatched, but covered by warranty + loaner programs.',
        },
        {
          heading: 'Fleet purchase orders',
          body: 'Fleet POs are governed by a separate Master Fleet Agreement (MFA) signed at the start of the engagement. The MFA covers volume pricing, MDM enrollment, warranty escalation paths, and SLA targets. Each PO references the MFA by number.',
        },
        {
          heading: 'Leasing',
          body: 'Leasing contracts (12, 24, or 36 month) are governed by a separate Lease Agreement signed by both parties. 0% APR applies to 12 and 24 month terms; 36 month carries 2.9% APR. Early termination is permitted with 60 days notice — remaining principal becomes due in full, less the trade-in value of returned hardware.',
        },
        {
          heading: 'Trade-in',
          body: 'Trade-in credit is set at on-site assessment by a Protech engineer. Indicative values listed on /v2/fleet/trade-in are refreshed monthly. Credit applies to your next PO; cash payouts are not offered. Devices we cannot resell are recycled responsibly through a certified e-waste partner in Bayanzürkh.',
        },
        {
          heading: 'Delivery',
          body: 'Inside Ulaanbaatar: same-day or next business day. Aimags: 3—5 business days via Tushig. Fleet onboarding (configured + imaged + delivered) targets 5 business days from PO receipt.',
        },
        {
          heading: 'Payment',
          body: 'Bank transfer (Khan Bank, Golomt, TDB), POS card, or invoiced terms (NET-30 after credit check) for fleet customers. We do not accept cash above ₮5M per single transaction.',
        },
      ]}
    />
  )
}
