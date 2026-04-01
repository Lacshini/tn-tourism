import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header({ title, onMenu, showBack }) {
  const navigate = useNavigate();
  return (
    <div style={{
      position:'sticky', top:0, zIndex:100,
      background:'white',
      borderBottom:'1px solid rgba(255,107,0,0.1)',
      padding:'1rem 1.2rem',
      display:'flex', alignItems:'center', gap:'1rem',
      boxShadow:'0 2px 12px rgba(0,0,0,0.06)',
    }}>
      <button onClick={showBack ? () => navigate(-1) : onMenu} style={{
        background:'#FFF0E6', border:'none',
        width:38, height:38, borderRadius:12,
        fontSize:'1.1rem', cursor:'pointer',
        display:'flex', alignItems:'center', justifyContent:'center',
        flexShrink:0,
      }}>
        {showBack ? '←' : '☰'}
      </button>
      <div style={{ flex:1 }}>
        <p style={{
          fontFamily:"'Playfair Display',serif",
          fontSize:'1rem', fontWeight:900, color:'#1A0A00',
        }}>{title}</p>
      </div>
      <div style={{
        background:'linear-gradient(135deg,#FF6B00,#CC5500)',
        padding:'0.3rem 0.8rem', borderRadius:50,
        fontSize:'0.7rem', color:'white', fontWeight:700,
      }}>TN 🏛️</div>
    </div>
  );
}
