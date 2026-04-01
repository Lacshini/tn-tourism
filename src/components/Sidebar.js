import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon:'🌟', label:'Experience Hub', path:'/experience' },
  { icon:'🗺️', label:'Smart Itinerary', path:'/itinerary' },
  { icon:'🔔', label:'AI Alerts', path:'/alerts' },
  { icon:'🛍️', label:'Local Market', path:'/market' },
  { icon:'🎭', label:'Cultural Hub', path:'/cultural' },
  { icon:'🎒', label:'Travel Essentials', path:'/essentials' },
  { icon:'🤖', label:'EchoTN AI', path:'/echotn' },
  { icon:'🥽', label:'AR/VR Tours', path:'/arvr' },
  { icon:'🛡️', label:'Enhanced Safety', path:'/safety' },
  { icon:'👥', label:'Group Tracking', path:'/group' },
  { icon:'📍', label:'Google Maps', path:'/maps' },
  { icon:'🌤️', label:'Weather', path:'/weather' },
  { icon:'🚨', label:'Emergency', path:'/emergency' },
  { icon:'🔔', label:'Notifications', path:'/notifications' },
  { icon:'📶', label:'Connectivity', path:'/connectivity' },
  { icon:'🔗', label:'Blockchain ID', path:'/blockchain' },
];

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (path) => {
    navigate(path);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div onClick={onClose} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.5)',
          zIndex:200, backdropFilter:'blur(2px)',
        }} />
      )}

      {/* Sidebar */}
      <div style={{
        position:'fixed', top:0, left:0, height:'100vh',
        width: open ? 280 : 0,
        background:'white',
        zIndex:300,
        transition:'width 0.3s ease',
        overflow:'hidden',
        boxShadow: open ? '4px 0 24px rgba(0,0,0,0.15)' : 'none',
      }}>
        <div style={{ width:280, height:'100%', display:'flex', flexDirection:'column' }}>
          {/* Header */}
          <div style={{
            background:'linear-gradient(135deg, #FF6B00, #CC5500)',
            padding:'3rem 1.5rem 1.5rem',
          }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:900, color:'white' }}>
                  🏛️ TN Tourism AI
                </p>
                <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.75rem', marginTop:2 }}>
                  Discover Tamil Nadu
                </p>
              </div>
              <button onClick={onClose} style={{
                background:'rgba(255,255,255,0.2)', border:'none',
                color:'white', width:32, height:32, borderRadius:'50%',
                fontSize:'1rem', cursor:'pointer',
              }}>✕</button>
            </div>
          </div>

          {/* Nav Items */}
          <div style={{ flex:1, overflowY:'auto', padding:'0.8rem 0' }}>
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <button key={item.path} onClick={() => handleNav(item.path)} style={{
                  width:'100%', padding:'0.85rem 1.5rem',
                  display:'flex', alignItems:'center', gap:'1rem',
                  background: active ? '#FFF0E6' : 'transparent',
                  border:'none', borderLeft: active ? '3px solid #FF6B00' : '3px solid transparent',
                  cursor:'pointer', textAlign:'left',
                  transition:'all 0.2s',
                }}>
                  <span style={{ fontSize:'1.3rem' }}>{item.icon}</span>
                  <span style={{
                    fontSize:'0.9rem', fontWeight: active ? 700 : 400,
                    color: active ? '#FF6B00' : '#1A0A00',
                    fontFamily:"'DM Sans',sans-serif",
                  }}>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{ padding:'1rem 1.5rem', borderTop:'1px solid #F0E8E0' }}>
            <p style={{ fontSize:'0.72rem', color:'#6B3A1F' }}>
              🏆 EDII-TN Nimirndhu Nil 2026
            </p>
            <p style={{ fontSize:'0.68rem', color:'#9B6A4F', marginTop:2 }}>
              Built by Fusion Femmes
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
