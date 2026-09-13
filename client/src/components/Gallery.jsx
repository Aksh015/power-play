import { useState } from 'react'
import Icon from './Icon'

function PhotoImage({ photo, eager = false }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="image-fallback" role="img" aria-label={`${photo.alt} unavailable`}>
        <Icon name="image" size={28} />
        <span>Photo unavailable</span>
      </span>
    )
  }

  return <img src={photo.src} alt={photo.alt} loading={eager ? 'eager' : 'lazy'} onError={() => setFailed(true)} />
}

export default function Gallery({ photos, onOpenPhoto, onOpenTour }) {
  if (!photos?.length) {
    return (
      <div className="gallery-empty" role="status">
        <Icon name="image" size={28} />
        <p>Photos for this stay are not available yet.</p>
      </div>
    )
  }

  const visiblePhotos = photos.slice(0, 5)

  return (
    <section className="hero-gallery" aria-label="Property photos">
      <button className="gallery-tile gallery-main" type="button" onClick={() => onOpenPhoto(0)} aria-label={`Open ${visiblePhotos[0].label} photo`}>
        <PhotoImage photo={visiblePhotos[0]} eager />
      </button>
      <div className="gallery-side">
        {visiblePhotos.slice(1).map((photo, index) => {
          const photoIndex = index + 1
          return (
            <button
              className="gallery-tile"
              type="button"
              key={photo.src}
              onClick={() => onOpenPhoto(photoIndex)}
              aria-label={`Open ${photo.label} photo`}
            >
              <PhotoImage photo={photo} />
            </button>
          )
        })}
      </div>
      {visiblePhotos.length > 1 && (
        <button className="show-photos-button" type="button" onClick={onOpenTour}>
          <Icon name="grid" size={15} strokeWidth={2.2} />
          Show all photos
        </button>
      )}
      <button className="mobile-show-photos" type="button" onClick={onOpenTour}>
        <Icon name="grid" size={15} strokeWidth={2.2} />
        Show all photos
      </button>
    </section>
  )
}

export { PhotoImage }
