import React, { useState, useEffect } from 'react';

export const WarrantyPage: React.FC = () => {
  const [warrantyId, setWarrantyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [validWarranty, setValidWarranty] = useState<any>(null);
  const [isEligible, setIsEligible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registeredWarranty, setRegisteredWarranty] = useState<any>(null);
  const [regFormData, setRegFormData] = useState({
    fullName: '',
    mobile: '',
    email: '',
    country: '',
    purchaseDate: ''
  });

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

  // Simulated warranty database (will connect to backend)
  const checkWarranty = async (id: string) => {
    // This will be replaced with actual API call
    const mockWarranties: Record<string, any> = {
      'ZEO-ULTRA-1001': { productType: 'ULTRA PPF', status: 'registered', customerName: 'Michael Chen', registrationDate: '2025-01-15' },
      'ZEO-ULTRA-1002': { productType: 'ULTRA PPF', status: 'registered', customerName: 'Sarah Johnson', registrationDate: '2025-02-20' },
      'ZEO-ULTRA-1003': { productType: 'ULTRA PPF', status: 'unregistered' },
      'ZEO-TITAN-2001': { productType: 'TITAN PPF', status: 'unregistered' }
    };
    
    return mockWarranties[id] || null;
  };

  const validateWarranty = async () => {
    if (!warrantyId.trim()) {
      setMessage({ text: '⚠️ Please enter a Warranty ID.', type: 'error' });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await checkWarranty(warrantyId);
      
      if (!result) {
        setMessage({ text: '❌ Invalid warranty! The Warranty ID does not exist in our system.', type: 'error' });
        setValidWarranty(null);
        setIsEligible(false);
      } else if (result.status === 'registered') {
        setMessage({ 
          text: `✅ Valid Warranty! This warranty is already registered to ${result.customerName}. Registration date: ${result.registrationDate}`,
          type: 'success'
        });
        setValidWarranty(result);
        setIsEligible(false);
      } else {
        setMessage({ 
          text: `✅ Valid Warranty! This product (${result.productType}) is eligible for registration. Click "Register Now" to complete.`,
          type: 'success'
        });
        setValidWarranty(result);
        setIsEligible(true);
      }
    } catch (error) {
      setMessage({ text: '❌ Error validating warranty. Please try again later.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => {
    setShowModal(true);
  };

  const handleRegChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegFormData({ ...regFormData, [e.target.name]: e.target.value });
  };

  const submitRegistration = async () => {
    if (!regFormData.fullName || !regFormData.mobile || !regFormData.email || !regFormData.country) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      // This will be replaced with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setRegisteredWarranty({
        warrantyId,
        ...regFormData,
        registrationDate: new Date().toLocaleString(),
        productType: validWarranty?.productType
      });
      
      alert(`✅ Warranty Successfully Registered!\n\nProduct: ${validWarranty?.productType}\nRegistered to: ${regFormData.fullName}\nRegistration Date: ${new Date().toLocaleString()}\nA confirmation email has been sent.`);
      
      setShowModal(false);
      setRegFormData({ fullName: '', mobile: '', email: '', country: '', purchaseDate: '' });
      setWarrantyId('');
      setMessage({ text: '✅ Warranty successfully registered!', type: 'success' });
      setIsEligible(false);
    } catch (error) {
      alert('Registration failed. Please contact support.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setWarrantyId('');
    setMessage(null);
    setValidWarranty(null);
    setIsEligible(false);
  };

  return (
    <>
      <div className="container" style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 30px' }}>
        {/* Warranty Hero */}
        <div className="warranty-hero fade-section" style={{ padding: '60px 0 40px', textAlign: 'center' }}>
          <div className="warranty-badge" style={{
            display: 'inline-block',
            background: 'rgba(229,9,20,0.2)',
            padding: '6px 16px',
            borderRadius: '30px',
            fontSize: '0.8rem',
            marginBottom: '20px',
            borderLeft: '3px solid #E50914',
            fontFamily: "'Orbitron', monospace"
          }}>
            <i className="fas fa-shield-alt"></i> OFFICIAL REGISTRATION PORTAL
          </div>
          <h1 style={{
            fontSize: '3rem',
            background: 'linear-gradient(135deg, #FFFFFF, #E50914)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '15px'
          }}>Warranty Registration</h1>
          <p style={{ color: '#aaa', maxWidth: '650px', margin: '0 auto' }}>Register your Zeo Shields product warranty. Enter your unique Warranty ID to get started.</p>
        </div>

        {/* Warranty Card */}
        <div className="warranty-card fade-section" style={{
          maxWidth: '560px',
          margin: '20px auto 60px',
          background: '#0C0C12',
          borderRadius: '32px',
          border: '1px solid rgba(229,9,20,0.3)',
          padding: '40px 36px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '4rem', color: '#E50914', marginBottom: '16px' }}>
            <i className="fas fa-id-card"></i>
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '12px', color: '#fff' }}>Check Your Warranty</h2>
          <p style={{ color: '#aaa', marginBottom: '28px', fontSize: '0.95rem' }}>Please enter the Warranty ID provided with your product purchase.</p>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="text"
              value={warrantyId}
              onChange={(e) => setWarrantyId(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && validateWarranty()}
              placeholder="Enter Warranty ID (e.g., ZEO-ULTRA-1001)"
              style={{
                flex: '2',
                minWidth: '200px',
                padding: '14px 20px',
                background: '#1A1A22',
                border: '1px solid #333',
                borderRadius: '60px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
              disabled={loading}
            />
            <button
              onClick={validateWarranty}
              disabled={loading}
              style={{
                padding: '14px 32px',
                background: '#E50914',
                border: 'none',
                borderRadius: '60px',
                fontWeight: 'bold',
                color: 'white',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontFamily: "'Orbitron', monospace"
              }}
            >
              {loading ? 'Checking...' : 'Enter'}
            </button>
          </div>
          
          {message && (
            <div style={{
              background: message.type === 'error' ? '#1e1215' : '#121b12',
              borderRadius: '24px',
              padding: '16px 20px',
              margin: '20px 0',
              textAlign: 'center',
              borderLeft: `4px solid ${message.type === 'error' ? '#E50914' : '#4caf50'}`,
              color: message.type === 'error' ? '#ff9b9b' : '#b9f6ca'
            }}>
              {message.text}
            </div>
          )}
          
          {(isEligible || message) && (
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
              {isEligible && (
                <button onClick={handleRegister} style={{
                  padding: '12px 28px',
                  borderRadius: '40px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  background: '#E50914',
                  color: 'white',
                  border: 'none',
                  fontFamily: "'Orbitron', monospace"
                }}>
                  Register Now
                </button>
              )}
              <button onClick={handleReset} style={{
                padding: '12px 28px',
                borderRadius: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
                background: '#2C2C36',
                color: '#ddd',
                border: 'none',
                fontFamily: "'Orbitron', monospace"
              }}>
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className="fade-section" style={{ textAlign: 'center', margin: '20px 0 60px' }}>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>
            <i className="fas fa-lock"></i> Secure validation • Warranty coverage • Worldwide support
          </p>
        </div>
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.9)',
          backdropFilter: 'blur(12px)',
          zIndex: 3000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }} onClick={() => setShowModal(false)}>
          <div style={{
            background: '#0F0F15',
            borderRadius: '36px',
            maxWidth: '520px',
            width: '90%',
            padding: '32px 30px',
            border: '1px solid rgba(229,9,20,0.5)',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            <div onClick={() => setShowModal(false)} style={{
              position: 'absolute',
              top: '20px',
              right: '24px',
              fontSize: '24px',
              cursor: 'pointer',
              color: '#aaa'
            }}>✕</div>
            
            <h3 style={{ fontFamily: "'Orbitron', monospace", color: '#E50914', marginBottom: '24px', fontSize: '1.6rem', textAlign: 'center' }}>
              <i className="fas fa-user-check"></i> Register Warranty
            </h3>
            
            <input
              type="text"
              name="fullName"
              value={regFormData.fullName}
              onChange={handleRegChange}
              placeholder="Full Name *"
              style={{ width: '100%', padding: '14px 18px', margin: '10px 0', background: '#1A1A22', border: '1px solid #333', borderRadius: '40px', color: 'white' }}
            />
            <input
              type="tel"
              name="mobile"
              value={regFormData.mobile}
              onChange={handleRegChange}
              placeholder="Mobile Number *"
              style={{ width: '100%', padding: '14px 18px', margin: '10px 0', background: '#1A1A22', border: '1px solid #333', borderRadius: '40px', color: 'white' }}
            />
            <input
              type="email"
              name="email"
              value={regFormData.email}
              onChange={handleRegChange}
              placeholder="Email ID *"
              style={{ width: '100%', padding: '14px 18px', margin: '10px 0', background: '#1A1A22', border: '1px solid #333', borderRadius: '40px', color: 'white' }}
            />
            <input
              type="text"
              name="country"
              value={regFormData.country}
              onChange={handleRegChange}
              placeholder="Country of Purchase *"
              style={{ width: '100%', padding: '14px 18px', margin: '10px 0', background: '#1A1A22', border: '1px solid #333', borderRadius: '40px', color: 'white' }}
            />
            <input
              type="date"
              name="purchaseDate"
              value={regFormData.purchaseDate}
              onChange={handleRegChange}
              placeholder="Purchase Date"
              style={{ width: '100%', padding: '14px 18px', margin: '10px 0', background: '#1A1A22', border: '1px solid #333', borderRadius: '40px', color: 'white' }}
            />
            
            <div style={{ display: 'flex', gap: '14px', marginTop: '24px' }}>
              <button onClick={submitRegistration} disabled={loading} style={{
                flex: 1,
                padding: '12px',
                borderRadius: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
                background: '#E50914',
                color: 'white',
                border: 'none'
              }}>
                {loading ? 'Submitting...' : 'Submit'}
              </button>
              <button onClick={() => setShowModal(false)} style={{
                flex: 1,
                padding: '12px',
                borderRadius: '40px',
                fontWeight: 'bold',
                cursor: 'pointer',
                background: '#2C2C36',
                color: '#ddd',
                border: 'none'
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fade-section { opacity: 0; transform: translateY(20px); transition: opacity 0.6s, transform 0.6s; }
        .fade-section.visible { opacity: 1; transform: translateY(0); }
        .warranty-card:hover { transform: translateY(-5px); border-color: rgba(229,9,20,0.6); }
        input:focus { outline: none; border-color: #E50914 !important; }
      `}</style>
    </>
  );
};