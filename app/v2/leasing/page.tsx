import type { Metadata } from 'next'
import { LeasingExperience } from './_LeasingExperience'

export const metadata: Metadata = {
  title: 'Leasing — Protech',
  description:
    '0% finance for Mongolian businesses. 12, 24, or 36-month terms. No collateral on fleets under 50 devices.',
}

export default function LeasingPage() {
  return <LeasingExperience />
}
