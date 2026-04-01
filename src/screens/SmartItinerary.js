import React, { useState } from 'react';
import Header from '../components/Header';
import { itineraries, sites } from '../data/tnData';

export default function SmartItinerary({ onMenu }) {
  const [selected, setSelected] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [prefs, setPrefs] = useState({ days:'3', type:'Heritage', budget:'Mid-range' });

  const generate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2500);
  };

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Smart Itinerary" onMenu={onMenu} />

      <div style={{ padding:'1rem' }}>
        {/* AI Planner Card */}
        <div className="fade-up" style={{
          background:'linear-gradient(135deg,#1B8A4C,#0D5C30)',
          borderRadius:20, padding:'1.5rem', marginBottom:'1rem',
        }}>
          <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.8rem' }}>Powered by</p>
          <h3 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.3rem', fontWeight:900 }}>🤖 AI Itinerary Planner</h3>
          <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.82rem', marginTop:4 }}>Personalized travel plans for Tamil Nadu</p>
        </div>

        {/* Preferences */}
        {!generated && (
          <div className="fade-up-1" style={{ background:'white', borderRadius:20, padding:'1.5rem', marginBottom:'1rem', boxShadow:'0 4px 16px rgba(0,0,0,0.06)' }}>
            <h4 style={{ fontWeight:700, marginBottom:'1rem', fontSize:'0.95rem' }}>✨ Customize Your Trip</h4>

            <label style={{ fontSize:'0.78rem', fontWeight:700, color:'#6B3A1F', display:'block', marginBottom:4 }}>TRIP DURATION</label>
            <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1rem' }}>
              {['2','3','5','7'].map(d=>(
                <button key={d} onClick={()=>setPrefs(p=>({...p,days:d}))} style={{
                  flex:1, padding:'0.6rem', borderRadius:10, border:'2px solid',
                  borderColor: prefs.days===d ? '#1B8A4C' : '#F0E8E0',
                  background: prefs.days===d ? '#E6F5ED' : 'white',
                  color: prefs.days===d ? '#1B8A4C' : '#6B3A1F',
                  fontWeight:700, cursor:'pointer', fontSize:'0.85rem',
                }}>{d}D</button>
              ))}
            </div>

            <label style={{ fontSize:'0.78rem', fontWeight:700, color:'#6B3A1F', display:'block', marginBottom:4 }}>INTEREST</label>
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1rem' }}>
              {['Heritage','Nature','Pilgrimage','Wildlife'].map(t=>(
                <button key={t} onClick={()=>setPrefs(p=>({...p,type:t}))} style={{
                  padding:'0.4rem 0.8rem', borderRadius:50, border:'2px solid',
                  borderColor: prefs.type===t ? '#FF6B00' : '#F0E8E0',
                  background: prefs.type===t ? '#FFF0E6' : 'white',
                  color: prefs.type===t ? '#FF6B00' : '#6B3A1F',
                  fontWeight:600, cursor:'pointer', fontSize:'0.78rem',
                }}>{t}</button>
              ))}
            </div>

            <label style={{ fontSize:'0.78rem', fontWeight:700, color:'#6B3A1F', display:'block', marginBottom:4 }}>BUDGET</label>
            <div style={{ display:'flex', gap:'0.5rem', marginBottom:'1.5rem' }}>
              {['Budget','Mid-range','Luxury'].map(b=>(
                <button key={b} onClick={()=>setPrefs(p=>({...p,budget:b}))} style={{
                  flex:1, padding:'0.5rem', borderRadius:10, border:'2px solid',
                  borderColor: prefs.budget===b ? '#D4A017' : '#F0E8E0',
                  background: prefs.budget===b ? '#FDF6E3' : 'white',
                  color: prefs.budget===b ? '#D4A017' : '#6B3A1F',
                  fontWeight:600, cursor:'pointer', fontSize:'0.75rem',
                }}>{b}</button>
              ))}
            </div>

            <button onClick={generate} style={{
              width:'100%', padding:'1rem', borderRadius:50, border:'none',
              background:'linear-gradient(135deg,#1B8A4C,#0D5C30)',
              color:'white', fontWeight:700, fontSize:'1rem', cursor:'pointer',
              boxShadow:'0 8px 24px rgba(27,138,76,0.35)',
            }}>🤖 Generate My Itinerary →</button>
          </div>
        )}

        {/* Loading */}
        {generating && (
          <div style={{ textAlign:'center', padding:'3rem' }}>
            <div style={{ width:60, height:60, borderRadius:'50%', border:'4px solid #E6F5ED', borderTop:'4px solid #1B8A4C', margin:'0 auto 1rem', animation:'spin 1s linear infinite' }} />
            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'1.1rem', fontWeight:700 }}>AI Planning Your Trip...</p>
            <p style={{ color:'#6B3A1F', fontSize:'0.82rem', marginTop:4 }}>Analyzing {prefs.days} days · {prefs.type} · {prefs.budget}</p>
          </div>
        )}

        {/* Generated Result */}
        {generated && !generating && (
          <div className="fade-up">
            <div style={{ background:'#E6F5ED', borderRadius:16, padding:'1rem', marginBottom:'1rem', display:'flex', gap:'0.8rem', alignItems:'center' }}>
              <span style={{ fontSize:'1.5rem' }}>✅</span>
              <div>
                <p style={{ fontWeight:700, color:'#1B8A4C', fontSize:'0.9rem' }}>Itinerary Generated!</p>
                <p style={{ fontSize:'0.78rem', color:'#2D8A4C' }}>{prefs.days} Days · {prefs.type} · {prefs.budget}</p>
              </div>
              <button onClick={()=>setGenerated(false)} style={{ marginLeft:'auto', background:'none', border:'none', cursor:'pointer', fontSize:'0.8rem', color:'#1B8A4C', fontWeight:700 }}>Redo</button>
            </div>

            {Array.from({length:parseInt(prefs.days)},(_,i)=>{
              const daySites = sites.filter(s=>s.type===prefs.type || (i===1 && s.type==='Nature'));
              const site = daySites[i % daySites.length] || sites[i % sites.length];
              return (
                <div key={i} style={{ background:'white', borderRadius:18, padding:'1.2rem', marginBottom:'0.8rem', boxShadow:'0 4px 12px rgba(0,0,0,0.06)' }}>
                  <div style={{ display:'flex', gap:'0.8rem', alignItems:'center', marginBottom:'0.8rem' }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#FF6B00,#CC5500)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:900, fontSize:'0.85rem', flexShrink:0 }}>D{i+1}</div>
                    <div>
                      <p style={{ fontWeight:700, fontSize:'0.9rem' }}>{site.name}</p>
                      <p style={{ fontSize:'0.72rem', color:'#6B3A1F' }}>📍 {site.city}</p>
                    </div>
                    <span style={{ marginLeft:'auto', fontSize:'1.5rem' }}>{site.emoji}</span>
                  </div>
                  {[
                    {time:'7:00 AM', act:'Departure from Chennai'},
                    {time:'11:00 AM', act:`Arrive at ${site.name}`},
                    {time:'1:00 PM', act:'Local lunch & rest'},
                    {time:'3:00 PM', act:'Guided heritage tour'},
                    {time:'6:00 PM', act:'Sunset & local market'},
                  ].map((item,j)=>(
                    <div key={j} style={{ display:'flex', gap:'0.8rem', alignItems:'flex-start', padding:'0.4rem 0', borderBottom: j<4 ? '1px solid #F5EDE0' : 'none' }}>
                      <span style={{ fontSize:'0.7rem', color:'#FF6B00', fontWeight:700, minWidth:55, flexShrink:0 }}>{item.time}</span>
                      <span style={{ fontSize:'0.82rem', color:'#1A0A00' }}>{item.act}</span>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        {/* Pre-made itineraries */}
        {!generated && !generating && (
          <>
            <p className="fade-up-2" style={{ fontSize:'0.8rem', fontWeight:700, color:'#6B3A1F', textTransform:'uppercase', letterSpacing:'0.5px', marginBottom:'0.8rem' }}>Popular Packages</p>
            {itineraries.map((it,i)=>(
              <div key={it.id} onClick={()=>setSelected(selected===it.id?null:it.id)} className={`fade-up-${i+2}`} style={{
                background:'white', borderRadius:18, padding:'1.2rem', marginBottom:'0.8rem',
                boxShadow:'0 4px 12px rgba(0,0,0,0.06)', cursor:'pointer',
                border:`2px solid ${selected===it.id?'#FF6B00':'transparent'}`,
                transition:'all 0.2s',
              }}>
                <div style={{ display:'flex', gap:'0.8rem', alignItems:'center' }}>
                  <span style={{ fontSize:'2rem' }}>{it.emoji}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontWeight:700, fontSize:'0.92rem' }}>{it.title}</p>
                    <p style={{ fontSize:'0.75rem', color:'#6B3A1F' }}>{it.desc}</p>
                  </div>
                  <span style={{ background:'#FFF0E6', color:'#FF6B00', padding:'0.25rem 0.6rem', borderRadius:50, fontSize:'0.72rem', fontWeight:700 }}>{it.days}D</span>
                </div>
                {selected===it.id && (
                  <div style={{ marginTop:'0.8rem', paddingTop:'0.8rem', borderTop:'1px solid #F5EDE0' }}>
                    <p style={{ fontSize:'0.78rem', color:'#6B3A1F', marginBottom:6 }}>📍 Places covered:</p>
                    <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                      {it.places.map(p=>(
                        <span key={p} style={{ background:'#FFF0E6', color:'#CC5500', padding:'0.25rem 0.6rem', borderRadius:50, fontSize:'0.72rem', fontWeight:600 }}>{p}</span>
                      ))}
                    </div>
                    <button style={{ width:'100%', marginTop:'0.8rem', padding:'0.8rem', borderRadius:50, border:'none', background:'linear-gradient(135deg,#FF6B00,#CC5500)', color:'white', fontWeight:700, cursor:'pointer', fontSize:'0.88rem' }}>
                      Book This Package →
                    </button>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
