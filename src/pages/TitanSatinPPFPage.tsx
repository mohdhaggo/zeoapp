import React, { useEffect, useState } from 'react';

export const TitanSatinPPFPage: React.FC = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-section');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(el => observer.observe(el));
    
    return () => observer.disconnect();
  }, []);

  const galleryImages = [
    { src: "/01-stain-ppf-blue.webp", alt: "TITAN SATIN PPF - Elegant Satin Finish Paint Protection" },
    { src: "/02-stain-ppf-blue.webp", alt: "Premium vehicle with TITAN SATIN PPF installed" },
    { src: "/03-stain-ppf-blue.webp", alt: "Satin finish texture closeup" },
    { src: "/04-stain-ppf-blue.webp", alt: "Self-healing technology demonstration" }
  ];

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const openFullscreen = (image: { src: string; alt: string }) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeFullscreen = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const relatedProducts = [
    { id: 1, name: "TITAN PPF", tag: "10 Year Warranty", image: "/01-titan-ppf-white.webp", url: "/titan-ppf" },
    { id: 2, name: "ULTRA PPF", tag: "5 Year Warranty", image: "/01-ultra-ppf-red.webp", url: "/ultra-ppf" }
  ];

  return (
    <>
      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 30px' }}>
        {/* Product Hero */}
        <div className="product-hero fade-section" style={{ padding: '60px 0 40px' }}>
          <div className="product-badge" style={{ display: 'inline-block', background: 'rgba(229,9,20,0.2)', padding: '6px 16px', borderRadius: '30px', fontSize: '0.8rem', marginBottom: '20px', borderLeft: '3px solid #E50914' }}>
            SATIN FINISH | 10-YEAR WARRANTY
          </div>
          <h1 style={{ fontSize: '3rem', background: 'linear-gradient(135deg, #FFFFFF, #E50914)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', marginBottom: '15px' }}>TITAN SATIN PPF</h1>
          <p style={{ color: '#aaa' }}>Premium satin finish paint protection that transforms glossy paint into a smooth, stealth appearance.</p>
        </div>

        {/* Product Layout */}
        <div className="product-layout fade-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', margin: '40px 0', alignItems: 'start' }}>
          {/* Image Gallery */}
          <div>
            <div style={{ position: 'relative', width: '100%', height: '400px', cursor: 'pointer' }} onClick={() => openFullscreen(galleryImages[activeImageIndex])}>
              <img src={galleryImages[activeImageIndex].src} alt={galleryImages[activeImageIndex].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px', border: '1px solid rgba(229,9,20,0.4)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
              <button onClick={prevImage} style={{ background: '#141414', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}><i className="fas fa-chevron-left"></i></button>
              <button onClick={nextImage} style={{ background: '#141414', border: 'none', color: 'white', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer' }}><i className="fas fa-chevron-right"></i></button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '15px' }}>
              {galleryImages.map((_, idx) => (
                <div key={idx} onClick={() => setActiveImageIndex(idx)} style={{ width: idx === activeImageIndex ? '30px' : '20px', height: '4px', background: idx === activeImageIndex ? '#E50914' : '#333', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <p style={{ lineHeight: '1.7', color: '#bbb', marginBottom: '20px' }}>TITAN SATIN PPF combines premium protection with a unique satin finish, giving your vehicle a bold and refined appearance. Designed for those who want to stand out, this film transforms glossy paint into a smooth satin texture while maintaining full protection against rocks, scratches, and environmental hazards.</p>
            <p style={{ lineHeight: '1.7', color: '#bbb', marginBottom: '20px' }}>Built with advanced self-healing technology, the surface eliminates minor scratches and swirl marks, ensuring a consistent and clean finish over time. The satin finish creates a subtle, non-reflective appearance that exudes sophistication and stealth.</p>
            <p style={{ lineHeight: '1.7', color: '#bbb', marginBottom: '20px' }}>The film also offers UV and stain resistance, protecting your vehicle from fading, discoloration, and environmental contaminants—perfect for extreme weather conditions across the Middle East, Asia, and global markets.</p>
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', margin: '20px 0' }}>
              <span style={{ background: '#1a1a1a', padding: '8px 20px', borderRadius: '30px', border: '1px solid #E50914' }}>7.5 MIL</span>
            </div>
            <div style={{ background: 'linear-gradient(145deg, #0F0F15, #0A0A0F)', borderRadius: '24px', padding: '20px', textAlign: 'center', border: '1px solid rgba(229,9,20,0.3)' }}>
              <i className="fas fa-palette" style={{ fontSize: '1.5rem', color: '#E50914' }}></i>
              <p style={{ marginTop: '8px' }}><strong>Elegant Satin Transformation</strong> — Converts gloss paint to a smooth, stealth satin finish</p>
            </div>
          </div>
        </div>

        {/* Benefits & Warranty Grid */}
        <div className="benefits-warranty-grid fade-section" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', margin: '30px 0 20px' }}>
          <div style={{ background: '#0C0C12', borderRadius: '28px', padding: '28px', border: '1px solid rgba(229,9,20,0.2)' }}>
            <h3 style={{ color: '#E50914', marginBottom: '20px' }}>Key Benefits</h3>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #222' }}><i className="fas fa-palette" style={{ color: '#E50914' }}></i> Elegant satin finish transformation</li>
              <li style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #222' }}><i className="fas fa-shield-alt" style={{ color: '#E50914' }}></i> Maximum impact protection</li>
              <li style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #222' }}><i className="fas fa-magic" style={{ color: '#E50914' }}></i> Advanced self-healing technology</li>
              <li style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '12px', borderBottom: '1px solid #222' }}><i className="fas fa-sun" style={{ color: '#E50914' }}></i> UV and stain resistance</li>
              <li style={{ padding: '12px 0', display: 'flex', alignItems: 'center', gap: '12px' }}><i className="fas fa-certificate" style={{ color: '#E50914' }}></i> 10-year warranty</li>
            </ul>
          </div>
          <div style={{ background: 'rgba(229,9,20,0.08)', borderRadius: '28px', padding: '28px', textAlign: 'center', border: '1px solid rgba(229,9,20,0.3)' }}>
            <i className="fas fa-shield-alt" style={{ fontSize: '2.8rem', color: '#E50914', marginBottom: '15px' }}></i>
            <h3>10-Year Warranty</h3>
            <p>A long-term investment in both style and protection for those who want to stand out.</p>
            <a href="/warranty" className="btn-primary" style={{ display: 'inline-block', marginTop: '25px', padding: '8px 24px', background: '#E50914', color: 'white', textDecoration: 'none', borderRadius: '40px' }}>Validate Warranty</a>
          </div>
        </div>

        {/* Related Products */}
        <div className="carousel-section fade-section" style={{ margin: '80px 0', background: 'linear-gradient(135deg, #0a0a0f, #050508)', borderRadius: '48px', padding: '60px 40px' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#E50914' }}>Explore Our PPF Collection</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap' }}>
            {relatedProducts.map((product) => (
              <div key={product.id} onClick={() => window.location.href = product.url} style={{ width: '280px', height: '280px', borderRadius: '24px', overflow: 'hidden', cursor: 'pointer', background: '#0F0F15', border: '1px solid rgba(229,9,20,0.2)', position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, #000000cc, transparent)', padding: '20px' }}>
                  <h4 style={{ color: 'white', margin: 0 }}>{product.name}</h4>
                  <p style={{ color: '#E50914', margin: '5px 0 0', fontSize: '0.75rem' }}>{product.tag}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="/products" className="btn-outline-silver" style={{ padding: '12px 32px', border: '1.5px solid #CCCCCC', borderRadius: '40px', color: 'white', textDecoration: 'none', display: 'inline-block' }}>View All Products</a>
          </div>
        </div>

        {/* CTA Section */}
        <div className="cta-section fade-section" style={{ background: '#0B0B10', borderRadius: '48px', padding: '60px 40px', textAlign: 'center', margin: '60px 0' }}>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Need Help Choosing?</h2>
          <p style={{ marginBottom: '30px' }}>Our global experts are ready to help you find the perfect PPF for your vehicle.</p>
          <a href="/contact" className="btn-primary" style={{ background: '#FFFFFF', padding: '14px 36px', borderRadius: '40px', fontWeight: 'bold', color: '#010101', textDecoration: 'none', display: 'inline-block' }}>Contact Distributors</a>
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isModalOpen && selectedImage && (
        <div onClick={closeFullscreen} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.96)', zIndex: 2000, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ position: 'relative' }}>
            <img src={selectedImage.src} alt={selectedImage.alt} style={{ maxWidth: '90vw', maxHeight: '90vh', borderRadius: '16px' }} />
            <button onClick={closeFullscreen} style={{ position: 'absolute', top: '-50px', right: '-50px', background: '#E50914', border: 'none', width: '40px', height: '40px', borderRadius: '50%', color: 'white', cursor: 'pointer', fontSize: '20px' }}>✕</button>
          </div>
        </div>
      )}

      <style>{`
        .fade-section { opacity: 0; transform: translateY(30px); transition: opacity 0.7s, transform 0.7s; }
        .fade-section.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 900px) { .product-layout { grid-template-columns: 1fr; gap: 30px; } .benefits-warranty-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
};