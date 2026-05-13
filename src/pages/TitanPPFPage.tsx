import React, { useEffect, useState } from 'react';

export const TitanPPFPage: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => entry.isIntersecting && entry.target.classList.add('visible'));
    }, { threshold: 0.1 });
    fadeElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    { src: "/01-titan-ppf-white.webp", alt: "TITAN PPF - Maximum Protection" },
    { src: "/02-titan-ppf-white.webp", alt: "Premium vehicle with TITAN PPF" },
    { src: "/03-titan-ppf-white.webp", alt: "Self-healing technology" },
    { src: "/04-titan-ppf-white.webp", alt: "High-gloss finish" }
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
          <div className="product-badge">FLAGSHIP PROTECTION | 10-YEAR WARRANTY</div>
          <h1>TITAN PPF</h1>
          <p>Maximum protection paint protection film with 10-year durability for luxury and high-performance vehicles.</p>
        </div>

        <div className="product-layout fade-section">
          <div className="product-gallery">
            <div className="image-container" onClick={() => { setSelectedImage(galleryImages[activeImageIndex]); setIsModalOpen(true); }}>
              <img src={galleryImages[activeImageIndex].src} alt={galleryImages[activeImageIndex].alt} className="main-image" />
            </div>
            <div className="carousel-dots">
              {galleryImages.map((_, idx) => (
                <div key={idx} className={`dot ${idx === activeImageIndex ? 'active' : ''}`} onClick={() => setActiveImageIndex(idx)} />
              ))}
            </div>
            <div className="carousel-arrows">
              <button className="arrow" onClick={prevImage}><i className="fas fa-chevron-left"></i></button>
              <button className="arrow" onClick={nextImage}><i className="fas fa-chevron-right"></i></button>
            </div>
          </div>

          <div className="product-info">
            <p><strong>TITAN PPF</strong> is the flagship solution for those who demand maximum protection and premium performance.</p>
            <p>The advanced self-healing top coat automatically repairs minor swirl marks and scratches when exposed to heat.</p>
            <p>With UV and stain resistance, TITAN PPF prevents discoloration and protects your paint from harsh sunlight.</p>
            <div className="thickness-options"><span>7.5 MIL</span><span>8.5 MIL</span><span>9.5 MIL</span></div>
            <div className="tech-note"><i className="fas fa-magic"></i><p><strong>Self-Healing Technology</strong> — Minor scratches disappear with heat exposure</p></div>
          </div>
        </div>

        <div className="benefits-warranty-grid fade-section">
          <div className="key-benefits">
            <h3><i className="fas fa-check-circle"></i> Key Benefits</h3>
            <ul><li><i className="fas fa-shield-alt"></i> Maximum impact resistance</li><li><i className="fas fa-magic"></i> Self-healing technology</li><li><i className="fas fa-sun"></i> UV and stain protection</li><li><i className="fas fa-gem"></i> Optical clarity and gloss</li><li><i className="fas fa-certificate"></i> 10-year warranty</li></ul>
          </div>
          <div className="warranty-box"><i className="fas fa-shield-alt"></i><h3>10-Year Warranty</h3><p>Built for long-term reliability — backed by Zeo Shields global warranty.</p><a href="/warranty" className="btn-primary">Validate Warranty</a></div>
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

      <style>{`
        .product-hero { padding: 60px 0 40px; text-align: center; }
        .product-hero h1 { font-size: 3rem; background: linear-gradient(135deg, #fff, #E50914); -webkit-background-clip: text; background-clip: text; color: transparent; }
        .product-badge { display: inline-block; background: rgba(229,9,20,0.2); padding: 6px 16px; border-radius: 30px; font-size: 0.8rem; margin-bottom: 20px; border-left: 3px solid #E50914; }
        .product-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; margin: 40px 0; }
        .product-gallery { text-align: center; }
        .main-image { width: 100%; height: 400px; object-fit: cover; border-radius: 24px; border: 1px solid rgba(229,9,20,0.4); cursor: pointer; }
        .carousel-dots, .carousel-dots-bottom { display: flex; justify-content: center; gap: 12px; margin: 20px 0; }
        .dot { width: 40px; height: 4px; background: #333; border-radius: 4px; cursor: pointer; transition: all 0.3s; }
        .dot.active { background: #E50914; width: 60px; }
        .carousel-arrows { display: flex; justify-content: center; gap: 16px; }
        .arrow { width: 45px; height: 45px; border-radius: 50%; background: #141414; border: none; color: white; cursor: pointer; }
        .arrow:hover { background: #E50914; }
        .product-info p { line-height: 1.7; color: #bbb; margin-bottom: 20px; }
        .thickness-options { display: flex; gap: 15px; justify-content: center; margin: 20px 0; }
        .thickness-options span { background: #1a1a1a; padding: 8px 20px; border-radius: 30px; border: 1px solid #E50914; }
        .tech-note { background: linear-gradient(145deg, #0F0F15, #0A0A0F); border-radius: 24px; padding: 20px; text-align: center; }
        .tech-note i { font-size: 1.5rem; color: #E50914; }
        .benefits-warranty-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; margin: 30px 0; }
        .key-benefits { background: #0C0C12; border-radius: 28px; padding: 28px; }
        .key-benefits h3 { color: #E50914; margin-bottom: 20px; }
        .key-benefits ul { list-style: none; }
        .key-benefits li { padding: 12px 0; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid #222; }
        .key-benefits li i { color: #E50914; width: 28px; }
        .warranty-box { background: rgba(229,9,20,0.08); border-radius: 28px; padding: 28px; text-align: center; }
        .warranty-box i { font-size: 2.8rem; color: #E50914; }
        .warranty-box .btn-primary { display: inline-block; margin-top: 20px; padding: 8px 24px; background: #E50914; color: white; text-decoration: none; border-radius: 40px; }
        .carousel-section { margin: 80px 0; background: linear-gradient(135deg, #0a0a0f, #050508); border-radius: 48px; padding: 60px 40px; }
        .carousel-section h2 { text-align: center; margin-bottom: 40px; color: #E50914; }
        .products-carousel { display: flex; align-items: center; justify-content: center; gap: 20px; }
        .carousel-track { display: flex; gap: 30px; justify-content: center; flex: 1; }
        .product-card-carousel { width: 280px; height: 280px; border-radius: 24px; overflow: hidden; cursor: pointer; background: #0F0F15; border: 1px solid rgba(229,9,20,0.2); transition: all 0.3s; }
        .product-card-carousel:hover { transform: scale(1.05); border-color: #E50914; }
        .product-card-carousel img { width: 100%; height: 100%; object-fit: cover; }
        .product-overlay { position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, #000000cc, transparent); padding: 20px; }
        .product-overlay h4 { color: white; }
        .product-overlay p { color: #E50914; font-size: 0.75rem; }
        .carousel-nav { width: 50px; height: 50px; border-radius: 50%; background: #0F0F15; border: 1px solid #E50914; color: #E50914; cursor: pointer; }
        .carousel-nav:hover { background: #E50914; color: white; }
        .view-all { text-align: center; margin-top: 40px; }
        .fullscreen-modal { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.96); z-index: 2000; display: flex; align-items: center; justify-content: center; }
        .close-modal { position: absolute; top: 28px; right: 32px; background: rgba(20,20,20,0.9); width: 56px; height: 56px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 32px; color: #E50914; cursor: pointer; }
        .modal-image { max-width: 90%; max-height: 90%; border-radius: 16px; }
        .modal-caption { position: absolute; bottom: 30px; background: rgba(0,0,0,0.7); padding: 12px 20px; border-radius: 60px; }
        @media (max-width: 900px) { .product-layout, .benefits-warranty-grid { grid-template-columns: 1fr; } .carousel-track { flex-direction: column; align-items: center; } .product-card-carousel { width: 220px; height: 220px; } }
      `}</style>
    </>
  );
};