import React, { useState, useRef, useEffect } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

const RECAPTCHA_SITE_KEY = '6LeE1uYsAAAAAOQ-e0UgE3IXPG3D5pI4uJLdSizb';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    region: '',
    interest: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.region || !formData.interest || !formData.message) {
      setMessage({ type: 'error', text: '❌ Please fill in all required fields.' });
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setMessage({ type: 'error', text: '❌ Please enter a valid email address.' });
      return;
    }
    
    if (!recaptchaToken) {
      setMessage({ type: 'error', text: '❌ Please complete the reCAPTCHA verification.' });
      return;
    }
    
    setLoading(true);
    setMessage({ type: 'info', text: '📧 Sending your message...' });
    
    try {
      // Send to your backend API
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, recaptchaToken }),
      });
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: '✅ Thank you! Your message has been sent successfully. A Zeo Shields representative will contact you within 24 hours.' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          region: '',
          interest: '',
          message: ''
        });
        recaptchaRef.current?.reset();
        setRecaptchaToken(null);
      } else {
        throw new Error(result.message || 'Failed to send');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: '❌ Failed to send message. Please try again later or call us directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Contact Hero */}
      <section className="contact-hero" style={{
        position: 'relative',
        minHeight: '50vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 100%), url("/zeo_landing.webp")',
        backgroundSize: 'cover',
        backgroundPosition: 'center 30%',
        backgroundAttachment: 'fixed',
        borderBottom: '2px solid #E50914'
      }}>
        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '100px 30px' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '15px', background: 'linear-gradient(135deg, #E50914, #FF6B6B)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Get In Touch</h1>
          <p style={{ fontSize: '1.2rem', color: '#ddd', maxWidth: '600px', margin: '0 auto' }}>Our global team is ready to assist you with premium automotive protection solutions across the Middle East, Asia, and beyond.</p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 30px' }}>
        <div className="contact-main fade-section" style={{ margin: '80px 0' }}>
          <div className="contact-grid" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '50px',
            background: '#0A0A0F',
            borderRadius: '48px',
            padding: '48px',
            border: '1px solid rgba(229,9,20,0.2)'
          }}>
            {/* Contact Form */}
            <div className="contact-form">
              <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#E50914' }}><i className="fas fa-paper-plane"></i> Send us a message</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Full Name *</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', padding: '14px 18px', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '20px', color: 'white' }} required />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Email Address *</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={{ width: '100%', padding: '14px 18px', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '20px', color: 'white' }} required />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="phone" style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Phone Number</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="+XXX XX XXX XXXX" style={{ width: '100%', padding: '14px 18px', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '20px', color: 'white' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="region" style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Region *</label>
                  <select id="region" name="region" value={formData.region} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '20px', color: 'white' }} required>
                    <option value="">Select your region</option>
                    <option value="middle-east">Middle East</option>
                    <option value="asia">Asia Pacific</option>
                    <option value="europe">Europe</option>
                    <option value="north-america">North America</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="interest" style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Product Interest *</label>
                  <select id="interest" name="interest" value={formData.interest} onChange={handleChange} style={{ width: '100%', padding: '14px 18px', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '20px', color: 'white' }} required>
                    <option value="">Select product</option>
                    <option value="ppf">Paint Protection Film (PPF)</option>
                    <option value="multiple">Multiple / Not sure</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', color: '#ccc' }}>Message *</label>
                  <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your vehicle and protection needs..." rows={4} style={{ width: '100%', padding: '14px 18px', background: '#13131A', border: '1px solid #2A2A35', borderRadius: '20px', color: 'white', resize: 'vertical' }} required />
                </div>
                <div className="recaptcha-container" style={{ margin: '20px 0', background: '#0F0F15', padding: '12px', borderRadius: '16px', display: 'flex', justifyContent: 'center' }}>
                  <ReCAPTCHA ref={recaptchaRef} sitekey={RECAPTCHA_SITE_KEY} onChange={handleRecaptchaChange} />
                </div>
                {message && (
                  <div style={{ padding: '12px', borderRadius: '12px', marginTop: '15px', textAlign: 'center', background: message.type === 'success' ? 'rgba(46, 204, 113, 0.2)' : message.type === 'error' ? 'rgba(231, 76, 60, 0.2)' : 'rgba(52, 152, 219, 0.2)', border: `1px solid ${message.type === 'success' ? '#2ecc71' : message.type === 'error' ? '#e74c3c' : '#3498db'}`, color: message.type === 'success' ? '#2ecc71' : message.type === 'error' ? '#e74c3c' : '#3498db' }}>
                    {message.text}
                  </div>
                )}
                <button type="submit" disabled={loading} style={{ width: '100%', background: '#E50914', color: 'white', border: 'none', padding: '16px', borderRadius: '40px', fontWeight: 'bold', fontSize: '1rem', fontFamily: "'Orbitron', monospace", cursor: loading ? 'not-allowed' : 'pointer', marginTop: '10px' }}>
                  {loading ? 'Sending...' : <><i className="fas fa-envelope"></i> Send Message</>}
                </button>
              </form>
            </div>

            {/* Support Agent Card */}
            <div className="agent-card" style={{ background: 'linear-gradient(145deg, #0F0F15, #0A0A0F)', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(229,9,20,0.3)' }}>
              <img src="/contact.webp" alt="Zeo Shields Call Center Agent" style={{ width: '100%', height: '380px', objectFit: 'cover' }} />
              <div className="agent-caption" style={{ padding: '28px 25px', textAlign: 'center', background: 'rgba(10, 10, 15, 0.95)' }}>
                <h3 style={{ color: '#E50914', fontSize: '1.5rem' }}><i className="fas fa-headset"></i> Get Professional Support</h3>
                <p>Global Support Specialist</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '15px' }}>
                  <span style={{ color: '#E50914' }}><i className="fas fa-envelope"></i> info@zeoshields.com</span>
                  <span style={{ color: '#E50914' }}><i className="fas fa-comment-dots"></i> 24/7 Support</span>
                </div>
                <p style={{ marginTop: '15px', fontSize: '0.9rem' }}>"Our dedicated team is here to provide expert guidance. Reach out anytime!"</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .fade-section { opacity: 0; transform: translateY(30px); transition: opacity 0.7s, transform 0.7s; }
        .fade-section.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; padding: 30px; } }
      `}</style>
    </>
  );
};