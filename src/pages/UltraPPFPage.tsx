import React, { useEffect, useState } from 'react';

export const UltraPPFPage: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(1);

  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    { src: "/01-ultra-ppf-red.webp", alt: "ULTRA PPF - Advanced Protection" },
    { src: "/02-ultra-ppf-red.webp", alt: "Premium vehicle with ULTRA PPF" },
    { src: "/03-ultra-ppf-red.webp", alt: "Self-healing technology" },
    { src: "/04-ultra-ppf-red.webp", alt: "High-clarity finish" }
  ];

  const allProducts = [
    { id: 1, name: "TITAN PPF", tag: "10 Year Warranty", image: "/01-titan-ppf-white.webp", url: "/titan-ppf" },
    { id: 2, name: "ULTRA PPF", tag: "5 Year Warranty", image: "/01-ultra-ppf-red.webp", url: "/ultra-ppf" },
    { id: 3, name: "TITAN SATIN PPF", tag: "Satin Finish", image: "/01-stain-ppf-blue.webp", url: "/titan-satin-ppf" }
  ];

  const nextImage = () => setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () => setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  const nextCarousel = () => setCurrentCarouselIndex((prev) => (prev + 1) % allProducts.length);
  const prevCarousel = () => setCurrentCarouselIndex((prev) => (prev - 1 + allProducts.length) % allProducts.length);

  const getVisibleProducts = () => {
    const result = [];
    for (let i = 0; i < allProducts.length; i++) {
      result.push(allProducts[(currentCarouselIndex + i) % allProducts.length]);
    }
    return result;
  };

  return (
    <>
      <div className="container">
        <div className="product-hero fade-section">
          <div className="product-badge">HIGH-PERFORMANCE VALUE | 5-YEAR WARRANTY</div>
          <h1>ULTRA PPF</h1>
          <p>High-quality paint protection with self-healing technology and crystal-clear finish for everyday driving.</p>
        </div>

        <div className="product-layout fade-section">
          <div className="product-gallery">
            <div className="image-container" onClick={() => { setSelectedImage(galleryImages[activeImageIndex]); setIsModalOpen(true); }}>
              <img src={galleryImages[activeImageIndex].src} alt={galleryImages[activeImageIndex].alt} className="main-image" />
            </div>
            <div className="carousel-dots">
              {galleryImages.map((_, idx) => (<div key={idx} className={`dot ${idx === activeImageIndex ? 'active' : ''}`} onClick={() => setActiveImageIndex(idx)} />))}
            </div>
            <div className="carousel-arrows">
              <button className="arrow" onClick={prevImage}><i className="fas fa-chevron-left"></i></button>
              <button className="arrow" onClick={nextImage}><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div className="product-info">
            <p><strong>ULTRA PPF</strong> is designed to deliver high-quality protection with exceptional value.</p>
            <p>Featuring a self-healing top coat, ULTRA PPF ensures that minor scratches disappear over time.</p>
            <p>With multiple thickness options ranging from 7.5 MIL to 9.5 MIL, ULTRA offers flexibility for your protection needs.</p>
            <div className="thickness-options"><span>7.5 MIL</span><span>8.5 MIL</span><span>9.5 MIL</span></div>
            <div className="tech-note"><i className="fas fa-magic"></i><p><strong>Self-Healing Technology</strong> — Minor scratches disappear with heat exposure</p></div>
          </div>
        </div>

        <div className="benefits-warranty-grid fade-section">
          <div className="key-benefits">
            <h3><i className="fas fa-check-circle"></i> Key Benefits</h3>
            <ul><li><i className="fas fa-microchip"></i> Advanced multi-layer protection</li><li><i className="fas fa-magic"></i> Self-healing surface technology</li><li><i className="fas fa-sun"></i> UV resistance prevents fading</li><li><i className="fas fa-gem"></i> High-clarity distortion-free finish</li><li><i className="fas fa-certificate"></i> 5-year warranty</li></ul>
          </div>
          <div className="warranty-box"><i className="fas fa-shield-alt"></i><h3>5-Year Warranty</h3><p>Reliable choice for daily drivers and car enthusiasts.</p><a href="/warranty" className="btn-primary">Validate Warranty</a></div>
        </div>

        <div className="carousel-section fade-section">
          <h2><i className="fas fa-layer-group"></i> Explore Our PPF Collection</h2>
          <div className="products-carousel">
            <button className="carousel-nav prev" onClick={prevCarousel}><i className="fas fa-chevron-left"></i></button>
            <div className="carousel-track">{getVisibleProducts().map(p => (<div key={p.id} className="product-card-carousel" onClick={() => window.location.href = p.url}><img src={p.image} alt={p.name} /><div className="product-overlay"><h4>{p.name}</h4><p>{p.tag}</p></div></div>))}</div>
            <button className="carousel-nav next" onClick={nextCarousel}><i className="fas fa-chevron-right"></i></button>
          </div>
          <div className="carousel-dots-bottom">{allProducts.map((_, idx) => (<div key={idx} className={`dot ${idx === currentCarouselIndex ? 'active' : ''}`} onClick={() => setCurrentCarouselIndex(idx)} />))}</div>
          <div className="view-all"><a href="/products" className="btn-outline-silver">View All Products</a></div>
        </div>

        <div className="cta-section fade-section"><h2>Need Help Choosing?</h2><p>Our global experts are ready to help you find the perfect PPF for your vehicle.</p><a href="/contact" className="btn-primary">Contact Distributors</a></div>
      </div>

      {isModalOpen && selectedImage && (<div className="fullscreen-modal active" onClick={() => setIsModalOpen(false)}><div className="close-modal" onClick={() => setIsModalOpen(false)}><i className="fas fa-times"></i></div><img src={selectedImage.src} alt={selectedImage.alt} className="modal-image" /><div className="modal-caption">{selectedImage.alt}</div></div>)}
    </>
  );
};