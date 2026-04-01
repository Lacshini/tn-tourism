import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard({ onMenu }) {
  const navigate = useNavigate();
  const quickActions = [
    { icon:'🌟', label:'Experience Hub', path:'/experience', bg:'linear-gradient(135deg,#FF6B00,#CC5500)' },
    { icon:'🗺️', label:'Smart Itinerary', path:'/itinerary', bg:'linear-gradient(135deg,#1B8A4C,#0D5C30)' },
    { icon:'🤖', label:'EchoTN AI', path:'/echotn', bg:'linear-gradient(135deg,#2D6A8A,#1A4A6A)' },
    { icon:'🚨', label:'Emergency', path:'/emergency', bg:'linear-gradient(135deg,#CC0000,#990000)' },
    { icon:'🛍️', label:'Local Market', path:'/market', bg:'linear-gradient(135deg,#D4A017,#A07010)' },
    { icon:'🥽', label:'AR/VR Tours', path:'/arvr', bg:'linear-gradient(135deg,#6B3A9A,#4A2070)' },
  ];

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      {/* Header */}
      <div style={{
        background:'linear-gradient(160deg,#FF6B00 0%,#CC5500 60%,#D4A017 100%)',
        padding:'3rem 1.5rem 2rem', borderRadius:'0 0 32px 32px',
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute',top:-60,right:-60,width:200,height:200,background:'rgba(255,255,255,0.08)',borderRadius:'50%' }}/>
        <div style={{ position:'absolute',bottom:-40,left:-40,width:150,height:150,background:'rgba(255,255,255,0.05)',borderRadius:'50%' }}/>
        <button onClick={onMenu} style={{ background:'rgba(255,255,255,0.2)',border:'none',color:'white',width:38,height:38,borderRadius:12,fontSize:'1.1rem',cursor:'pointer',marginBottom:'1rem',display:'flex',alignItems:'center',justifyContent:'center' }}>☰</button>
        <p style={{ color:'rgba(255,255,255,0.85)',fontSize:'0.85rem' }}>வணக்கம்! Welcome to</p>
        <h1 style={{ fontFamily:"'Playfair Display',serif",color:'white',fontSize:'2rem',fontWeight:900,lineHeight:1.2 }}>Tamil Nadu<br/>Tourism AI 🏛️</h1>
        <p style={{ color:'rgba(255,255,255,0.8)',fontSize:'0.85rem',marginTop:6 }}>Land of Temples, Hills & Heritage</p>

        {/* Stats */}
        <div style={{ display:'flex',gap:'1.5rem',marginTop:'1.5rem' }}>
          {[['8+','Heritage Sites'],['3','UNESCO Sites'],['4K+','Happy Tourists']].map(([n,l])=>(
            <div key={l}>
              <p style={{ fontFamily:"'Playfair Display',serif",color:'white',fontSize:'1.3rem',fontWeight:900 }}>{n}</p>
              <p style={{ color:'rgba(255,255,255,0.7)',fontSize:'0.65rem' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding:'1.5rem' }}>
        {/* Search */}
        <div className="fade-up" style={{ background:'white',borderRadius:50,padding:'0.85rem 1.2rem',display:'flex',gap:'0.8rem',alignItems:'center',boxShadow:'0 4px 16px rgba(0,0,0,0.08)',marginBottom:'1.5rem' }}>
          <span style={{ fontSize:'1.1rem' }}>🔍</span>
          <input placeholder="Search temples, places, food..." style={{ border:'none',outline:'none',flex:1,fontSize:'0.9rem',fontFamily:"'DM Sans',sans-serif",color:'#1A0A00' }} onClick={()=>navigate('/experience')} readOnly />
        </div>

        {/* Quick Actions */}
        <p className="fade-up-1" style={{ fontSize:'0.8rem',fontWeight:700,color:'#6B3A1F',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'0.8rem' }}>Quick Access</p>
        <div className="fade-up-1" style={{ display:'grid',gridTemplateColumns:'1fr 1fr',gap:'0.8rem',marginBottom:'1.5rem' }}>
          {quickActions.map(action=>(
            <button key={action.path} onClick={()=>navigate(action.path)} style={{
              background:action.bg,borderRadius:18,padding:'1.2rem',border:'none',cursor:'pointer',textAlign:'left',
              transition:'transform 0.2s',boxShadow:'0 4px 12px rgba(0,0,0,0.15)',
            }}
            onMouseDown={e=>e.currentTarget.style.transform='scale(0.97)'}
            onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}
            >
              <span style={{ fontSize:'2rem',display:'block',marginBottom:'0.5rem' }}>{action.icon}</span>
              <p style={{ color:'white',fontWeight:700,fontSize:'0.85rem' }}>{action.label}</p>
            </button>
          ))}
        </div>

        {/* Featured Sites */}
        <p className="fade-up-2" style={{ fontSize:'0.8rem',fontWeight:700,color:'#6B3A1F',textTransform:'uppercase',letterSpacing:'0.5px',marginBottom:'0.8rem' }}>Featured Sites</p>
        <div className="fade-up-2" style={{ display:'flex',gap:'0.8rem',overflowX:'auto',paddingBottom:8 }}>
          {[
            { name:'Meenakshi Temple',city:'Madurai',emoji:'🛕',color:'#FF6B00' },
            { name:'Brihadeeswarar',city:'Thanjavur',emoji:'🏛️',color:'#D4A017' },
            { name:'Ooty',city:'Nilgiris',emoji:'🌿',color:'#1B8A4C' },
            { name:'Kanyakumari',city:'Kanyakumari',emoji:'🌅',color:'#2D6A8A' },
          ].map(site=>(
            <div key={site.name} onClick={()=>navigate('/experience')} style={{
              flexShrink:0,width:130,background:'white',borderRadius:18,overflow:'hidden',
              boxShadow:'0 4px 12px rgba(0,0,0,0.08)',cursor:'pointer',
            }}>
              <div style={{ height:70,background:`linear-gradient(135deg,${site.color},${site.color}99)`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'2.5rem' }}>{site.emoji}</div>
              <div style={{ padding:'0.7rem' }}>
                <p style={{ fontWeight:700,fontSize:'0.78rem',color:'#1A0A00' }}>{site.name}</p>
                <p style={{ fontSize:'0.65rem',color:'#6B3A1F',marginTop:2 }}>📍 {site.city}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Eco Points */}
        <div className="fade-up-3" style={{ marginTop:'1.5rem',background:'linear-gradient(135deg,#1B8A4C,#0D5C30)',borderRadius:20,padding:'1.2rem',display:'flex',gap:'1rem',alignItems:'center' }}>
          <span style={{ fontSize:'2.5rem' }}>🌿</span>
          <div style={{ flex:1 }}>
            <p style={{ color:'white',fontWeight:700,fontSize:'0.92rem' }}>Eco-Travel Rewards</p>
            <p style={{ color:'rgba(255,255,255,0.75)',fontSize:'0.78rem',marginTop:2 }}>245 points earned · Sustainable tourism</p>
          </div>
          <button style={{ background:'rgba(255,255,255,0.2)',border:'none',color:'white',padding:'0.5rem 1rem',borderRadius:50,fontWeight:700,fontSize:'0.78rem',cursor:'pointer' }}>Redeem</button>
        </div>
      </div>
    </div>
  );
}
