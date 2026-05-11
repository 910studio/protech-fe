import type { Metadata } from 'next'
import { V2Nav } from './_components/V2Nav'
import { V2Footer } from './_components/V2Footer'
import { SmoothScroll } from './_components/SmoothScroll'
import { ScrollBend } from './_components/ScrollBend'
import { HourglassPinch } from './_components/HourglassPinch'

export const metadata: Metadata = {
  title: 'Protech — Built for Mongolia\'s enterprises',
}

export default function V2Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-white text-[#1d1d1f]">
      <SmoothScroll />
      <V2Nav />
      <ScrollBend>{children}</ScrollBend>
      <V2Footer />
      <HourglassPinch />
    </div>
  )
}
