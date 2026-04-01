import React, { useState } from 'react';
import Header from '../components/Header';
import { sites } from '../data/tnData';

const filters = ['All','Heritage','Nature','Pilgrimage','Wildlife','UNESCO'];

export default function ExperienceHub({ onMenu }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = sites.filter(s =>
    (filter==='All' || s.type===filter) &&
    (s.name.toLowerCase().includes(search.toLowerCase()) || s.city.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight:'100vh', background:'var(--cream)', paddingBottom:20 }}>
      <Header title="Experience Hub" onMenu={onMenu} />

      {/* Hero */}
      <div style={{
        background:'linear-gradient(135deg, #FF6B00 0%, #CC5500 100%)',
        padding:'1.5rem', margin:'1rem', borderRadius:20,
        position:'relative', overflow:'hidden',
      }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:120, height:120, background:'rgba(255,255,255,0.1)', borderRadius:'50%' }} />
        <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'0.8rem' }}>Welcome to</p>
        <h2 style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.6rem', fontWeight:900 }}>Tamil Nadu</h2>
        <p style={{ color:'rgba(255,255,255,0.85)', fontSize:'0.85rem', marginTop:4 }}>🏛️ Land of Temples & Natural Wonders</p>
        <div style={{ display:'flex', gap:'1rem', marginTop:'1rem' }}>
          {[['8','Sites'],['3','UNESCO'],['4','Types']].map(([n,l])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <p style={{ fontFamily:"'Playfair Display',serif", color:'white', fontSize:'1.4rem', fontWeight:900 }}>{n}</p>
              <p style={{ color:'rgba(255,255,255,0.75)', fontSize:'0.65rem' }}>{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      <div style={{ padding:'0 1rem', marginBottom:'0.8rem' }}>
        <input
          value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="🔍 Search temples, hills, beaches..."
          style={{
            width:'100%', padding:'0.85rem 1rem',
            borderRadius:50, border:'2px solid #F0E8E0',
            fontSize:'0.9rem', outline:'none',
            fontFamily:"'DM Sans',sans-serif",
            background:'white',
          }}
        />
      </div>

      {/* Filters */}
      <div style={{ display:'flex', gap:'0.5rem', padding:'0 1rem', overflowX:'auto', marginBottom:'1rem', paddingBottom:4 }}>
        {filters.map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{
            padding:'0.4rem 1rem', borderRadius:50, border:'none',
            background: filter===f ? '#FF6B00' : 'white',
            color: filter===f ? 'white' : '#6B3A1F',
            fontWeight:600, fontSize:'0.8rem', cursor:'pointer',
            whiteSpace:'nowrap', flexShrink:0,
            boxShadow:'0 2px 8px rgba(0,0,0,0.06)',
            transition:'all 0.2s',
          }}>{f}</button>
        ))}
      </div>

      {/* Sites */}
      <div style={{ padding:'0 1rem', display:'flex', flexDirection:'column', gap:'0.8rem' }}>
        {filtered.map((site,i)=>(
          <div key={site.id} className={`fade-up-${Math.min(i+1,5)}`} style={{
            background:'white', borderRadius:20, overflow:'hidden',
            boxShadow:'0 4px 16px rgba(0,0,0,0.06)',
            border:'1px solid rgba(255,107,0,0.08)',
          }}>
            {/* Color banner */}
            <div style={{
              height:80, background:`linear-gradient(135deg, ${
                site.type==='Heritage'?'#FF6B00,#CC5500':
                site.type==='UNESCO'?'#D4A017,#A07010':
                site.type==='Nature'?'#1B8A4C,#0D5C30':
                site.type==='Pilgrimage'?'#6B3A9A,#4A2070':
                '#2D6A8A,#1A4A6A'
              })`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'3rem',
            }}>{site.emoji}</div>

            <div style={{ padding:'1rem' }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
                <div>
                  <h3 style={{ fontWeight:800, fontSize:'0.95rem', color:'#1A0A00' }}>{site.name}</h3>
                  <p style={{ fontSize:'0.78rem', color:'#6B3A1F', marginTop:2 }}>📍 {site.city}</p>
                </div>
                <div style={{ textAlign:'right' }}>
                  <p style={{ fontWeight:900, color:'#FF6B00', fontSize:'0.9rem' }}>⭐ {site.rating}</p>
                  <p style={{ fontSize:'0.68rem', color:'#6B3A1F' }}>{site.dist}</p>
                </div>
              </div>
              <p style={{ fontSize:'0.82rem', color:'#6B3A1F', lineHeight:1.5, marginBottom:10 }}>{site.desc}</p>
              <div style={{ display:'flex', gap:'0.4rem', flexWrap:'wrap' }}>
                {site.tags.map(tag=>(
                  <span key={tag} style={{
                    background:'#FFF0E6', color:'#CC5500',
                    padding:'0.2rem 0.6rem', borderRadius:50,
                    fontSize:'0.68rem', fontWeight:600,
                  }}>{tag}</span>
                ))}
                {site.ar && <span style={{ background:'#E6F5ED', color:'#1B8A4C', padding:'0.2rem 0.6rem', borderRadius:50, fontSize:'0.68rem', fontWeight:600 }}>🥽 AR Available</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
