const paths = {
  search: <><circle cx="11" cy="11" r="6.5" /><path d="m16 16 4.5 4.5" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.3 2.4 3.2 5.4 3.2 9s-.9 6.6-3.2 9c-2.3-2.4-3.2-5.4-3.2-9S9.7 5.4 12 3Z" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  share: <><path d="M12 16V3m0 0L7.5 7.5M12 3l4.5 4.5" /><path d="M5 11v8h14v-8" /></>,
  heart: <path d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />,
  filledHeart: <path fill="currentColor" stroke="none" d="M20.8 8.8c0 5.2-8.8 10.2-8.8 10.2S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.2a4.8 4.8 0 0 1 8.8 2.6Z" />,
  grid: <><circle cx="5" cy="5" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="5" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="5" r="1" fill="currentColor" stroke="none" /><circle cx="5" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1" fill="currentColor" stroke="none" /><circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" /><circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" /><circle cx="19" cy="19" r="1" fill="currentColor" stroke="none" /></>,
  chevronDown: <path d="m5 9 7 7 7-7" />,
  chevronLeft: <path d="m15 5-7 7 7 7" />,
  chevronRight: <path d="m9 5 7 7-7 7" />,
  x: <><path d="m5 5 14 14M19 5 5 19" /></>,
  plus: <><path d="M12 5v14M5 12h14" /></>,
  minus: <path d="M5 12h14" />,
  calendar: <><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M7 3v4M17 3v4M3.5 9h17" /></>,
  user: <><circle cx="12" cy="8" r="3.2" /><path d="M5 20c.7-3.2 3.1-5 7-5s6.3 1.8 7 5" /></>,
  pin: <><path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
  star: <path fill="currentColor" stroke="none" d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />,
  wifi: <><path d="M3.5 9.5a13 13 0 0 1 17 0M6.5 13a8.5 8.5 0 0 1 11 0M9.7 16.2a4 4 0 0 1 4.6 0" /><circle cx="12" cy="19.3" r=".8" fill="currentColor" stroke="none" /></>,
  tv: <><rect x="3" y="5" width="18" height="12" rx="1.5" /><path d="M8 21h8M12 17v4" /></>,
  kitchen: <><path d="M4 20V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15M4 10h16M8 6v1M12 6v1M16 6v1" /></>,
  parking: <><path d="M5 20V4h6.5a4.5 4.5 0 0 1 0 9H5m0-5h6" /></>,
  snowflake: <><path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M7 4.8l5 2.9 5-2.9M7 19.2l5-2.9 5 2.9" /></>,
  washer: <><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="13" r="4" /><path d="M7 6.5h.1M10 6.5h.1" /></>,
  sparkles: <><path d="m12 3 1.3 4.7L18 9l-4.7 1.3L12 15l-1.3-4.7L6 9l4.7-1.3L12 3ZM19 14l.6 2.4L22 17l-2.4.6L19 20l-.6-2.4L16 17l2.4-.6L19 14ZM5 15l.6 2.4L8 18l-2.4.6L5 21l-.6-2.4L2 18l2.4-.6L5 15Z" /></>,
  'hot-tub': <><path d="M4 14h16M5 14v4h14v-4M3 20h18M7 10c0-2 2-2 2-4M12 10c0-2 2-2 2-4M17 10c0-2 2-2 2-4" /></>,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  lock: <><rect x="5" y="10" width="14" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></>,
  image: <><rect x="3.5" y="4" width="17" height="16" rx="2" /><circle cx="8.5" cy="9" r="1.5" /><path d="m4 17 4.5-4 3 2.5 2.2-2 6.3 5" /></>,
}

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] ?? paths.sparkles}
    </svg>
  )
}
