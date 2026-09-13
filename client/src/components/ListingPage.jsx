import { useCallback, useState } from 'react'
import BookingCard from './BookingCard'
import Gallery from './Gallery'
import Header from './Header'
import Icon from './Icon'
import PhotoModal from './PhotoModal'
import { formatPrice, listing } from '../data/listing'

function ActionButton({ icon, children, active = false, highlighted = false, onClick }) {
  return <button className={`listing-action ${active ? 'active' : ''} ${highlighted ? 'highlighted' : ''}`} type="button" onClick={onClick}><Icon name={icon} size={18} /> <span>{children}</span></button>
}

function Avatar({ children = 'M' }) {
  return <span className="host-avatar" aria-hidden="true">{children}</span>
}

function MapCard() {
  return (
    <div className="map-card" role="img" aria-label="Map showing the stay in Candolim, Goa">
      <div className="map-road road-one" />
      <div className="map-road road-two" />
      <div className="map-road road-three" />
      <div className="map-water" />
      <div className="map-pin"><Icon name="pin" size={21} /></div>
      <div className="map-label">Candolim</div>
    </div>
  )
}

export default function ListingPage() {
  const [saved, setSaved] = useState(false)
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' })
  const [guests, setGuests] = useState(1)
  const [modal, setModal] = useState(null)
  const [descriptionOpen, setDescriptionOpen] = useState(false)
  const [toast, setToast] = useState('')
  const [shareActive, setShareActive] = useState(false)

  const onToast = useCallback(() => {}, [])

  const showToast = useCallback((message) => {
    setToast(message)
    window.setTimeout(() => setToast(''), 2800)
  }, [])

  const handleShare = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href)
    } catch { /* Sharing is visual-only for this frontend. */ }
    setShareActive(true)
    window.setTimeout(() => setShareActive(false), 2800)
    showToast('Share options')
  }

  const handleReserve = ({ nights, total }) => {
    if (!dates.checkIn || !dates.checkOut) {
      onToast('Choose your dates to continue')
      return
    }
    onToast(`Reservation ready — ${nights} ${nights === 1 ? 'night' : 'nights'} for ${listing.currency}${formatPrice(total)}`)
  }

  if (!listing) {
    return (
      <div className="state-page">
        <div className="state-card">
          <Icon name="sparkles" size={28} />
          <h1>We couldn't find this stay</h1>
          <p>Try returning to the search page and choosing another listing.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="app-shell" id="top">
      <Header />
      <main>
        <div className="page-container">
          <div className="listing-heading">
            <div>
              <p className="eyebrow">Goa, India · Guest favourite</p>
              <h1>{listing.title}</h1>
            </div>
            <div className="listing-actions" aria-label="Listing actions">
              <ActionButton icon="share" highlighted={shareActive} onClick={handleShare}>Share</ActionButton>
              <ActionButton
                icon={saved ? 'filledHeart' : 'heart'}
                active={saved}
                onClick={() => {
                  setSaved((value) => !value)
                  showToast(saved ? 'Removed from wishlist' : 'Saved to wishlist')
                }}
              >
                {saved ? 'Saved' : 'Save'}
              </ActionButton>
            </div>
          </div>

          <Gallery
            photos={listing.photos}
            onOpenPhoto={(index) => {
              const photo = listing.photos[index]
              setModal({
                mode: 'tour',
                index: 0,
                tourCategoryId: photo?.tourCategoryId,
                tourPhotoIndex: photo?.tourPhotoIndex,
              })
            }}
            onOpenTour={() => setModal({ mode: 'tour', index: 0 })}
          />

          <div className="listing-layout">
            <div className="listing-main-column">
              <section className="summary-section" aria-labelledby="summary-title">
                <div className="summary-heading">
                  <div>
                    <h2 id="summary-title">{listing.propertyType} in {listing.location}</h2>
                    <p className="summary-meta">{listing.guests} guests <span>·</span> {listing.bedrooms} bedroom <span>·</span> {listing.beds} bed <span>·</span> {listing.bathrooms} bathroom</p>
                  </div>
                  <div className="summary-host">
                    <Avatar>{listing.host.avatar}</Avatar>
                    <div><span>Hosted by</span><strong>{listing.host.name}</strong><span>{listing.host.yearsHosting} years hosting</span></div>
                  </div>
                </div>

                <div className="highlight-card">
                  <div className="highlight-icon"><Icon name="sparkles" size={20} /></div>
                  <div><strong>Guest favourite</strong><p>One of the most loved homes on Airbnb, according to guests</p></div>
                  <div className="highlight-stat"><strong>{listing.rating}</strong><span><Icon name="star" size={11} /> rating</span></div>
                  <div className="highlight-stat"><strong>{listing.reviews}</strong><span>reviews</span></div>
                </div>
              </section>

              <section className="section-block sleep-section" aria-labelledby="sleep-title">
                <h2 id="sleep-title">Where you'll sleep</h2>
                <div className="sleep-card">
                  <img src="/bedroom/one.jpg" alt="Bedroom" loading="lazy" />
                  <h3>Bedroom</h3>
                  <p>1 queen bed</p>
                </div>
              </section>

              <section className="section-block amenities-section" aria-labelledby="amenities-title">
                <h2 id="amenities-title">What this place offers</h2>
                <div className="amenities-grid">
                  {listing.amenities.map((amenity) => <div className="amenity" key={amenity.label}><Icon name={amenity.icon} size={23} /><span>{amenity.label}</span></div>)}
                </div>
                <button className="outline-button" type="button" onClick={() => onToast('All amenities are shown on this page')}>Show all amenities</button>
              </section>

              <section className="section-block description-section" aria-labelledby="description-title">
                <h2 id="description-title">About this place</h2>
                <p className={descriptionOpen ? '' : 'description-truncated'}>{listing.description}</p>
                <button className="text-button" type="button" onClick={() => setDescriptionOpen((open) => !open)}>{descriptionOpen ? 'Show less' : 'Show more'} <Icon name="chevronRight" size={15} /></button>
              </section>

              <section className="section-block location-section" aria-labelledby="location-title">
                <h2 id="location-title">Where you'll be</h2>
                <p className="location-name">{listing.location}</p>
                <p className="location-copy">Stay close to Candolim beach, local cafés, and the easy-going North Goa coastline.</p>
                <MapCard />
              </section>

              <section className="section-block rules-section" aria-labelledby="rules-title">
                <h2 id="rules-title">Things to know</h2>
                <div className="rules-grid">
                  <div><h3>House rules</h3>{listing.houseRules.map((rule) => <p key={rule}><Icon name="check" size={16} />{rule}</p>)}</div>
                  <div><h3>Safety & property</h3><p><Icon name="lock" size={16} />Exterior security cameras on property</p><p><Icon name="check" size={16} />Carbon monoxide alarm</p></div>
                </div>
              </section>
            </div>

            <div className="listing-sidebar">
              <div className="sidebar-offer"><Icon name="sparkles" size={19} /><span><strong>10% off your next stay.</strong><br /><button type="button" onClick={() => onToast('Offer details copied')}>Terms apply.</button></span><button type="button" onClick={() => onToast('Discount claimed')}>Claim</button></div>
              <BookingCard listing={listing} dates={dates} setDates={setDates} guests={guests} setGuests={setGuests} onReserve={handleReserve} />
            </div>
          </div>
        </div>
      </main>

      <div className="mobile-reserve-bar">
        <div><strong>{listing.currency}{formatPrice(listing.price)}</strong> <span>night</span><small>★ {listing.rating}</small></div>
        <button type="button" onClick={() => document.querySelector('.booking-card')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}>Reserve</button>
      </div>

      {modal && <PhotoModal initialIndex={modal.index} mode={modal.mode} initialCategoryId={modal.tourCategoryId} initialPhotoIndex={modal.tourPhotoIndex} onClose={() => setModal(null)} onChangeMode={(mode) => setModal((current) => ({ ...current, mode }))} />}
      <div className={`toast ${toast ? 'visible' : ''}`} role="status" aria-live="polite">{toast}</div>
    </div>
  )
}
