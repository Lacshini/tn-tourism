import React, { useState } from 'react';
import Header from '../components/Header';
import { markets, emergencyContacts } from '../data/tnData';

// ===================== ECHOTN AI =====================
export function EchoTN({ onMenu }) {
  const [messages, setMessages] = useState([
    { from:'ai', text:'வணக்கம்! I am EchoTN AI 🤖\n\nI can help you with Tamil Nadu travel — temples, food, transport, local tips. Ask me anything in Tamil or English!', time:'Now' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const quickQuestions = [
    'Best temples to visit?', 'Local food to try?', 'How to reach Ooty?', 'Best time to visit TN?'
  ];

  const aiReplies = {
    'temple': 'Top temples in TN:\n🛕 Meenakshi Amman, Madurai\n🛕 Brihadeeswarar, Thanjavur\n🛕 Kapaleeshwarar, Chennai\n🛕 Nataraja Temple, Chidambaram\n\nAll have incredible Dravidian architecture! 🙏',
    'food': 'Must-try TN foods:\n🍛 Chettinad Chicken Curry\n🥘 Pongal with Sambar\n☕ Filter Kaapi (Coffee)\n🍜 Kari Dosai, Madurai\n🍮 Payasam & Halwa\n\nEvery region has unique flavors! 😋',
    'ooty': '🌿 How to reach Ooty:\n\nFrom Chennai: 560 km\n✈️ Nearest airport: Coimbatore (88 km)\n🚂 Nilgiri Mountain Railway from Mettupalayam\n🚗 Drive via Coimbatore — 5-6 hours\n\n🎟️ Toy train is a must-do experience! Book in advance.',
    'time': '📅 Best time to visit TN:\n\n🌸 Oct-Mar: Pleasant weather, festivals\n☀️ Apr-Jun: Hot, avoid beaches\n🌧️ Jul-Sep: Monsoon, lush greenery\n\n🎊 Festival highlights:\n• Pongal — January\n• Karthigai Deepam — Nov/Dec\n• Chithirai Festival — April (Madurai)',
    'default': 'Great question! Tamil Nadu has so much to offer — from ancient temples to stunning hill stations and pristine beaches. \n\nWould you like specific info about:\n• 🛕 Temples & Heritage\n• 🌿 Nature & Hills\n• 🌊 Beaches\n• 🍛 Food & Culture\n• 🚗 Transport & Stay',
  };

  const getReply = (text) => {
    const lower = text.toLowerCase();
    if (lower.includes('temple') || lower.includes('kovil')) return aiReplies.temple;
    if (lower.includes('food') || lower.includes('eat') || lower.includes('saapadu')) return aiReplies.food;
    if (lower.includes('ooty') || lower.includes('hill')) return aiReplies.ooty;
    if (lower.includes('time') || lower.includes('when') || lower.includes('season')) return aiReplies.time;
    return aiReplies.default;
  };

  const send = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev=>[...prev,{from:'user',text:msg,time:'Now'}]);
    setInput('');
    setLoading(true);
    setTimeout(()=>{
      setMessages(prev=>[...prev,{from:'ai',text:getReply(msg),time:'Now'}]);
      setLoading(false);
    }, 1500);
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', display:'flex', flexDirection:'column' }}>
      <Header title="EchoTN AI" onMenu={onMenu} />
      <div style={{ flex:1, padding:'1rem', display:'flex', flexDirection:'column', gap:'0.8rem', maxHeight:'65vh', overflowY:'auto' }}>
        {messages.map((msg,i)=>(
          <div key={i} style={{ display:'flex', justifyContent:msg.from==='user'?'flex-end':'flex-start' }}>
            <div style={{
              maxWidth:'85%', padding:'0.9rem 1.1rem',
              borderRadius: msg.from==='user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
              background: msg.from==='user' ? 'linear-gradient(135deg,#FF6B00,#CC5500)' : 'white',
              color: msg.from==='user' ? 'white' : '#1A0A00',
              boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
              fontSize:'0.88rem', lineHeight:1.6, whiteSpace:'pre-line',
            }}>
              {msg.from==='ai' && <p style={{ fontSize:'0.7rem', fontWeight:700, color:'#FF6B00', marginBottom:4 }}>🤖 EchoTN AI</p>}
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', gap:4, padding:'0.8rem 1rem', background:'white', borderRadius:'18px 18px 18px 4px', width:'fit-content', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>
            {[0,1,2].map(i=><div key={i} style={{ width:7,height:7,borderRadius:'50%',background:'#FF6B00',animation:`blink 1s ease ${i*0.2}s infinite` }}/>)}
          </div>
        )}
      </div>
      <div style={{ padding:'0.8rem 1rem' }}>
        <div style={{ display:'flex', gap:'0.4rem', overflowX:'auto', marginBottom:'0.6rem', paddingBottom:4 }}>
          {quickQuestions.map(q=>(
            <button key={q} onClick={()=>send(q)} style={{ padding:'0.35rem 0.8rem', borderRadius:50, border:'1px solid #F0E8E0', background:'white', color:'#6B3A1F', fontSize:'0.72rem', fontWeight:600, cursor:'pointer', whiteSpace:'nowrap', flexShrink:0 }}>{q}</button>
          ))}
        </div>
        <div style={{ display:'flex', gap:'0.6rem' }}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask about Tamil Nadu..." style={{ flex:1,padding:'0.85rem 1rem',borderRadius:50,border:'2px solid #F0E8E0',outline:'none',fontSize:'0.9rem',fontFamily:"'DM Sans',sans-serif" }} />
          <button onClick={()=>send()} style={{ width:46,height:46,borderRadius:'50%',border:'none',background:'linear-gradient(135deg,#FF6B00,#CC5500)',color:'white',fontSize:'1.1rem',cursor:'pointer' }}>➤</button>
        </div>
      </div>
    </div>
  );
}

// ===================== LOCAL MARKET =====================
export function LocalMarket({ onMenu }) {
  const [added, setAdded] = useState([]);
  const toggle = (name) => setAdded(prev=>prev.includes(name)?prev.filter(n=>n!==name):[...prev,name]);

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Local Market" onMenu={onMenu} />
      <div style={{ background:'linear-gradient(135deg,#D4A017,#A07010)', padding:'1.5rem', margin:'1rem', borderRadius:20 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>🛍️ Authentic TN Products</h3>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', marginTop:4 }}>Direct from artisans · Verified sellers · Blockchain certified</p>
      </div>
      <div style={{ padding:'0 1rem', display:'flex', flexDirection:'column', gap:'0.8rem' }}>
        {markets.map((item,i)=>(
          <div key={i} className={`fade-up-${Math.min(i+1,5)}`} style={{ background:'white',borderRadius:18,padding:'1.2rem',boxShadow:'0 4px 12px rgba(0,0,0,0.06)',display:'flex',gap:'1rem',alignItems:'center' }}>
            <span style={{ fontSize:'2.5rem' }}>{item.emoji}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700,fontSize:'0.92rem' }}>{item.name}</p>
              <p style={{ fontSize:'0.72rem',color:'#6B3A1F',marginTop:2 }}>📍 {item.origin} · {item.type}</p>
              <p style={{ fontSize:'0.8rem',color:'#D4A017',fontWeight:700,marginTop:2 }}>{item.price}</p>
              <p style={{ fontSize:'0.7rem',color:'#FF6B00' }}>⭐ {item.rating}</p>
            </div>
            <button onClick={()=>toggle(item.name)} style={{
              width:38,height:38,borderRadius:'50%',border:'2px solid',
              borderColor: added.includes(item.name)?'#1B8A4C':'#F0E8E0',
              background: added.includes(item.name)?'#E6F5ED':'white',
              fontSize:'1rem',cursor:'pointer',transition:'all 0.2s',
            }}>{added.includes(item.name)?'✓':'+'}</button>
          </div>
        ))}
      </div>
      {added.length>0 && (
        <div style={{ margin:'1rem',background:'linear-gradient(135deg,#1B8A4C,#0D5C30)',borderRadius:16,padding:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center' }}>
          <div>
            <p style={{ color:'white',fontWeight:700,fontSize:'0.9rem' }}>🛒 {added.length} items in cart</p>
            <p style={{ color:'rgba(255,255,255,0.75)',fontSize:'0.75rem' }}>Authentic · Verified · Delivered</p>
          </div>
          <button style={{ background:'white',color:'#1B8A4C',border:'none',padding:'0.6rem 1.2rem',borderRadius:50,fontWeight:700,fontSize:'0.85rem',cursor:'pointer' }}>Checkout</button>
        </div>
      )}
    </div>
  );
}

// ===================== AR/VR TOURS =====================
export function ARVRTours({ onMenu }) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(null);

  const arSites = [
    { name:'Meenakshi Temple', emoji:'🛕', desc:'Walk through ancient corridors virtually', available:true },
    { name:'Brihadeeswarar Temple', emoji:'🏛️', desc:'1000-year-old Chola architecture in 3D', available:true },
    { name:'Mahabalipuram', emoji:'🗿', desc:'Shore temple at sunrise experience', available:true },
    { name:'Rameswaram', emoji:'🌊', desc:'Pamban Bridge & temple virtual tour', available:false },
  ];

  const startScan = (site) => {
    setScanning(true);
    setTimeout(()=>{ setScanning(false); setScanned(site); }, 2000);
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="AR/VR Tours" onMenu={onMenu} />
      <div style={{ background:'linear-gradient(135deg,#2D6A8A,#1A4A6A)', padding:'1.5rem', margin:'1rem', borderRadius:20 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>🥽 Immersive Heritage</h3>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', marginTop:4 }}>Scan QR codes at sites for instant AR visualization</p>
      </div>

      {scanning && (
        <div style={{ margin:'1rem',background:'white',borderRadius:20,padding:'2rem',textAlign:'center',boxShadow:'0 4px 16px rgba(0,0,0,0.08)' }}>
          <div style={{ width:60,height:60,borderRadius:'50%',border:'4px solid #E0EFFF',borderTop:'4px solid #2D6A8A',margin:'0 auto 1rem',animation:'spin 1s linear infinite' }}/>
          <p style={{ fontWeight:700 }}>Scanning QR Code...</p>
          <p style={{ fontSize:'0.82rem',color:'#6B3A1F',marginTop:4 }}>Loading AR experience</p>
        </div>
      )}

      {scanned && !scanning && (
        <div className="fade-up" style={{ margin:'1rem',background:'linear-gradient(135deg,#E0EFFF,#C0D8F0)',borderRadius:20,padding:'1.5rem',border:'2px solid #2D6A8A30' }}>
          <div style={{ display:'flex',alignItems:'center',gap:'0.8rem',marginBottom:'0.8rem' }}>
            <span style={{ fontSize:'2.5rem' }}>{scanned.emoji}</span>
            <div>
              <p style={{ fontWeight:700,fontSize:'0.95rem' }}>🥽 AR Active: {scanned.name}</p>
              <p style={{ fontSize:'0.78rem',color:'#2D6A8A' }}>Experience loaded successfully!</p>
            </div>
          </div>
          <div style={{ background:'#2D6A8A',borderRadius:14,padding:'1rem',textAlign:'center',color:'white' }}>
            <span style={{ fontSize:'3rem',display:'block',animation:'pulse 1.5s ease-in-out infinite' }}>🏛️</span>
            <p style={{ fontSize:'0.82rem',marginTop:6,opacity:0.9 }}>AR Visualization Active</p>
            <p style={{ fontSize:'0.72rem',opacity:0.7 }}>Move your phone to explore</p>
          </div>
          <button onClick={()=>setScanned(null)} style={{ width:'100%',marginTop:'0.8rem',padding:'0.8rem',borderRadius:50,border:'none',background:'#2D6A8A',color:'white',fontWeight:700,cursor:'pointer' }}>Exit AR</button>
        </div>
      )}

      <div style={{ padding:'0 1rem',display:'flex',flexDirection:'column',gap:'0.8rem' }}>
        {arSites.map((site,i)=>(
          <div key={i} className={`fade-up-${i+1}`} style={{ background:'white',borderRadius:18,padding:'1.2rem',boxShadow:'0 4px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ display:'flex',gap:'0.8rem',alignItems:'center',marginBottom:site.available?'0.8rem':0 }}>
              <span style={{ fontSize:'2rem' }}>{site.emoji}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700,fontSize:'0.9rem' }}>{site.name}</p>
                <p style={{ fontSize:'0.75rem',color:'#6B3A1F' }}>{site.desc}</p>
              </div>
              <span style={{ background:site.available?'#E6F5ED':'#F5F5F5',color:site.available?'#1B8A4C':'#999',padding:'0.2rem 0.6rem',borderRadius:50,fontSize:'0.65rem',fontWeight:700 }}>
                {site.available?'Available':'Soon'}
              </span>
            </div>
            {site.available && (
              <button onClick={()=>startScan(site)} style={{ width:'100%',padding:'0.7rem',borderRadius:50,border:'none',background:'linear-gradient(135deg,#2D6A8A,#1A4A6A)',color:'white',fontWeight:700,fontSize:'0.85rem',cursor:'pointer' }}>
                📱 Scan QR / Launch AR
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== EMERGENCY =====================
export function Emergency({ onMenu }) {
  const [calling, setCalling] = useState(null);

  const call = (name) => {
    setCalling(name);
    setTimeout(()=>setCalling(null), 2000);
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Emergency" onMenu={onMenu} />
      <div style={{ background:'linear-gradient(135deg,#CC0000,#990000)', padding:'1.5rem', margin:'1rem', borderRadius:20 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>🚨 Emergency Contacts</h3>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', marginTop:4 }}>Tamil Nadu Tourist Safety Numbers · Available 24/7</p>
      </div>

      {calling && (
        <div className="fade-up" style={{ margin:'1rem',background:'#E6F5ED',border:'2px solid #1B8A4C',borderRadius:16,padding:'1rem',display:'flex',gap:'0.8rem',alignItems:'center' }}>
          <span style={{ fontSize:'1.5rem',animation:'pulse 1s ease-in-out infinite' }}>📞</span>
          <div>
            <p style={{ fontWeight:700,color:'#1B8A4C',fontSize:'0.9rem' }}>Connecting to {calling}...</p>
            <p style={{ fontSize:'0.75rem',color:'#2D8A4C' }}>Please stay on the line</p>
          </div>
        </div>
      )}

      <div style={{ padding:'0 1rem',display:'flex',flexDirection:'column',gap:'0.8rem' }}>
        {emergencyContacts.map((contact,i)=>(
          <div key={i} className={`fade-up-${Math.min(i+1,5)}`} style={{ background:'white',borderRadius:18,padding:'1.2rem',boxShadow:'0 4px 12px rgba(0,0,0,0.06)',display:'flex',gap:'1rem',alignItems:'center' }}>
            <div style={{ width:48,height:48,borderRadius:14,background:'#FFF0E6',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1.5rem',flexShrink:0 }}>{contact.emoji}</div>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700,fontSize:'0.9rem' }}>{contact.name}</p>
              <p style={{ fontSize:'0.85rem',color:'#FF6B00',fontWeight:700 }}>{contact.number}</p>
              <p style={{ fontSize:'0.7rem',color:'#6B3A1F' }}>{contact.available}</p>
            </div>
            <button onClick={()=>call(contact.name)} style={{ width:42,height:42,borderRadius:'50%',border:'none',background:'linear-gradient(135deg,#CC0000,#990000)',color:'white',fontSize:'1.1rem',cursor:'pointer' }}>📞</button>
          </div>
        ))}
      </div>

      {/* SOS Button */}
      <div style={{ margin:'1.5rem 1rem 0' }}>
        <button style={{
          width:'100%', padding:'1.2rem', borderRadius:20, border:'none',
          background:'linear-gradient(135deg,#CC0000,#990000)',
          color:'white', fontFamily:"'Playfair Display',serif",
          fontSize:'1.2rem', fontWeight:900, cursor:'pointer',
          boxShadow:'0 8px 24px rgba(204,0,0,0.4)',
          animation:'pulse 2s ease-in-out infinite',
        }}>
          🆘 SOS — SEND MY LOCATION
        </button>
        <p style={{ textAlign:'center',fontSize:'0.72rem',color:'#6B3A1F',marginTop:6 }}>Sends GPS location to nearest police station</p>
      </div>
    </div>
  );
}

// ===================== SIMPLE SCREENS =====================
export function AIAlerts({ onMenu }) {
  const alerts = [
    { type:'warning', emoji:'⚠️', title:'Heavy Rain Alert', desc:'Ooty & Kodaikanal — avoid hill roads today', time:'2 hrs ago', color:'#FFF8E0', border:'#F0A500' },
    { type:'info', emoji:'ℹ️', title:'Pongal Festival', desc:'Madurai temples crowded this weekend — book early', time:'5 hrs ago', color:'#E6F5ED', border:'#1B8A4C' },
    { type:'tip', emoji:'💡', title:'Travel Tip', desc:'Best time to visit Brihadeeswarar: Early morning 6-8 AM', time:'1 day ago', color:'#FFF0E6', border:'#FF6B00' },
    { type:'safety', emoji:'🛡️', title:'Safety Advisory', desc:'Keep valuables safe at Mahabalipuram beach area', time:'1 day ago', color:'#F0F0FF', border:'#6B3A9A' },
  ];
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="AI Alerts" onMenu={onMenu} />
      <div style={{ padding:'1rem', display:'flex', flexDirection:'column', gap:'0.8rem' }}>
        {alerts.map((a,i)=>(
          <div key={i} className={`fade-up-${i+1}`} style={{ background:a.color, borderRadius:18, padding:'1.2rem', border:`2px solid ${a.border}30`, boxShadow:'0 4px 12px rgba(0,0,0,0.05)' }}>
            <div style={{ display:'flex', gap:'0.8rem', alignItems:'flex-start' }}>
              <span style={{ fontSize:'1.5rem' }}>{a.emoji}</span>
              <div style={{ flex:1 }}>
                <p style={{ fontWeight:700, fontSize:'0.9rem' }}>{a.title}</p>
                <p style={{ fontSize:'0.82rem', color:'#6B3A1F', marginTop:3, lineHeight:1.5 }}>{a.desc}</p>
                <p style={{ fontSize:'0.68rem', color:'#9B6A4F', marginTop:6 }}>{a.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function CulturalHub({ onMenu }) {
  const items = [
    { emoji:'🎭', title:'Bharatanatyam', desc:'Classical dance form originating from Tamil Nadu temples', tag:'Dance' },
    { emoji:'🥁', title:'Thavil & Nadaswaram', desc:'Traditional percussion & wind instruments', tag:'Music' },
    { emoji:'🎨', title:'Tanjore Painting', desc:'Gold-foil art with Hindu deities, 16th century origin', tag:'Art' },
    { emoji:'🍛', title:'Chettinad Cuisine', desc:'Aromatic spice-heavy dishes from Karaikudi region', tag:'Food' },
    { emoji:'🌸', title:'Pongal Festival', desc:'4-day harvest festival, TN\'s biggest cultural celebration', tag:'Festival' },
    { emoji:'🏺', title:'Kondapalli Crafts', desc:'Handcrafted wooden toys and decorative items', tag:'Craft' },
  ];
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Cultural Hub" onMenu={onMenu} />
      <div style={{ background:'linear-gradient(135deg,#6B3A9A,#4A2070)', padding:'1.5rem', margin:'1rem', borderRadius:20 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>🎭 Tamil Culture & Heritage</h3>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', marginTop:4 }}>5000 years of art, music and tradition</p>
      </div>
      <div style={{ padding:'0 1rem', display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.8rem' }}>
        {items.map((item,i)=>(
          <div key={i} className={`fade-up-${Math.min(i+1,5)}`} style={{ background:'white',borderRadius:18,padding:'1.2rem',boxShadow:'0 4px 12px rgba(0,0,0,0.06)' }}>
            <span style={{ fontSize:'2.5rem', display:'block', marginBottom:'0.6rem' }}>{item.emoji}</span>
            <p style={{ fontWeight:700, fontSize:'0.85rem' }}>{item.title}</p>
            <p style={{ fontSize:'0.72rem', color:'#6B3A1F', marginTop:4, lineHeight:1.4 }}>{item.desc}</p>
            <span style={{ display:'inline-block', marginTop:6, background:'#F0E8FF', color:'#6B3A9A', padding:'0.2rem 0.6rem', borderRadius:50, fontSize:'0.65rem', fontWeight:700 }}>{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TravelEssentials({ onMenu }) {
  const essentials = [
    { emoji:'📋', title:'Entry Requirements', desc:'Aadhaar/Passport for domestic travel. No visa needed within India.', done:true },
    { emoji:'💊', title:'Health Tips', desc:'Carry ORS packets, sunscreen SPF50+. Stay hydrated in summer.', done:false },
    { emoji:'💱', title:'Currency', desc:'INR accepted everywhere. UPI works in most places. ATMs available.', done:true },
    { emoji:'📱', title:'Useful Apps', desc:'IRCTC, Ola, Zomato, Google Maps (works offline)', done:false },
    { emoji:'👗', title:'Dress Code', desc:'Cover shoulders & legs at temples. Remove footwear at temple entrances.', done:false },
    { emoji:'🌡️', title:'Weather Prep', desc:'Carry light cotton clothes. Umbrella for sudden rains.', done:true },
  ];
  const [checked, setChecked] = useState(essentials.map(e=>e.done));
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Travel Essentials" onMenu={onMenu} />
      <div style={{ background:'linear-gradient(135deg,#CC5500,#FF6B00)', padding:'1.5rem', margin:'1rem', borderRadius:20 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>🎒 Travel Checklist</h3>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', marginTop:4 }}>{checked.filter(Boolean).length}/{essentials.length} items ready</p>
      </div>
      <div style={{ padding:'0 1rem', display:'flex', flexDirection:'column', gap:'0.7rem' }}>
        {essentials.map((item,i)=>(
          <div key={i} onClick={()=>setChecked(prev=>{const n=[...prev];n[i]=!n[i];return n;})} style={{ background:'white',borderRadius:18,padding:'1.2rem',boxShadow:'0 4px 12px rgba(0,0,0,0.06)',display:'flex',gap:'1rem',alignItems:'flex-start',cursor:'pointer',border:`2px solid ${checked[i]?'#1B8A4C30':'transparent'}`,transition:'all 0.2s' }}>
            <div style={{ width:28,height:28,borderRadius:8,background:checked[i]?'#1B8A4C':'white',border:`2px solid ${checked[i]?'#1B8A4C':'#E0D0C0'}`,display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:'0.85rem',flexShrink:0,marginTop:2 }}>{checked[i]?'✓':''}</div>
            <div>
              <p style={{ fontWeight:700, fontSize:'0.9rem' }}>{item.emoji} {item.title}</p>
              <p style={{ fontSize:'0.8rem', color:'#6B3A1F', marginTop:3, lineHeight:1.5 }}>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function EnhancedSafety({ onMenu }) {
// const [tracking, setTracking] = useState(false);
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Enhanced Safety" onMenu={onMenu} />
      <div style={{ padding:'1rem' }}>
        <div style={{ background:'linear-gradient(135deg,#1B8A4C,#0D5C30)', borderRadius:20, padding:'1.5rem', marginBottom:'1rem' }}>
          <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>🛡️ Safety Dashboard</h3>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', marginTop:4 }}>Real-time safety monitoring for your journey</p>
        </div>
        {[
          { emoji:'📍', title:'Live Location Sharing', desc:'Share real-time location with family', action:'Enable', color:'#E6F5ED', btn:'#1B8A4C' },
          { emoji:'🆘', title:'Emergency SOS', desc:'One tap sends location to emergency contacts', action:'Setup', color:'#FFE6E6', btn:'#CC0000' },
          { emoji:'⚠️', title:'Area Safety Score', desc:'AI-powered safety rating for your current area', action:'Check', color:'#FFF0E6', btn:'#FF6B00' },
          { emoji:'👮', title:'Nearest Police Station', desc:'Sathyamangalam Police — 0.5 km away', action:'Navigate', color:'#F0F0FF', btn:'#6B3A9A' },
        ].map((item,i)=>(
          <div key={i} className={`fade-up-${i+1}`} style={{ background:item.color,borderRadius:18,padding:'1.2rem',marginBottom:'0.8rem',display:'flex',gap:'1rem',alignItems:'center' }}>
            <span style={{ fontSize:'2rem' }}>{item.emoji}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:'0.9rem' }}>{item.title}</p>
              <p style={{ fontSize:'0.78rem', color:'#6B3A1F', marginTop:3 }}>{item.desc}</p>
            </div>
            <button style={{ background:item.btn,color:'white',border:'none',padding:'0.5rem 0.9rem',borderRadius:50,fontWeight:700,fontSize:'0.75rem',cursor:'pointer' }}>{item.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GroupTracking({ onMenu }) {
  const members = [
    { name:'Priya', status:'At Meenakshi Temple', emoji:'🛕', online:true, dist:'0 km' },
    { name:'Ravi', status:'En route to Madurai', emoji:'🚗', online:true, dist:'12 km' },
    { name:'Anitha', status:'Hotel - Resting', emoji:'🏨', online:false, dist:'2 km' },
    { name:'Kumar', status:'Local Market', emoji:'🛍️', online:true, dist:'0.5 km' },
  ];
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Group Tracking" onMenu={onMenu} />
      <div style={{ background:'linear-gradient(135deg,#2D6A8A,#1A4A6A)', padding:'1.5rem', margin:'1rem', borderRadius:20 }}>
        <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>👥 Your Travel Group</h3>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem', marginTop:4 }}>{members.filter(m=>m.online).length} of {members.length} members online</p>
      </div>
      <div style={{ padding:'0 1rem', display:'flex', flexDirection:'column', gap:'0.8rem' }}>
        {members.map((m,i)=>(
          <div key={i} className={`fade-up-${i+1}`} style={{ background:'white',borderRadius:18,padding:'1.2rem',boxShadow:'0 4px 12px rgba(0,0,0,0.06)',display:'flex',gap:'1rem',alignItems:'center' }}>
            <div style={{ position:'relative' }}>
              <div style={{ width:48,height:48,borderRadius:'50%',background:'linear-gradient(135deg,#FF6B00,#CC5500)',display:'flex',alignItems:'center',justifyContent:'center',color:'white',fontWeight:700,fontSize:'1.1rem' }}>{m.name[0]}</div>
              <div style={{ position:'absolute',bottom:0,right:0,width:12,height:12,borderRadius:'50%',background:m.online?'#2ecc71':'#999',border:'2px solid white' }}/>
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:'0.92rem' }}>{m.name}</p>
              <p style={{ fontSize:'0.78rem', color:'#6B3A1F' }}>{m.emoji} {m.status}</p>
            </div>
            <div style={{ textAlign:'right' }}>
              <p style={{ fontSize:'0.75rem', fontWeight:700, color:'#FF6B00' }}>{m.dist}</p>
              <p style={{ fontSize:'0.65rem', color:m.online?'#1B8A4C':'#999' }}>{m.online?'Online':'Offline'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeatherScreen({ onMenu }) {
  const forecasts = [
    { day:'Today', emoji:'⛅', high:32, low:24, desc:'Partly Cloudy' },
    { day:'Tomorrow', emoji:'☀️', high:34, low:25, desc:'Sunny' },
    { day:'Wed', emoji:'🌧️', high:28, low:22, desc:'Light Rain' },
    { day:'Thu', emoji:'⛅', high:31, low:23, desc:'Partly Cloudy' },
    { day:'Fri', emoji:'☀️', high:35, low:26, desc:'Hot & Sunny' },
  ];
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Weather" onMenu={onMenu} />
      <div style={{ background:'linear-gradient(135deg,#1A4A8A,#2D6A8A)', padding:'2rem 1.5rem', margin:'1rem', borderRadius:20, textAlign:'center' }}>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.82rem' }}>📍 Madurai, Tamil Nadu</p>
        <span style={{ fontSize:'4rem', display:'block', margin:'0.5rem 0' }}>⛅</span>
        <p style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'3rem', fontWeight:900 }}>32°C</p>
        <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.9rem' }}>Partly Cloudy · Humidity 68%</p>
        <div style={{ display:'flex', justifyContent:'space-around', marginTop:'1rem' }}>
          {[['💧','68%','Humidity'],['💨','14 km/h','Wind'],['👁️','8 km','Visibility']].map(([e,v,l])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <span style={{ fontSize:'1.2rem', display:'block' }}>{e}</span>
              <span style={{ color:'white', fontWeight:700, fontSize:'0.85rem', display:'block' }}>{v}</span>
              <span style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.65rem' }}>{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding:'0 1rem' }}>
        <p style={{ fontSize:'0.8rem', fontWeight:700, color:'#6B3A1F', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.8rem' }}>5-Day Forecast</p>
        <div style={{ background:'white', borderRadius:18, padding:'0.5rem', boxShadow:'0 4px 12px rgba(0,0,0,0.06)' }}>
          {forecasts.map((f,i)=>(
            <div key={i} style={{ display:'flex', alignItems:'center', gap:'1rem', padding:'0.8rem 0.6rem', borderBottom:i<4?'1px solid #F5EDE0':'none' }}>
              <span style={{ fontSize:'0.85rem', fontWeight:600, color:'#6B3A1F', minWidth:55 }}>{f.day}</span>
              <span style={{ fontSize:'1.5rem' }}>{f.emoji}</span>
              <span style={{ flex:1, fontSize:'0.8rem', color:'#6B3A1F' }}>{f.desc}</span>
              <span style={{ fontSize:'0.82rem', fontWeight:700, color:'#CC5500' }}>{f.high}°</span>
              <span style={{ fontSize:'0.78rem', color:'#9B6A4F' }}>{f.low}°</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlockchainID({ onMenu }) {
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Blockchain ID" onMenu={onMenu} />
      <div style={{ padding:'1rem' }}>
        <div style={{ background:'linear-gradient(135deg,#1A0A00,#3A1A00)', borderRadius:20, padding:'2rem', marginBottom:'1rem', textAlign:'center', position:'relative', overflow:'hidden' }}>
          <div style={{ position:'absolute', top:-40, left:-40, width:150, height:150, background:'rgba(255,107,0,0.1)', borderRadius:'50%' }}/>
          <span style={{ fontSize:'3rem', display:'block', marginBottom:'0.8rem' }}>🔗</span>
          <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.2rem', fontWeight:900 }}>Decentralized Tourist ID</h3>
          <p style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.8rem', marginTop:6 }}>Blockchain-verified identity for secure tourism services</p>
          <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:12, padding:'1rem', marginTop:'1.2rem' }}>
            <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.68rem', letterSpacing:1 }}>DID</p>
            <p style={{ color:'#FF6B00', fontSize:'0.72rem', fontFamily:'monospace', marginTop:2, wordBreak:'break-all' }}>did:tn:0x8f3a2b4c1d9e7f5a3b2c4d1e9f7a5b3c2d</p>
          </div>
        </div>
        {[
          { emoji:'✅', title:'Identity Verified', desc:'Government-backed digital ID', status:'Active' },
          { emoji:'🛡️', title:'Service Access', desc:'Verified guides, shops & hotels', status:'Enabled' },
          { emoji:'📋', title:'Travel History', desc:'4 sites visited · Immutable record', status:'3 records' },
          { emoji:'🏆', title:'Eco Points', desc:'Rewards for sustainable travel', status:'245 pts' },
        ].map((item,i)=>(
          <div key={i} className={`fade-up-${i+1}`} style={{ background:'white',borderRadius:18,padding:'1.2rem',marginBottom:'0.8rem',boxShadow:'0 4px 12px rgba(0,0,0,0.06)',display:'flex',gap:'1rem',alignItems:'center' }}>
            <span style={{ fontSize:'2rem' }}>{item.emoji}</span>
            <div style={{ flex:1 }}>
              <p style={{ fontWeight:700, fontSize:'0.9rem' }}>{item.title}</p>
              <p style={{ fontSize:'0.78rem', color:'#6B3A1F', marginTop:2 }}>{item.desc}</p>
            </div>
            <span style={{ background:'#E6F5ED',color:'#1B8A4C',padding:'0.25rem 0.7rem',borderRadius:50,fontSize:'0.7rem',fontWeight:700 }}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SimpleScreen({ title, emoji, onMenu }) {
  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)' }}>
      <Header title={title} onMenu={onMenu} />
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'4rem 2rem', textAlign:'center' }}>
        <span style={{ fontSize:'4rem', marginBottom:'1rem' }}>{emoji}</span>
        <h3 style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.3rem', fontWeight:900, marginBottom:'0.5rem' }}>{title}</h3>
        <p style={{ color:'#6B3A1F', fontSize:'0.9rem' }}>Feature coming soon in the full version!</p>
      </div>
    </div>
  );
}
