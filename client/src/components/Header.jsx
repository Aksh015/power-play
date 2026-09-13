import Icon from './Icon'

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="Airbnb home">
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 4c-2 0-3.2 2.3-4.4 5L6.1 21.3C4.5 24.9 6.3 28 9.2 28c2.8 0 4.9-2.3 6.8-6.6 1.9 4.3 4 6.6 6.8 6.6 2.9 0 4.7-3.1 3.1-6.7L20.4 9C19.2 6.3 18 4 16 4Z" stroke="currentColor" strokeWidth="2.5" />
              <path d="M16 14.3c-2 0-3.7 1.7-3.7 3.8S14 22 16 22s3.7-1.8 3.7-3.9-1.7-3.8-3.7-3.8Z" fill="currentColor" />
            </svg>
          </span>
          <span>airbnb</span>
        </a>

        <div className="search-bar-compact" role="search">
          <span className="search-home-icon" aria-hidden="true">🏠</span>
          <button className="search-bar-btn" type="button">Anywhere</button>
          <span className="search-bar-divider" aria-hidden="true" />
          <button className="search-bar-btn" type="button">Anytime</button>
          <span className="search-bar-divider" aria-hidden="true" />
          <button className="search-bar-btn search-bar-btn-muted" type="button">Add guests</button>
          <button className="search-bar-icon" type="submit" aria-label="Search">
            <Icon name="search" size={14} strokeWidth={2.5} />
          </button>
        </div>

        <nav className="header-nav" aria-label="Site navigation">
          <a className="host-link" href="#top">Become a host</a>
          <div className="menu-wrap">
            <button className="nav-icon-btn" type="button" aria-label="Choose language">
              <Icon name="globe" size={18} />
            </button>
            <button
              className="nav-icon-btn"
              type="button"
              aria-label="Open account menu"
            >
              <Icon name="menu" size={18} />
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
