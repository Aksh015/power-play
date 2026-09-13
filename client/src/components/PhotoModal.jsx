import { useEffect, useRef, useState } from 'react'
import Icon from './Icon'
import { photoTourCategories, allPhotos } from '../data/listing'

export default function PhotoModal({ initialIndex = 0, mode = 'tour', initialCategoryId, initialPhotoIndex = 0, onClose, onChangeMode }) {
  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [activeCategoryId, setActiveCategoryId] = useState(photoTourCategories[0].id)
  const [navHidden, setNavHidden] = useState(false)
  const [saved, setSaved] = useState(false)
  const closeRef = useRef(null)
  const scrollBodyRef = useRef(null)
  const activeCategoryLockRef = useRef(false)

  // Manage body scroll and keyboard events
  useEffect(() => {
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (mode === 'lightbox') {
          onChangeMode?.('tour')
        } else {
          onClose()
        }
      }
      if (mode === 'lightbox') {
        if (event.key === 'ArrowRight') {
          setActiveIndex((idx) => (idx + 1) % allPhotos.length)
        }
        if (event.key === 'ArrowLeft') {
          setActiveIndex((idx) => (idx - 1 + allPhotos.length) % allPhotos.length)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mode, onClose, onChangeMode])

  // Keep the active thumbnail aligned with the section start in the modal scroll area.
  useEffect(() => {
    if (mode !== 'tour') return

    const scrollBody = scrollBodyRef.current
    if (!scrollBody) return

    const updateActiveCategory = () => {
      setNavHidden(scrollBody.scrollTop > 12)
      if (activeCategoryLockRef.current) return

      const reachedCategory = photoTourCategories.reduce((current, cat) => {
        const element = document.getElementById(`tour-category-${cat.id}`)
        return element && element.offsetTop <= scrollBody.scrollTop + 24 ? cat.id : current
      }, photoTourCategories[0].id)
      setActiveCategoryId(reachedCategory)
    }

    scrollBody.addEventListener('scroll', updateActiveCategory, { passive: true })
    updateActiveCategory()

    return () => scrollBody.removeEventListener('scroll', updateActiveCategory)
  }, [mode])

  // When opened from a homepage image, land on that image in the scrollable tour.
  useEffect(() => {
    if (mode !== 'tour' || !initialCategoryId) return

    const scrollBody = scrollBodyRef.current
    if (!scrollBody) return

    const frame = window.requestAnimationFrame(() => {
      const category = photoTourCategories.find((cat) => cat.id === initialCategoryId)
      const target = document.getElementById(`tour-photo-${initialCategoryId}-${initialPhotoIndex}`)
      if (!category || !target) return

      const targetTop = target.getBoundingClientRect().top - scrollBody.getBoundingClientRect().top + scrollBody.scrollTop
      activeCategoryLockRef.current = true
      setActiveCategoryId(category.id)
      scrollBody.scrollTo({ top: Math.max(0, targetTop - 24), behavior: 'auto' })
      window.setTimeout(() => {
        activeCategoryLockRef.current = false
      }, 2000)
    })

    return () => window.cancelAnimationFrame(frame)
  }, [mode, initialCategoryId, initialPhotoIndex])

  const scrollToCategory = (categoryId) => {
    setActiveCategoryId(categoryId)
    activeCategoryLockRef.current = true
    window.setTimeout(() => {
      activeCategoryLockRef.current = false
    }, 2000)
    const element = document.getElementById(`tour-category-${categoryId}`)
    if (element && scrollBodyRef.current) {
      scrollBodyRef.current.scrollTo({
        top: Math.max(0, element.offsetTop - 24),
        behavior: 'smooth',
      })
    }
  }

  const openLightbox = (photoIdx) => {
    setActiveIndex(photoIdx)
    onChangeMode?.('lightbox')
  }

  const goToNextPhoto = () => {
    setActiveIndex((idx) => (idx + 1) % allPhotos.length)
  }

  const goToPrevPhoto = () => {
    setActiveIndex((idx) => (idx - 1 + allPhotos.length) % allPhotos.length)
  }

  const currentPhoto = allPhotos[activeIndex] ?? allPhotos[0]
  const mainPhotoCategories = photoTourCategories.filter((cat) => cat.id !== 'additional-photos')
  const additionalPhotoCategory = photoTourCategories.find((cat) => cat.id === 'additional-photos')

  const renderCategoryThumbnail = (cat) => {
    const isActive = activeCategoryId === cat.id
    return (
      <button
        key={cat.id}
        type="button"
        className={`category-thumb-card ${isActive ? 'active' : ''}`}
        onClick={() => scrollToCategory(cat.id)}
      >
        <div className="category-thumb-img-box">
          <img src={cat.thumbnail} alt={cat.title} loading="lazy" />
        </div>
        <span className="category-thumb-title">{cat.title}</span>
      </button>
    )
  }

  if (mode === 'lightbox') {
    return (
      <div className="photo-modal lightbox-modal" role="dialog" aria-modal="true" aria-label="Photo viewer">
        <div className="lightbox-topbar">
          <button
            className="lightbox-back-btn"
            type="button"
            onClick={() => onChangeMode?.('tour')}
          >
            <Icon name="grid" size={16} /> Photo tour
          </button>
          <span className="lightbox-photo-label">{currentPhoto.label}</span>
          <div className="lightbox-right-actions">
            <span className="photo-count">{activeIndex + 1} / {allPhotos.length}</span>
            <button
              className="modal-close"
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close photo viewer"
            >
              <Icon name="x" size={22} />
            </button>
          </div>
        </div>

        <div className="photo-modal-stage" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
          <button
            className="modal-arrow modal-arrow-left"
            type="button"
            aria-label="Previous photo"
            onClick={goToPrevPhoto}
          >
            <Icon name="chevronLeft" size={24} />
          </button>
          <figure className="modal-photo-wrap">
            <img src={currentPhoto.src} alt={currentPhoto.alt || currentPhoto.label} />
            <figcaption>{currentPhoto.label}</figcaption>
          </figure>
          <button
            className="modal-arrow modal-arrow-right"
            type="button"
            aria-label="Next photo"
            onClick={goToNextPhoto}
          >
            <Icon name="chevronRight" size={24} />
          </button>
        </div>
      </div>
    )
  }

  // Tour Mode: Scrollable photo tour with category navigation and sticky left-column titles
  return (
    <div className="photo-tour-overlay" role="dialog" aria-modal="true" aria-label="Photo tour">
      {/* Top Header */}
      <header className="photo-tour-header">
        <button
          className="photo-tour-icon-btn photo-tour-back"
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Back to listing"
        >
          <Icon name="chevronLeft" size={20} />
        </button>
        <div className="photo-tour-header-title">Photo tour</div>
        <div className="photo-tour-header-actions">
          <button
            className="photo-tour-icon-btn"
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(window.location.href)
            }}
            aria-label="Share photo tour"
          >
            <Icon name="share" size={18} />
          </button>
          <button
            className="photo-tour-icon-btn"
            type="button"
            onClick={() => setSaved((s) => !s)}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Icon name={saved ? 'filledHeart' : 'heart'} size={18} />
          </button>
        </div>
      </header>

      {/* Horizontal Category Thumbnails Bar */}
      <div className={`photo-tour-nav-bar ${navHidden ? 'is-hidden' : ''}`}>
        <div className="photo-tour-nav-container">
          <div className="photo-tour-nav-row">
            {mainPhotoCategories.map(renderCategoryThumbnail)}
          </div>
          {additionalPhotoCategory && (
            <div className="photo-tour-nav-row photo-tour-nav-row-additional">
              {renderCategoryThumbnail(additionalPhotoCategory)}
            </div>
          )}
          </div>
        </div>

      {/* Scrollable Room Sections Container */}
      <div className="photo-tour-scroll-body" ref={scrollBodyRef}>
        <div className="photo-tour-content-wrapper">
          {photoTourCategories.map((cat) => {
            const categoryGlobalPhotoOffset = photoTourCategories
              .slice(0, photoTourCategories.indexOf(cat))
              .reduce((acc, item) => acc + item.photos.length, 0)

            const renderCategoryPhoto = (photoIdx, variant = 'sub') => {
              const photo = cat.photos[photoIdx]
              if (!photo) return null

              const classes = ['tour-photo-wrapper', variant]
              if (variant === 'sub') {
                if (cat.id === 'bedroom' && photoIdx === 3) classes.push('bedroom-featured')
                if (cat.id === 'exterior' && photoIdx === 3) classes.push('exterior-featured')
                if (cat.id === 'additional-photos' && [3, 6, 9].includes(photoIdx)) classes.push('additional-photos-featured')
              }

              const globalIdx = categoryGlobalPhotoOffset + photoIdx
              return (
                <div
                  key={photoIdx}
                  id={`tour-photo-${cat.id}-${photoIdx}`}
                  className={classes.join(' ')}
                  onClick={() => openLightbox(globalIdx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${cat.title} photo ${photoIdx + 1} in full screen`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
              )
            }

            return (
              <section
                key={cat.id}
                id={`tour-category-${cat.id}`}
                className="photo-tour-room-section"
              >
                {/* Left Column: Room info, STICKY as user scrolls right column photos */}
                <div className="room-info-column">
                  <div className="room-info-sticky">
                    <h2 className="room-title">{cat.title}</h2>
                    <p className="room-amenities">{cat.amenities}</p>
                  </div>
                </div>

                {/* Right Column: Photos layout (1 main + 2 sub grid) */}
                <div className="room-photos-column">
                  {cat.id === 'full-kitchen' ? (
                    <div className="tour-photos-subgrid">
                      {cat.photos.map((_, photoIdx) => renderCategoryPhoto(photoIdx))}
                    </div>
                  ) : cat.id === 'living-room-2' ? (
                    <>
                      {renderCategoryPhoto(0, 'featured')}
                      <div className="tour-photos-subgrid">
                        {[1, 2].map((photoIdx) => renderCategoryPhoto(photoIdx))}
                      </div>
                      {renderCategoryPhoto(3, 'featured')}
                      <div className="tour-photos-subgrid">
                        {[4, 5].map((photoIdx) => renderCategoryPhoto(photoIdx))}
                      </div>
                      {renderCategoryPhoto(6, 'featured')}
                    </>
                  ) : (
                    <>
                      {renderCategoryPhoto(0, 'featured')}

                      {cat.photos.length > 1 && (
                        <div className="tour-photos-subgrid">
                          {cat.photos.slice(1).map((_, photoOffset) => renderCategoryPhoto(photoOffset + 1))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              </section>
            )
          })}
        </div>
      </div>
    </div>
  )
}
