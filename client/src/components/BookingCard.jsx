import { useMemo, useState } from 'react'
import Icon from './Icon'
import { formatPrice } from '../data/listing'

function getNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 5
  const start = new Date(`${checkIn}T12:00:00`)
  const end = new Date(`${checkOut}T12:00:00`)
  return Math.max(1, Math.round((end - start) / 86400000))
}

export default function BookingCard({ listing, dates, setDates, guests, setGuests, onReserve }) {
  const [guestOpen, setGuestOpen] = useState(false)
  const nights = useMemo(() => getNights(dates.checkIn, dates.checkOut), [dates.checkIn, dates.checkOut])
  const stayTotal = listing.price * nights
  const total = stayTotal + listing.cleaningFee + listing.serviceFee

  const updateDate = (key, value) => {
    setDates((current) => ({ ...current, [key]: value }))
  }

  const changeGuests = (amount) => {
    setGuests((current) => Math.min(guestLimit, Math.max(1, current + amount)))
  }

  const guestLimit = listing.guests

  return (
    <aside className="booking-card" aria-label="Reserve this stay">
      <div className="booking-price-row">
        <div><strong>{listing.currency}{formatPrice(listing.price)}</strong> <span>night</span></div>
        <span className="booking-rating"><Icon name="star" size={13} /> {listing.rating} · {listing.reviews} reviews</span>
      </div>
      <div className="date-grid">
        <label className="date-control">
          <span>CHECK-IN</span>
          <input type="date" value={dates.checkIn} onChange={(event) => updateDate('checkIn', event.target.value)} aria-label="Check-in date" />
        </label>
        <label className="date-control">
          <span>CHECKOUT</span>
          <input type="date" min={dates.checkIn || undefined} value={dates.checkOut} onChange={(event) => updateDate('checkOut', event.target.value)} aria-label="Checkout date" />
        </label>
      </div>
      <div className="guest-control-wrap">
        <button className="guest-control" type="button" aria-expanded={guestOpen} onClick={() => setGuestOpen((open) => !open)}>
          <span><small>GUESTS</small>{guests} {guests === 1 ? 'guest' : 'guests'}</span>
          <Icon name="chevronDown" size={17} />
        </button>
        {guestOpen && (
          <div className="guest-popover" role="dialog" aria-label="Choose guests">
            <div>
              <strong>Guests</strong>
              <span>Maximum {guestLimit}</span>
            </div>
            <div className="guest-stepper">
              <button type="button" aria-label="Remove one guest" disabled={guests <= 1} onClick={() => changeGuests(-1)}><Icon name="minus" size={16} /></button>
              <output aria-live="polite">{guests}</output>
              <button type="button" aria-label="Add one guest" disabled={guests >= guestLimit} onClick={() => changeGuests(1)}><Icon name="plus" size={16} /></button>
            </div>
          </div>
        )}
      </div>
      <button className="reserve-button" type="button" onClick={() => onReserve({ nights, total })}>Reserve</button>
      <p className="no-charge-note">You won't be charged yet</p>
      <div className="price-breakdown">
        <div><span>{listing.currency}{formatPrice(listing.price)} × {nights} {nights === 1 ? 'night' : 'nights'}</span><span>{listing.currency}{formatPrice(stayTotal)}</span></div>
        <div><span>Service fee</span><span>{listing.currency}{formatPrice(listing.serviceFee)}</span></div>
        <div className="total-line"><strong>Total before taxes</strong><strong>{listing.currency}{formatPrice(total)}</strong></div>
      </div>
    </aside>
  )
}

export { getNights }
