import React from 'react';
import { 
  Plane, Home, Calendar, CloudRain, BookOpen, Settings, 
  Search, Bell, MessageSquare, ChevronRight, Wind, Droplets, MapPin, 
  Clock, CheckCircle, Clock3
} from 'lucide-react';
import './index.css';
import { usePlanning } from './context/PlanningContext';
import AircraftSelector from './components/AircraftSelector';
import AircraftStatusBoard from './components/AircraftStatusBoard';
import ChangeAircraftModal from './components/ChangeAircraftModal';
import AircraftComparison from './components/AircraftComparison';
import PlanningWizard from './components/PlanningWizard';

function App() {
  const { isPlanningActive, setIsPlanningActive, selectedAircraft, comparisonAircraft } = usePlanning();
  const [modalPendingRegistration, setModalPendingRegistration] = React.useState(null);

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
            <span>Dashboard Planificación</span>
          </a>
          <a className="nav-item">
            <Plane size={20} />
            <span>Aeronaves y Flota</span>
          </a>
          <a className="nav-item">
            <Calendar size={20} />
            <span>Historial de Vuelos</span>
          </a>
          <a className="nav-item">
            <BookOpen size={20} />
            <span>Centro Documental</span>
          </a>
          <a className="nav-item">
            <CloudRain size={20} />
            <span>Meteorología / NOTAM</span>
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
          <AircraftSelector onTriggerChangeModal={setModalPendingRegistration} />
          
          <div className="header-search" style={{ flex: 1, marginLeft: '20px' }}>
            <Search size={18} color="#94a3b8" />
            <input type="text" placeholder="Buscar matrículas, aeródromos, METAR..." />
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

        {isPlanningActive ? (
          <PlanningWizard />
        ) : (
          <div className="dashboard-grid">
            <div className="welcome-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1>Planificador de Vuelo</h1>
                <p>Seleccione una aeronave y prepare su vuelo de forma guiada o técnica.</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <label style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Estado de Planificación actual
                </label>
                <div className={`status-badge ${isPlanningActive ? 'status-confirmed' : 'status-pending'}`}>
                  {isPlanningActive ? 'EN PROGRESO' : 'INACTIVA'}
                </div>
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <AircraftStatusBoard />
            </div>

            {/* Tarjeta Principal Gigante */}
            <div className="card" style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.1) 0%, rgba(14, 165, 233, 0.02) 100%)', border: '1px solid rgba(14, 165, 233, 0.3)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <Plane size={64} color="var(--sky-blue)" style={{ opacity: 0.8 }} />
              <div>
                <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>Nueva Planificación de Vuelo</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
                  Inicie una nueva planificación de vuelo seleccionando su aeronave. El sistema guiará el cálculo de peso, combustible, ruta y performance usando manuales verificados.
                </p>
              </div>
              
              <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <button 
                  className="btn-primary" 
                  style={{ padding: '15px 30px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '12px' }}
                  onClick={() => setIsPlanningActive(true)}
                >
                  <BookOpen size={24} />
                  Modo Guiado (Alumnos)
                </button>
                
                <button 
                  className="btn-secondary" 
                  style={{ padding: '15px 30px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', borderRadius: '12px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  onClick={() => setIsPlanningActive(true)}
                >
                  <Settings size={24} />
                  Modo Técnico (Pilotos/Inst.)
                </button>
              </div>
            </div>

            {/* Tarjetas Secundarias */}
            <div className="card action-card">
              <div className="card-title">
                <Clock size={20} color="var(--sky-blue)" />
                Continuar Planificación
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.9rem' }}>
                Tienes 1 borrador guardado automáticamente hace 2 horas.
              </p>
              <button className="btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
                Retomar Borrador
              </button>
            </div>

            <div className="card action-card">
              <div className="card-title">
                <Calendar size={20} color="var(--sky-blue)" />
                Historial de Vuelos
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.9rem' }}>
                Revisa tus planificaciones anteriores y carpetas de vuelo generadas.
              </p>
              <button className="btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
                Ver Historial
              </button>
            </div>

            <div className="card action-card">
              <div className="card-title">
                <BookOpen size={20} color="var(--sky-blue)" />
                Centro Documental
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: '10px', fontSize: '0.9rem' }}>
                Accede a los manuales, suplementos y certificados de peso de la flota.
              </p>
              <button className="btn-secondary" style={{ marginTop: '20px', width: '100%' }}>
                Abrir Documentos
              </button>
            </div>

            {/* Conservamos Weather Card temporalmente como referencia visual de API externa */}
            <div className="card weather-card" style={{ gridColumn: '1 / -1' }}>
              <div className="card-header">
                <div className="card-title">
                  <CloudRain size={20} />
                  Meteorología Base (SPJC) - Pre-Vuelo
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
                <div className="weather-row"><span className="weather-label"><Wind size={16}/> Viento</span><span className="weather-val">190° @ 8 kt</span></div>
                <div className="weather-row"><span className="weather-label"><Droplets size={16}/> Visibilidad</span><span className="weather-val">6 km</span></div>
                <div className="weather-row"><span className="weather-label"><CloudRain size={16}/> Techo</span><span className="weather-val">OVC 015</span></div>
                <div className="weather-row"><span className="weather-label"><MapPin size={16}/> QNH</span><span className="weather-val">1012 hPa</span></div>
              </div>
              <div style={{ marginTop: '20px', padding: '12px', background: 'rgba(56, 189, 248, 0.1)', border: '1px solid rgba(56, 189, 248, 0.2)', borderRadius: '8px', fontSize: '0.85rem', lineHeight: '1.4', fontFamily: 'monospace', color: 'var(--sky-blue)' }}>
                METAR SPJC 081200Z 19008KT 6000 -RA BR OVC015 18/16 Q1012 NOSIG
              </div>
            </div>
          </div>
        )}
      </main>

      {modalPendingRegistration && (
        <ChangeAircraftModal 
          newRegistration={modalPendingRegistration} 
          onClose={() => setModalPendingRegistration(null)} 
        />
      )}

      {comparisonAircraft && <AircraftComparison />}
    </div>
  );
}

export default App;
