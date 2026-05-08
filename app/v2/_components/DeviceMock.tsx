/**
 * SVG-based product placeholders. Replaces real product photography for the
 * moodboard demo. Each variant is sized to drop into the bottom area of a Tile.
 */

type Kind = 'laptop' | 'tablet' | 'phone' | 'watch' | 'earbuds' | 'monitor' | 'fleet'

type Props = {
  kind: Kind
  tone?: 'silver' | 'graphite' | 'gold' | 'blue' | 'natural'
  className?: string
}

const palette = {
  silver:   { body: '#d8d8da', screen: '#1a1a1c', edge: '#9b9ba0' },
  graphite: { body: '#2a2a2d', screen: '#0a0a0c', edge: '#1a1a1d' },
  gold:     { body: '#dccdb6', screen: '#1c1612', edge: '#a8967c' },
  blue:     { body: '#3d4f6b', screen: '#0c1626', edge: '#28344a' },
  natural:  { body: '#c8b693', screen: '#1c1610', edge: '#9a8770' },
} as const

export function DeviceMock({ kind, tone = 'silver', className = '' }: Props) {
  const c = palette[tone]

  if (kind === 'laptop') {
    return (
      <svg viewBox="0 0 320 220" className={className} aria-hidden>
        <defs>
          <linearGradient id="lap-screen" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={c.screen} />
            <stop offset="1" stopColor="#000" />
          </linearGradient>
        </defs>
        {/* lid */}
        <rect x="40" y="20" width="240" height="150" rx="10" fill={c.body} />
        <rect x="48" y="28" width="224" height="134" rx="6" fill="url(#lap-screen)" />
        <circle cx="160" cy="32" r="1.6" fill="#222" />
        {/* keyboard deck */}
        <path
          d="M22 174 L298 174 L308 196 Q308 200 304 200 L16 200 Q12 200 12 196 Z"
          fill={c.edge}
        />
        <path d="M138 196 L182 196 L182 200 L138 200 Z" fill={c.screen} opacity=".55" />
      </svg>
    )
  }

  if (kind === 'tablet') {
    return (
      <svg viewBox="0 0 240 300" className={className} aria-hidden>
        <rect x="20" y="14" width="200" height="270" rx="20" fill={c.body} />
        <rect x="30" y="24" width="180" height="250" rx="12" fill={c.screen} />
      </svg>
    )
  }

  if (kind === 'phone') {
    return (
      <svg viewBox="0 0 200 340" className={className} aria-hidden>
        <rect x="40" y="14" width="120" height="310" rx="22" fill={c.body} />
        <rect x="46" y="20" width="108" height="298" rx="18" fill={c.screen} />
        <rect x="86" y="28" width="28" height="6" rx="3" fill="#000" />
      </svg>
    )
  }

  if (kind === 'watch') {
    return (
      <svg viewBox="0 0 200 240" className={className} aria-hidden>
        {/* strap */}
        <path d="M82 10 L118 10 L122 70 L78 70 Z" fill={c.body} opacity=".7" />
        <path d="M78 170 L122 170 L118 230 L82 230 Z" fill={c.body} opacity=".7" />
        {/* case */}
        <rect x="60" y="68" width="80" height="100" rx="22" fill={c.body} />
        <rect x="68" y="76" width="64" height="84" rx="14" fill={c.screen} />
        <circle cx="146" cy="118" r="4" fill={c.edge} />
      </svg>
    )
  }

  if (kind === 'earbuds') {
    return (
      <svg viewBox="0 0 240 200" className={className} aria-hidden>
        {/* case */}
        <rect x="70" y="80" width="100" height="100" rx="50" fill={c.body} />
        <rect x="86" y="100" width="68" height="6" rx="3" fill={c.screen} opacity=".4" />
        {/* buds */}
        <ellipse cx="60" cy="60" rx="22" ry="30" fill={c.body} transform="rotate(-15 60 60)" />
        <ellipse cx="180" cy="60" rx="22" ry="30" fill={c.body} transform="rotate(15 180 60)" />
        <circle cx="60" cy="48" r="6" fill={c.screen} />
        <circle cx="180" cy="48" r="6" fill={c.screen} />
      </svg>
    )
  }

  if (kind === 'monitor') {
    return (
      <svg viewBox="0 0 320 220" className={className} aria-hidden>
        <rect x="20" y="20" width="280" height="160" rx="6" fill={c.body} />
        <rect x="28" y="28" width="264" height="144" rx="3" fill={c.screen} />
        <path d="M140 180 L180 180 L196 210 L124 210 Z" fill={c.edge} />
      </svg>
    )
  }

  // fleet: stacked devices
  return (
    <svg viewBox="0 0 360 220" className={className} aria-hidden>
      <g opacity=".25">
        <rect x="30" y="40" width="200" height="120" rx="8" fill={c.body} />
      </g>
      <g opacity=".55" transform="translate(50 30)">
        <rect x="30" y="40" width="200" height="120" rx="8" fill={c.body} />
      </g>
      <g transform="translate(100 60)">
        <rect x="30" y="40" width="200" height="120" rx="8" fill={c.body} />
        <rect x="38" y="48" width="184" height="104" rx="4" fill={c.screen} />
      </g>
    </svg>
  )
}
