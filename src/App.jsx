import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://hxaiuzxnwbttbqxosdrx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4YWl1enhud2J0dGJxeG9zZHJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ0ODI3MzAsImV4cCI6MjA5MDA1ODczMH0.IJCCqiSyxKoEWQnVLuu2VOr_IVZSEmb4x2ZHzzYzjzE',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: false
    }
  }
)
import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from './supabase.js'

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Mono:wght@400;500&family=Nunito:wght@300;400;600;700&display=swap');
:root {
  --cream:#f5efe4;--warm:#ede3d0;--card:#fdf8f0;
  --rust:#c0440e;--terra:#d4622a;--mustard:#d4a017;
  --olive:#5a6e2a;--sage:#8fa65a;
  --brown:#3d2b1f;--muted:#7a6555;--text:#2a1e14;--border:#c8b89a;
  --fd:'Playfair Display',Georgia,serif;--fm:'DM Mono',monospace;--fb:'Nunito',sans-serif;
}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html,body,#root{height:100%;overflow:hidden}
body{font-family:var(--fb);background:var(--brown);color:var(--text)}
.app{display:grid;grid-template-rows:auto 1fr auto;height:100vh;overflow:hidden}
.topbar{background:var(--brown);padding:13px 18px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid var(--rust);flex-shrink:0;z-index:10}
.topbar-left{display:flex;align-items:center;gap:10px}
.logo{font-family:var(--fd);font-weight:900;font-size:20px;color:var(--mustard);letter-spacing:3px}
.page-title{font-family:var(--fd);font-size:16px;font-weight:700;color:rgba(255,255,255,0.45)}
.topbar-right{display:flex;align-items:center;gap:8px}
.user-pill{font-family:var(--fm);font-size:9px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.4);padding:5px 10px;border:1px solid rgba(255,255,255,0.15);border-radius:20px}
.btn{font-family:var(--fm);font-size:10px;letter-spacing:1px;padding:7px 14px;border-radius:6px;cursor:pointer;border:none;text-transform:uppercase;transition:all 0.2s}
.btn-outline{background:transparent;border:1.5px solid rgba(255,255,255,0.25);color:rgba(255,255,255,0.6)}
.btn-outline:hover{border-color:var(--mustard);color:var(--mustard)}
.btn-primary{background:var(--mustard);color:var(--brown);font-weight:700}
.btn-primary:hover{background:#e0b01e}
.btn-rust{background:var(--rust);color:white;font-weight:700}
.btn-rust:hover{background:#a33a0c}
.btn-sm{padding:5px 10px;font-size:9px}
.login-wrap{display:flex;align-items:center;justify-content:center;height:100%;background:var(--cream)}
.login-card{background:var(--card);border:1.5px solid var(--border);border-radius:16px;padding:36px 32px;width:100%;max-width:360px;text-align:center}
.login-logo{font-family:var(--fd);font-weight:900;font-size:42px;color:var(--rust);letter-spacing:4px;margin-bottom:6px}
.login-sub{font-family:var(--fm);font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin-bottom:28px}
.input{width:100%;padding:11px 14px;border:1.5px solid var(--border);border-radius:8px;font-family:var(--fb);font-size:14px;background:var(--warm);color:var(--text);margin-bottom:10px;outline:none;transition:border-color 0.2s}
.input:focus{border-color:var(--rust)}
.login-err{font-size:12px;color:var(--rust);margin-bottom:10px}
.login-toggle{font-size:12px;color:var(--muted);margin-top:14px;cursor:pointer}
.login-toggle span{color:var(--rust);text-decoration:underline}
.pages-viewport{overflow:hidden;position:relative;flex:1}
.pages-track{display:flex;height:100%;width:500%;transition:transform 0.42s cubic-bezier(0.4,0,0.2,1);will-change:transform}
.page{width:20%;height:100%;overflow-y:auto;background:var(--cream);-webkit-overflow-scrolling:touch}
.page::-webkit-scrollbar{width:3px}
.page::-webkit-scrollbar-thumb{background:var(--border);border-radius:4px}
.content{padding:22px 18px 48px;max-width:700px;margin:0 auto}
.section-label{font-family:var(--fm);font-size:10px;letter-spacing:3px;text-transform:uppercase;color:var(--muted);margin-bottom:12px;display:flex;align-items:center;gap:8px}
.section-label::after{content:'';flex:1;height:1px;background:var(--border)}
.card{background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:18px 16px;margin-bottom:18px}
.card-header{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:3px}
.card-title{font-family:var(--fd);font-size:17px;font-weight:700;color:var(--brown)}
.card-yr{font-family:var(--fm);font-size:11px;color:var(--mustard);letter-spacing:2px}
.card-sub{font-size:11px;color:var(--muted);margin-bottom:14px}
.stats-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:11px;margin-bottom:18px}
.stat-card{background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:16px 14px 13px;position:relative;overflow:hidden;transition:transform 0.2s}
.stat-card:hover{transform:translateY(-2px)}
.stat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px}
.c-rust::before{background:var(--rust)}.c-mustard::before{background:var(--mustard)}
.c-olive::before{background:var(--olive)}.c-terra::before{background:var(--terra)}
.stat-lbl{font-family:var(--fm);font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:7px}
.stat-val{font-family:var(--fd);font-size:30px;font-weight:900;line-height:1;margin-bottom:4px}
.c-rust .stat-val{color:var(--rust)}.c-mustard .stat-val{color:var(--mustard)}
.c-olive .stat-val{color:var(--olive)}.c-terra .stat-val{color:var(--terra)}
.stat-sub{font-size:10px;color:var(--muted)}
.badges{display:flex;gap:4px;flex-wrap:wrap;margin-top:5px}
.badge{font-family:var(--fm);font-size:8px;letter-spacing:1px;padding:1px 7px;border-radius:20px;border:1px solid currentColor;color:var(--mustard)}
.ev-list{display:flex;flex-direction:column}
.ev-item{display:grid;grid-template-columns:4px 1fr auto;align-items:center;gap:11px;padding:11px 0;border-bottom:1px solid var(--border)}
.ev-item:last-child{border-bottom:none}
.ev-bar{width:4px;height:32px;border-radius:4px}
.eb-mustard{background:var(--mustard)}.eb-rust{background:var(--rust)}
.eb-olive{background:var(--olive)}.eb-terra{background:var(--terra)}.eb-sage{background:var(--sage)}
.ev-name{font-weight:700;font-size:13px;margin-bottom:2px}
.ev-detail{font-size:10px;color:var(--muted)}
.ev-date{font-family:var(--fm);font-size:10px;color:var(--muted);white-space:nowrap;text-align:right}
.task-group-lbl{font-family:var(--fm);font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--muted);margin:16px 0 8px}
.task-list{display:flex;flex-direction:column;gap:7px}
.task-item{display:flex;align-items:center;gap:10px;padding:10px 13px;border-radius:8px;background:var(--warm);border:1px solid transparent;cursor:pointer;transition:all 0.2s}
.task-item:hover{border-color:var(--border)}
.task-item.done{opacity:0.45}
.task-check{width:18px;height:18px;border-radius:50%;border:2px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:10px;color:white;transition:all 0.2s}
.task-item.done .task-check{background:var(--olive);border-color:var(--olive)}
.task-text{font-size:13px;flex:1}
.task-item.done .task-text{text-decoration:line-through;color:var(--muted)}
.task-tag{font-family:var(--fm);font-size:9px;letter-spacing:1px;padding:2px 8px;border-radius:20px;text-transform:uppercase;white-space:nowrap}
.t-rust{background:rgba(192,68,14,0.12);color:var(--rust)}
.t-olive{background:rgba(90,110,42,0.12);color:var(--olive)}
.t-mustard{background:rgba(212,160,23,0.15);color:#7a5a00}
.progress-wrap{background:var(--warm);border-radius:20px;height:5px;margin-bottom:16px;overflow:hidden}
.progress-fill{height:100%;border-radius:20px;background:linear-gradient(90deg,var(--rust),var(--mustard));transition:width 0.6s}
.ep-banner{background:linear-gradient(135deg,var(--brown) 55%,var(--rust));border-radius:14px;padding:22px 18px;margin-bottom:18px;color:white;position:relative;overflow:hidden}
.ep-banner::after{content:'EP';position:absolute;right:-8px;top:-12px;font-family:var(--fd);font-size:80px;font-weight:900;color:rgba(255,255,255,0.05);line-height:1}
.ep-title{font-family:var(--fd);font-size:24px;font-weight:900;color:var(--mustard);margin-bottom:3px}
.ep-sub{font-size:11px;color:rgba(255,255,255,0.5);margin-bottom:12px}
.ep-bar-wrap{background:rgba(255,255,255,0.12);border-radius:20px;height:4px}
.ep-bar-fill{height:100%;border-radius:20px;background:var(--mustard);width:60%}
.track-list{display:flex;flex-direction:column;gap:7px}
.track-item{display:grid;grid-template-columns:36px 1fr auto;align-items:center;gap:11px;padding:11px 13px;background:var(--warm);border-radius:10px;border:1px solid transparent;cursor:pointer;transition:border-color 0.2s}
.track-item:hover{border-color:var(--border)}
.track-item.hl .track-num{color:var(--rust)}
.track-num{font-family:var(--fd);font-size:20px;font-weight:900;color:var(--border);text-align:center;line-height:1}
.track-name{font-weight:700;font-size:13px;margin-bottom:2px}
.track-meta{font-size:10px;color:var(--muted)}
.track-stat{font-family:var(--fm);font-size:10px;color:var(--mustard);text-align:right}
.track-stat span{display:block;font-size:9px;color:var(--muted);margin-top:1px}
.cal-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:3px;margin-bottom:18px}
.cal-day-name{font-family:var(--fm);font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);text-align:center;padding:3px 0}
.cal-day{aspect-ratio:1;display:flex;align-items:center;justify-content:center;border-radius:7px;font-size:12px;font-weight:600;cursor:pointer;transition:background 0.15s;color:var(--text);position:relative}
.cal-day:hover{background:var(--warm)}
.cal-day.empty{color:var(--border)}
.cal-day.today{background:var(--brown);color:var(--mustard);font-weight:700}
.cal-day.has-event::after{content:'';position:absolute;bottom:2px;left:50%;transform:translateX(-50%);width:4px;height:4px;border-radius:50%;background:var(--rust)}
.upcoming-item{display:flex;gap:12px;align-items:flex-start;padding:11px 13px;background:var(--warm);border-radius:10px;margin-bottom:8px}
.udb{background:var(--brown);border-radius:8px;padding:5px 9px;text-align:center;flex-shrink:0}
.udb-day{font-family:var(--fd);font-size:18px;font-weight:900;color:var(--mustard);line-height:1}
.udb-mon{font-family:var(--fm);font-size:7px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.4);margin-top:1px}
.upcoming-name{font-weight:700;font-size:13px;margin-bottom:2px}
.upcoming-detail{font-size:11px;color:var(--muted)}
.modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:100;display:flex;align-items:flex-end;justify-content:center}
.modal{background:var(--card);border-radius:20px 20px 0 0;padding:24px 20px 36px;width:100%;max-width:500px;border-top:2px solid var(--rust)}
.modal-title{font-family:var(--fd);font-size:18px;font-weight:700;color:var(--brown);margin-bottom:18px}
.form-label{font-family:var(--fm);font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--muted);margin-bottom:5px;display:block}
.form-group{margin-bottom:14px}
.select{width:100%;padding:10px 13px;border:1.5px solid var(--border);border-radius:8px;font-family:var(--fb);font-size:14px;background:var(--warm);color:var(--text);outline:none}
.modal-actions{display:flex;gap:8px;margin-top:20px}
.bottom-nav{background:var(--brown);border-top:2px solid var(--rust);display:flex;align-items:center;justify-content:space-around;padding:7px 0 max(7px,env(safe-area-inset-bottom));flex-shrink:0;z-index:10}
.nav-item{display:flex;flex-direction:column;align-items:center;gap:2px;cursor:pointer;padding:5px 12px;border-radius:10px;transition:background 0.2s;flex:1}
.nav-item:hover{background:rgba(255,255,255,0.06)}
.nav-icon{font-size:19px;color:rgba(255,255,255,0.3);transition:color 0.2s}
.nav-label{font-family:var(--fm);font-size:7px;letter-spacing:1px;text-transform:uppercase;color:rgba(255,255,255,0.25);transition:color 0.2s}
.nav-item.active .nav-icon,.nav-item.active .nav-label{color:var(--mustard)}
.page-dots{position:fixed;top:64px;right:12px;display:flex;flex-direction:column;gap:4px;z-index:20}
.dot{width:5px;height:5px;border-radius:50%;background:rgba(255,255,255,0.18);transition:all 0.3s}
.dot.active{background:var(--mustard);transform:scale(1.4)}
.loading-screen{display:flex;align-items:center;justify-content:center;height:100%;background:var(--cream);flex-direction:column;gap:12px}
.loading-logo{font-family:var(--fd);font-weight:900;font-size:48px;color:var(--rust);letter-spacing:4px}
.loading-dots{display:flex;gap:6px}
.loading-dot{width:8px;height:8px;border-radius:50%;background:var(--border);animation:pulse 1.2s infinite}
.loading-dot:nth-child(2){animation-delay:0.2s}
.loading-dot:nth-child(3){animation-delay:0.4s}
@keyframes pulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1)}}
.chat-wrap{display:flex;flex-direction:column;height:100%}
.chat-messages{flex:1;overflow-y:auto;padding:16px 18px;display:flex;flex-direction:column;gap:12px}
.msg{max-width:85%;padding:11px 14px;border-radius:12px;font-size:13px;line-height:1.5}
.msg.user{align-self:flex-end;background:var(--brown);color:var(--cream);border-bottom-right-radius:4px}
.msg.ai{align-self:flex-start;background:var(--card);border:1.5px solid var(--border);color:var(--text);border-bottom-left-radius:4px}
.msg-label{font-family:var(--fm);font-size:9px;letter-spacing:1px;text-transform:uppercase;color:var(--mustard);margin-bottom:5px}
.chat-input-wrap{padding:12px 16px;border-top:1.5px solid var(--border);background:var(--card);display:flex;gap:8px;align-items:flex-end}
.chat-input{flex:1;padding:10px 13px;border:1.5px solid var(--border);border-radius:10px;font-family:var(--fb);font-size:13px;background:var(--warm);color:var(--text);resize:none;outline:none;transition:border-color 0.2s;max-height:100px;min-height:40px}
.chat-input:focus{border-color:var(--rust)}
.chat-send{width:38px;height:38px;border-radius:9px;background:var(--rust);border:none;color:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:16px;transition:background 0.2s;flex-shrink:0}
.chat-send:hover{background:#a33a0c}
.chat-send:disabled{opacity:0.4;cursor:not-allowed}
.ai-intro{text-align:center;padding:24px 16px}
.ai-intro-icon{font-size:36px;margin-bottom:12px}
.ai-intro-title{font-family:var(--fd);font-size:20px;font-weight:700;color:var(--brown);margin-bottom:6px}
.ai-intro-sub{font-size:12px;color:var(--muted);line-height:1.6;margin-bottom:16px}
.ai-chips{display:flex;flex-wrap:wrap;gap:6px;justify-content:center}
.ai-chip{font-family:var(--fm);font-size:10px;padding:6px 12px;border:1.5px solid var(--border);border-radius:20px;cursor:pointer;transition:all 0.2s;color:var(--muted);background:var(--warm)}
.ai-chip:hover{border-color:var(--rust);color:var(--rust)}
`

const fmt = (d) => {
  if (!d) return ''
  const date = new Date(d + 'T00:00:00')
  return date.toLocaleDateString('es-AR', { day: 'numeric', month: 'short' })
}

const PAGES = ['Dashboard', 'Música', 'Calendario', 'Tareas', 'IA']
const NAV = [
  { icon: '⊞', label: 'Dashboard' },
  { icon: '♪', label: 'Música' },
  { icon: '◷', label: 'Calendario' },
  { icon: '✓', label: 'Tareas' },
  { icon: '✦', label: 'IA' },
]

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [metricas, setMetricas] = useState([])
  const [eventos, setEventos] = useState([])
  const [tareas, setTareas] = useState([])
  const [modal, setModal] = useState(null)
  const vpRef = useRef(null)
  const startX = useRef(0), startY = useRef(0)
  const dragging = useRef(false), delta = useRef(0)
  const trackRef = useRef(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session) return
    const load = async () => {
      const [m, e, t] = await Promise.all([
        supabase.from('metricas').select('*').order('created_at'),
        supabase.from('eventos').select('*').order('fecha'),
        supabase.from('tareas').select('*').order('created_at'),
      ])
      if (m.data) setMetricas(m.data)
      if (e.data) setEventos(e.data)
      if (t.data) setTareas(t.data)
    }
    load()
    const ch = supabase.channel('ada-realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'eventos' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'tareas' }, load)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'metricas' }, load)
      .subscribe()
    return () => supabase.removeChannel(ch)
  }, [session])

  const goTo = useCallback((idx, animate = true) => {
    if (idx < 0 || idx >= PAGES.length) return
    setPage(idx)
    if (trackRef.current) {
      trackRef.current.style.transition = animate ? 'transform 0.42s cubic-bezier(0.4,0,0.2,1)' : 'none'
      trackRef.current.style.transform = `translateX(-${idx * 20}%)`
    }
  }, [])

  useEffect(() => { goTo(0, false) }, [])

  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; startY.current = e.touches[0].clientY; dragging.current = true; delta.current = 0 }
  const onTouchMove = (e) => {
    if (!dragging.current) return
    const dx = e.touches[0].clientX - startX.current
    const dy = e.touches[0].clientY - startY.current
    if (Math.abs(dy) > Math.abs(dx) + 10) { dragging.current = false; return }
    delta.current = dx
    const offset = page * 20 + (-dx / vpRef.current.clientWidth) * 20
    if (trackRef.current) { trackRef.current.style.transition = 'none'; trackRef.current.style.transform = `translateX(-${offset}%)` }
  }
  const onTouchEnd = () => {
    if (!dragging.current) return; dragging.current = false
    const th = vpRef.current.clientWidth * 0.2
    if (delta.current < -th) goTo(page + 1)
    else if (delta.current > th) goTo(page - 1)
    else goTo(page)
  }

  const toggleTarea = async (t) => {
    await supabase.from('tareas').update({ completada: !t.completada }).eq('id', t.id)
  }

  if (loading) return (<><style>{css}</style><div className="loading-screen"><div className="loading-logo">ADA</div><div className="loading-dots"><div className="loading-dot"/><div className="loading-dot"/><div className="loading-dot"/></div></div></>)
  if (!session) return (<><style>{css}</style><div className="login-wrap"><LoginCard /></div></>)

  const done = tareas.filter(t => t.completada).length
  const pct = tareas.length ? (done / tareas.length) * 100 : 0

  return (
    <>
      <style>{css}</style>
      <div className="app">
        <header className="topbar">
          <div className="topbar-left">
            <span className="logo">ADA</span>
            <span className="page-title">{PAGES[page]}</span>
          </div>
          <div className="topbar-right">
            <span className="user-pill">{session.user.email.split('@')[0]}</span>
            <button className="btn btn-outline btn-sm" onClick={() => supabase.auth.signOut()}>Salir</button>
          </div>
        </header>

        <div className="pages-viewport" ref={vpRef} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
          <div className="pages-track" ref={trackRef}>

            {/* DASHBOARD */}
            <div className="page"><div className="content">
              <div className="section-label">métricas · en vivo</div>
              <div className="stats-grid">
                {metricas.map(m => (
                  <div key={m.id} className={`stat-card c-${m.color}`}>
                    <div className="stat-lbl">{m.titulo}</div>
                    <div className="stat-val">{m.valor}</div>
                    <div className="stat-sub">{m.subtitulo}</div>
                    {m.badges && <div className="badges">{m.badges.map(b => <span key={b} className="badge">{b}</span>)}</div>}
                  </div>
                ))}
              </div>
              <div className="section-label">próximos eventos</div>
              <div className="card">
                <div className="card-header"><span className="card-title">Hitos planificados</span><span className="card-yr">2026</span></div>
                <div className="card-sub">Lanzamientos y actividades</div>
                <div className="ev-list">
                  {eventos.slice(0,5).map(ev => (
                    <div key={ev.id} className="ev-item">
                      <div className={`ev-bar eb-${ev.color}`}/>
                      <div><div className="ev-name">{ev.nombre}</div>{ev.detalle&&<div className="ev-detail">{ev.detalle}</div>}</div>
                      <div className="ev-date">{fmt(ev.fecha)}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="section-label">tareas</div>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:10}}>
                  <span style={{fontFamily:'var(--fd)',fontSize:15,fontWeight:700}}>Pendientes</span>
                  <span style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)'}}>{done}/{tareas.length} listas</span>
                </div>
                <div className="progress-wrap"><div className="progress-fill" style={{width:`${pct}%`}}/></div>
                <div className="task-list">
                  {tareas.filter(t=>!t.completada).slice(0,4).map(t => (
                    <div key={t.id} className="task-item" onClick={()=>toggleTarea(t)}>
                      <div className="task-check"/>
                      <div className="task-text">{t.texto}</div>
                      <span className={`task-tag t-${t.prioridad==='urgente'?'rust':'mustard'}`}>{t.prioridad}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div></div>

            {/* MÚSICA */}
            <div className="page"><div className="content">
              <div className="ep-banner">
                <div className="ep-title">Coincidir</div>
                <div className="ep-sub">EP · Lanzamiento completo · 28 abr. 2026</div>
                <div style={{fontFamily:'var(--fm)',fontSize:9,letterSpacing:2,textTransform:'uppercase',color:'rgba(255,255,255,0.35)',marginBottom:6}}>Producción</div>
                <div className="ep-bar-wrap"><div className="ep-bar-fill"/></div>
              </div>
              <div className="section-label">canciones</div>
              <div className="track-list">
                {[{n:1,name:'Coincidencia',meta:'Single principal · 2 abr.',stat:'#1 Viral',sub:'🇨🇱 Chile',hl:true},
                  {n:2,name:'Lluvia de Mayo',meta:'Single · 17 abr. 2026',stat:'Próximo',sub:'estreno',hl:false},
                  {n:3,name:'Boomerang',meta:'Ya disponible',stat:'#1 Viral',sub:'UY · BO · AR',hl:false},
                  {n:4,name:'Puñaladas',meta:'Ya disponible',stat:'Top 10',sub:'Billboard AR',hl:false},
                  {n:5,name:'Track 5',meta:'Próximamente',stat:'—',sub:'pendiente',hl:false}
                ].map(t => (
                  <div key={t.n} className={`track-item${t.hl?' hl':''}`}>
                    <div className="track-num">{t.n}</div>
                    <div><div className="track-name">{t.name}</div><div className="track-meta">{t.meta}</div></div>
                    <div className="track-stat">{t.stat}<span>{t.sub}</span></div>
                  </div>
                ))}
              </div>
            </div></div>

            {/* CALENDARIO */}
            <div className="page"><div className="content">
              <div className="section-label">abril 2026</div>
              <div className="card"><CalendarGrid eventos={eventos}/></div>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:12}}>
                <div className="section-label" style={{flex:1,marginBottom:0}}>eventos del mes</div>
                <button className="btn btn-primary btn-sm" style={{marginLeft:12}} onClick={()=>setModal('evento')}>+ Agregar</button>
              </div>
              {eventos.map(ev => (
                <div key={ev.id} className="upcoming-item">
                  <div className="udb">
                    <div className="udb-day">{new Date(ev.fecha+'T00:00:00').getDate()}</div>
                    <div className="udb-mon">{new Date(ev.fecha+'T00:00:00').toLocaleString('es',{month:'short'})}</div>
                  </div>
                  <div><div className="upcoming-name">{ev.nombre}</div>{ev.detalle&&<div className="upcoming-detail">{ev.detalle}</div>}</div>
                </div>
              ))}
            </div></div>

            {/* TAREAS */}
            <div className="page"><div className="content">
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:14}}>
                <div className="section-label" style={{flex:1,marginBottom:0}}>todas las tareas</div>
                <button className="btn btn-primary btn-sm" style={{marginLeft:12}} onClick={()=>setModal('tarea')}>+ Nueva</button>
              </div>
              <div className="card">
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:12}}>
                  <span style={{fontFamily:'var(--fd)',fontSize:17,fontWeight:700}}>Tareas</span>
                  <span style={{fontFamily:'var(--fm)',fontSize:10,color:'var(--muted)'}}>{done}/{tareas.length} completadas</span>
                </div>
                <div className="progress-wrap"><div className="progress-fill" style={{width:`${pct}%`}}/></div>
                {['urgente','pendiente','listo'].map(grupo => {
                  const items = tareas.filter(t=>t.prioridad===grupo)
                  if (!items.length) return null
                  return (<div key={grupo}>
                    <div className="task-group-lbl">{grupo}</div>
                    <div className="task-list">
                      {items.map(t => (
                        <div key={t.id} className={`task-item${t.completada?' done':''}`} onClick={()=>toggleTarea(t)}>
                          <div className="task-check">{t.completada?'✓':''}</div>
                          <div className="task-text">{t.texto}</div>
                          <span className={`task-tag t-${t.prioridad==='urgente'?'rust':t.prioridad==='listo'?'olive':'mustard'}`}>{t.prioridad}</span>
                        </div>
                      ))}
                    </div>
                  </div>)
                })}
              </div>
            </div></div>

            {/* IA */}
            <div className="page"><AIPage eventos={eventos} tareas={tareas} metricas={metricas}/></div>

          </div>
        </div>

        <nav className="bottom-nav">
          {NAV.map((n,i) => (
            <div key={i} className={`nav-item${page===i?' active':''}`} onClick={()=>goTo(i)}>
              <div className="nav-icon">{n.icon}</div>
              <div className="nav-label">{n.label}</div>
            </div>
          ))}
        </nav>
      </div>

      <div className="page-dots">
        {PAGES.map((_,i) => <div key={i} className={`dot${page===i?' active':''}`}/>)}
      </div>

      {modal==='evento' && <EventoModal onClose={()=>setModal(null)}/>}
      {modal==='tarea' && <TareaModal onClose={()=>setModal(null)}/>}
    </>
  )
}

function LoginCard() {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setErr(''); setLoading(true)
    const { error } = isLogin
      ? await supabase.auth.signInWithPassword({ email, password: pass })
      : await supabase.auth.signUp({ email, password: pass })
    setLoading(false)
    if (error) setErr(error.message)
  }

  return (
    <div className="login-card">
      <div className="login-logo">ADA</div>
      <div className="login-sub">Sistema de gestión artística</div>
      <input className="input" type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/>
      <input className="input" type="password" placeholder="Contraseña" value={pass} onChange={e=>setPass(e.target.value)} onKeyDown={e=>e.key==='Enter'&&submit()}/>
      {err && <div className="login-err">{err}</div>}
      <button className="btn btn-rust" style={{width:'100%'}} onClick={submit} disabled={loading}>
        {loading?'Cargando...':isLogin?'Ingresar':'Crear cuenta'}
      </button>
      <div className="login-toggle" onClick={()=>setIsLogin(!isLogin)}>
        {isLogin?<>¿No tenés cuenta? <span>Registrate</span></>:<>¿Ya tenés cuenta? <span>Ingresá</span></>}
      </div>
    </div>
  )
}

function CalendarGrid({ eventos }) {
  const days = ['Lu','Ma','Mi','Ju','Vi','Sa','Do']
  const eventDays = new Set(eventos.map(e=>new Date(e.fecha+'T00:00:00').getDate()))
  const today = 25
  const startOffset = 2
  const totalDays = 30
  const cells = []
  for (let i=0;i<startOffset;i++) cells.push(null)
  for (let d=1;d<=totalDays;d++) cells.push(d)
  return (
    <div className="cal-grid">
      {days.map(d=><div key={d} className="cal-day-name">{d}</div>)}
      {cells.map((d,i)=>(
        <div key={i} className={`cal-day${!d?' empty':''}${d===today?' today':''}${d&&eventDays.has(d)?' has-event':''}`}>
          {d||''}
        </div>
      ))}
    </div>
  )
}

function EventoModal({ onClose }) {
  const [nombre,setNombre]=useState('')
  const [detalle,setDetalle]=useState('')
  const [fecha,setFecha]=useState('')
  const [color,setColor]=useState('mustard')
  const [loading,setLoading]=useState(false)
  const save = async () => {
    if (!nombre||!fecha) return
    setLoading(true)
    await supabase.from('eventos').insert({nombre,detalle,fecha,color})
    setLoading(false); onClose()
  }
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-title">Nuevo Evento</div>
        <div className="form-group"><label className="form-label">Nombre</label><input className="input" value={nombre} onChange={e=>setNombre(e.target.value)} placeholder='Ej: Lanzamiento "Canción"'/></div>
        <div className="form-group"><label className="form-label">Detalle (opcional)</label><input className="input" value={detalle} onChange={e=>setDetalle(e.target.value)} placeholder="Artistas, venue, etc."/></div>
        <div className="form-group"><label className="form-label">Fecha</label><input className="input" type="date" value={fecha} onChange={e=>setFecha(e.target.value)}/></div>
        <div className="form-group"><label className="form-label">Color</label>
          <select className="select" value={color} onChange={e=>setColor(e.target.value)}>
            <option value="mustard">Mostaza</option><option value="rust">Óxido</option>
            <option value="olive">Oliva</option><option value="terra">Terracota</option><option value="sage">Salvia</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" style={{flex:1,color:'var(--muted)',border:'1.5px solid var(--border)'}} onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" style={{flex:2}} onClick={save} disabled={loading}>{loading?'Guardando...':'Guardar evento'}</button>
        </div>
      </div>
    </div>
  )
}

function TareaModal({ onClose }) {
  const [texto,setTexto]=useState('')
  const [prioridad,setPrioridad]=useState('pendiente')
  const [loading,setLoading]=useState(false)
  const save = async () => {
    if (!texto) return
    setLoading(true)
    await supabase.from('tareas').insert({texto,prioridad,completada:false})
    setLoading(false); onClose()
  }
  return (
    <div className="modal-overlay" onClick={e=>e.target===e.currentTarget&&onClose()}>
      <div className="modal">
        <div className="modal-title">Nueva Tarea</div>
        <div className="form-group"><label className="form-label">Tarea</label><input className="input" value={texto} onChange={e=>setTexto(e.target.value)} placeholder="Describí la tarea..." onKeyDown={e=>e.key==='Enter'&&save()}/></div>
        <div className="form-group"><label className="form-label">Prioridad</label>
          <select className="select" value={prioridad} onChange={e=>setPrioridad(e.target.value)}>
            <option value="urgente">🔴 Urgente</option><option value="pendiente">🟡 Pendiente</option><option value="listo">🟢 Listo</option>
          </select>
        </div>
        <div className="modal-actions">
          <button className="btn btn-outline" style={{flex:1,color:'var(--muted)',border:'1.5px solid var(--border)'}} onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" style={{flex:2}} onClick={save} disabled={loading}>{loading?'Guardando...':'Guardar tarea'}</button>
        </div>
      </div>
    </div>
  )
}

function AIPage({ eventos, tareas, metricas }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'})},[messages])

  const context = `Sos el asistente de ADA, una artista musical. Respondé siempre en español, de forma concisa y útil.
MÉTRICAS: ${metricas.map(m=>`${m.titulo}: ${m.valor}`).join(' | ')}
EVENTOS: ${eventos.map(e=>`${e.nombre} (${e.fecha})`).join(' | ')}
TAREAS PENDIENTES: ${tareas.filter(t=>!t.completada).map(t=>t.texto).join(' | ')}`

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    const newMsgs = [...messages, {role:'user',content:msg}]
    setMessages(newMsgs)
    setLoading(true)
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:'POST',
        headers:{'Content-Type':'application/json','x-api-key':'','anthropic-version':'2023-06-01'},
        body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:800,system:context,messages:newMsgs})
      })
      const data = await res.json()
      const reply = data.content?.map(c=>c.text).join('')||'Necesitás configurar una API key de Anthropic para usar esta función. Consultá las instrucciones.'
      setMessages([...newMsgs,{role:'assistant',content:reply}])
    } catch {
      setMessages([...newMsgs,{role:'assistant',content:'Para activar el asistente IA, necesitás agregar una API key de Anthropic en la configuración de Vercel.'}])
    }
    setLoading(false)
  }

  const chips = ['¿Cómo va la carrera de ADA?','¿Qué tareas son urgentes?','Estrategia para el EP','¿Qué evento es el más importante?']

  return (
    <div className="chat-wrap">
      <div className="chat-messages">
        {messages.length===0 && (
          <div className="ai-intro">
            <div className="ai-intro-icon">✦</div>
            <div className="ai-intro-title">Asistente ADA</div>
            <div className="ai-intro-sub">Tengo acceso a todas las métricas, eventos y tareas en tiempo real.</div>
            <div className="ai-chips">{chips.map(c=><div key={c} className="ai-chip" onClick={()=>send(c)}>{c}</div>)}</div>
          </div>
        )}
        {messages.map((m,i)=>(
          <div key={i} className={`msg ${m.role==='user'?'user':'ai'}`}>
            {m.role==='assistant'&&<div className="msg-label">✦ ADA AI</div>}
            {m.content}
          </div>
        ))}
        {loading&&<div className="msg ai"><div className="msg-label">✦ ADA AI</div>Pensando...</div>}
        <div ref={bottomRef}/>
      </div>
      <div className="chat-input-wrap">
        <textarea className="chat-input" placeholder="Preguntale algo a ADA AI..." value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} rows={1}/>
        <button className="chat-send" onClick={()=>send()} disabled={loading||!input.trim()}>↑</button>
      </div>
    </div>
  )
}
