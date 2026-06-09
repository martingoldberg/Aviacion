import React from 'react';
import { 
  Plane, Home, Calendar, CloudRain, BookOpen, Settings, 
  Search, Bell, MessageSquare, ChevronRight, Wind, Droplets, MapPin, 
  Clock, CheckCircle, Clock3
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import './index.css';

const flightData = [
  { month: 'Ene', hours: 4 },
  { month: 'Feb', hours: 7 },
  { month: 'Mar', hours: 12 },
  { month: 'Abr', hours: 18 },
  { month: 'May', hours: 25 },
  { month: 'Jun', hours: 32 },
];

function App() {
  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <Plane className="brand-icon" size={32} />
          <span>AeroStudent</span>
        </div>
        
        <nav className="nav-menu">
          <a className="nav-item active">
            <Home size={20} />
            <span>Dashboard</span>
          </a>
          <a className="nav-item">
            <Plane size={20} />
            <span>Mis Vuelos</span>
          </a>
          <a className="nav-item">
            <Calendar size={20} />
            <span>Programación</span>
          </a>
          <a className="nav-item">
            <BookOpen size={20} />
            <span>Material de Estudio</span>
          </a>
          <a className="nav-item">
            <CloudRain size={20} />
            <span>Meteorología</span>
          </a>
          <div style={{ flex: 1 }}></div>
          <a className="nav-item">
            <Settings size={20} />
            <span>Configuración</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-search">
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Buscar vuelos, instructores, METAR..." />
          </div>
          
          <div className="header-profile">
            <button className="icon-button">
              <MessageSquare size={22} />
            </button>
            <button className="icon-button">
              <Bell size={22} />
              <span className="badge"></span>
            </button>
            <div style={{ width: '1px', height: '24px', background: 'var(--panel-border)', margin: '0 10px' }}></div>
            <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&w=100&q=80" alt="Profile" className="avatar" />
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <div className="welcome-section">
            <h1>Bienvenido, Capitán Martín</h1>
            <p>Aquí está tu progreso hacia la licencia de Piloto Privado (PPL).</p>
          </div>

          {/* Stats Cards */}
          <div className="card stats-card">
            <div className="card-title">
              <Clock3 size={20} />
              Horas Totales
            </div>
            <div className="stats-value">32.5 <span style={{fontSize: '1.2rem', color: 'var(--text-muted)'}}>/ 40</span></div>
            <div className="stats-label">7.5 horas restantes para el checkride</div>
            <div style={{ marginTop: '16px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '81%', height: '100%', background: 'var(--sky-blue)', borderRadius: '4px' }}></div>
            </div>
          </div>

          <div className="card stats-card">
            <div className="card-title">
              <Plane size={20} />
              Aterrizajes
            </div>
            <div className="stats-value">45</div>
            <div className="stats-label">12 aterrizajes nocturnos completados</div>
            <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontSize: '0.9rem', fontWeight: 500 }}>
              <CheckCircle size={16} />
              Requisito nocturno cumplido
            </div>
          </div>

          <div className="card stats-card">
            <div className="card-title">
              <BookOpen size={20} />
              Progreso Teórico
            </div>
            <div className="stats-value">85%</div>
            <div className="stats-label">Módulo actual: Navegación IFR</div>
            <div style={{ marginTop: '16px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '85%', height: '100%', background: 'var(--sky-blue)', borderRadius: '4px' }}></div>
            </div>
          </div>

          {/* Chart Card */}
          <div className="card chart-card">
            <div className="card-header">
              <div className="card-title">
                <Clock size={20} />
                Progresión de Horas de Vuelo
              </div>
              <button className="icon-button" style={{ fontSize: '0.9rem', color: 'var(--sky-blue)' }}>Ver detalles</button>
            </div>
            <div style={{ height: '300px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={flightData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--sky-blue)" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="var(--sky-blue)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                  <XAxis dataKey="month" stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis stroke="var(--text-muted)" tick={{ fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--bg-navy-light)', border: '1px solid var(--panel-border)', borderRadius: '8px', color: '#fff' }}
                    itemStyle={{ color: 'var(--sky-blue)' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="var(--sky-blue)" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weather Card */}
          <div className="card weather-card">
            <div className="card-header">
              <div className="card-title">
                <CloudRain size={20} />
                Meteorología Base (SPJC)
              </div>
            </div>
            
            <div className="weather-main">
              <CloudRain size={48} color="var(--sky-blue)" />
              <div>
                <div className="weather-temp">18°C</div>
                <div className="weather-desc">Lluvia ligera, bruma</div>
              </div>
            </div>

            <div className="weather-details">
              <div className="weather-row">
                <span className="weather-label"><Wind size={16}/> Viento</span>
                <span className="weather-val">190° @ 8 kt</span>
              </div>
              <div className="weather-row">
                <span className="weather-label"><Droplets size={16}/> Visibilidad</span>
                <span className="weather-val">6 km</span>
              </div>
              <div className="weather-row">
                <span className="weather-label"><CloudRain size={16}/> Techo</span>
                <span className="weather-val">OVC 015</span>
              </div>
              <div className="weather-row">
                <span className="weather-label"><MapPin size={16}/> QNH</span>
                <span className="weather-val">1012 hPa</span>
              </div>
            </div>

            <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px', fontSize: '0.85rem', lineHeight: '1.4', fontFamily: 'monospace', color: 'var(--sky-blue)' }}>
              METAR SPJC 081200Z 19008KT 6000 -RA BR OVC015 18/16 Q1012 NOSIG
            </div>
          </div>

          {/* Schedule Card */}
          <div className="card schedule-card">
            <div className="card-header">
              <div className="card-title">
                <Calendar size={20} />
                Próximas Sesiones
              </div>
              <button className="btn-primary">
                Programar Vuelo <ChevronRight size={16} />
              </button>
            </div>

            <div className="schedule-list">
              <div className="schedule-item">
                <div className="schedule-info">
                  <div className="schedule-date">
                    <div className="day">10</div>
                    <div className="month">Jun</div>
                  </div>
                  <div className="schedule-details">
                    <h4>Maniobras Básicas - Cessna 172</h4>
                    <p><Clock size={14} /> 08:00 - 10:00 • <MapPin size={14} /> Base SPJC • Inst. Pérez</p>
                  </div>
                </div>
                <div className="schedule-status status-confirmed">Confirmado</div>
              </div>

              <div className="schedule-item">
                <div className="schedule-info">
                  <div className="schedule-date">
                    <div className="day">12</div>
                    <div className="month">Jun</div>
                  </div>
                  <div className="schedule-details">
                    <h4>Simulador - Procedimientos de Emergencia</h4>
                    <p><Clock size={14} /> 14:00 - 15:30 • <MapPin size={14} /> Centro de Simulación</p>
                  </div>
                </div>
                <div className="schedule-status status-confirmed">Confirmado</div>
              </div>

              <div className="schedule-item">
                <div className="schedule-info">
                  <div className="schedule-date">
                    <div className="day">15</div>
                    <div className="month">Jun</div>
                  </div>
                  <div className="schedule-details">
                    <h4>Vuelo Solo - Patrón de Tráfico</h4>
                    <p><Clock size={14} /> 09:00 - 10:00 • <MapPin size={14} /> Base SPJC</p>
                  </div>
                </div>
                <div className="schedule-status status-pending">Pendiente Clima</div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
