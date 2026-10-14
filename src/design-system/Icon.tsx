import clsx from 'clsx'

export type IconName =
  | 'sun'
  | 'moon'
  | 'turtle'
  | 'send'
  | 'close'
  | 'chat'
  | 'check'
  | 'paperclip'
  | 'plane'
  | 'plane-landing'
  | 'cloud'
  | 'radar'
  | 'globe'
  | 'alert-triangle'
  | 'stethoscope'
  | 'document'
  | 'menu'
  | 'search'
  | 'user'
  | 'wind'
  | 'drop'
  | 'alert-octagon'
  | 'circle-dot'

const paths: Record<IconName, string> = {
  sun: 'M12 4V2M12 22v-2M4.93 4.93 3.5 3.5M20.5 20.5l-1.43-1.43M4 12H2M22 12h-2M4.93 19.07 3.5 20.5M20.5 3.5l-1.43 1.43M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z',
  turtle: 'M4 13c0-3 2.5-5 6-5s6 2 6 5-1 4-3 4h-1v2a1 1 0 0 1-2 0v-2H9a1 1 0 0 0-1 1v1a1 1 0 0 1-2 0v-1.6A4.4 4.4 0 0 1 4 13ZM16 10l3-1.5M16 13h3M8 8 6 6m8 2 1.5-2.5',
  send: 'm3 11 18-8-8 18-2-8-8-2Z',
  close: 'M6 6l12 12M18 6 6 18',
  chat: 'M4 4.5h16a1 1 0 0 1 1 1V16a1 1 0 0 1-1 1H9l-4.5 4V17H4a1 1 0 0 1-1-1V5.5a1 1 0 0 1 1-1Z',
  check: 'm4 12 5 5L20 6',
  paperclip: 'M8 12.5V7a4 4 0 1 1 8 0v9a2.5 2.5 0 0 1-5 0V8',
  plane: 'M10.5 20.5 12 15l-7 1.5v-2L12 11V5a1.5 1.5 0 0 1 3 0v6l7 3.5v2L15 15l1.5 5.5-1.5-1-1.5 1-1.5-1-1.5 1Z',
  'plane-landing': 'M3 20h18M6 16l4.5-2.5L7 8l2-1 5 4 4.5-2.5a1.4 1.4 0 0 1 1.9.5 1.4 1.4 0 0 1-.5 1.9L15 14l-4 5-2-.5 2-3.5-3.5 2-1.5-1Z',
  cloud: 'M7 18h10a4 4 0 0 0 .5-7.97A5.5 5.5 0 0 0 7.1 11 3.5 3.5 0 0 0 7 18Z',
  radar: 'M12 12 20 8M12 12v9M12 3a9 9 0 1 1-6.4 15.4M12 7a5 5 0 1 1-3.5 8.5',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.6 9h16.8M3.6 15h16.8M12 3a13.5 13.5 0 0 1 0 18 13.5 13.5 0 0 1 0-18Z',
  'alert-triangle': 'M12 3 2 20h20L12 3ZM12 10v4m0 3h.01',
  stethoscope: 'M6 4v6a4 4 0 0 0 8 0V4M6 4H4.5M14 4h1.5M10 16.5a4.5 4.5 0 1 0 9 0V13M19 13a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  document: 'M7 3h7l4 4v14a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1ZM14 3v4h4M9 13h6M9 17h6M9 9h2',
  menu: 'M4 7h16M4 12h16M4 17h16',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3',
  user: 'M12 12a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM4 21a8 8 0 0 1 16 0',
  wind: 'M3 8h11a2.5 2.5 0 1 0-2.4-3.2M3 12h15a2.5 2.5 0 1 1-2.4 3.2M3 16h8a2 2 0 1 1-1.8 2.8',
  drop: 'M12 3s7 7.2 7 12a7 7 0 1 1-14 0c0-4.8 7-12 7-12Z',
  'alert-octagon': 'M7.9 3h8.2L21 7.9v8.2L16.1 21H7.9L3 16.1V7.9L7.9 3ZM12 8v5m0 3h.01',
  'circle-dot': 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-5.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z',
}

export function Icon({ name, className, strokeWidth = 1.75 }: { name: IconName; className?: string; strokeWidth?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx('h-5 w-5 shrink-0', className)}
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  )
}
