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
import FleetGridSelector from './components/FleetGridSelector';

function App() {
  const { isPlanningActive, setIsPlanningActive, selectedAircraft, comparisonAircraft } = usePlanning();
  const [modalPendingRegistration, setModalPendingRegistration] = React.useState(null);

  return isPlanningActive ? (
    <PlanningWizard />
  ) : (
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
          <div style={{ fontSize: '1.1rem', fontWeight: 500, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Plane size={20} color="var(--sky-blue)" />
            {selectedAircraft ? `${selectedAircraft.model} - ${selectedAircraft.registration}` : 'Ninguna aeronave seleccionada'}
          </div>
          
          <div className="header-search" style={{ flex: 1, marginLeft: '40px' }}>
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

        {/* Dashboard Grid */}
        <div className="dashboard-grid">
          <div className="welcome-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1>Planificador de Vuelo</h1>
              <p>Seleccione una aeronave y prepare su vuelo de forma guiada o técnica.</p>
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
                Iniciar Planificación
              </button>
            </div>
          </div>

          {/* Tarjetas Secundarias (Deshabilitadas en V1.0.0 según plan) */}
          <div className="card action-card">
            <div className="card-title">
              <Clock size={20} color="#64748b" />
              <span style={{color: '#64748b'}}>Continuar Planificación</span>
            </div>
            <p style={{ color: '#475569', marginTop: '10px', fontSize: '0.9rem' }}>
              Función no disponible en V1.0.0
            </p>
            <button className="btn-secondary" style={{ marginTop: '20px', width: '100%', opacity: 0.5, cursor: 'not-allowed' }} disabled>
              Bloqueado
            </button>
          </div>

          <div className="card action-card">
            <div className="card-title">
              <Calendar size={20} color="#64748b" />
              <span style={{color: '#64748b'}}>Historial de Vuelos</span>
            </div>
            <p style={{ color: '#475569', marginTop: '10px', fontSize: '0.9rem' }}>
              Función no disponible en V1.0.0
            </p>
            <button className="btn-secondary" style={{ marginTop: '20px', width: '100%', opacity: 0.5, cursor: 'not-allowed' }} disabled>
              Bloqueado
            </button>
          </div>

          <div className="card action-card">
            <div className="card-title">
              <BookOpen size={20} color="#64748b" />
              <span style={{color: '#64748b'}}>Centro Documental</span>
            </div>
            <p style={{ color: '#475569', marginTop: '10px', fontSize: '0.9rem' }}>
              Accede a los manuales y certificados desde la vista de aeronave.
            </p>
            <button className="btn-secondary" style={{ marginTop: '20px', width: '100%', opacity: 0.5, cursor: 'not-allowed' }} disabled>
              Bloqueado
            </button>
          </div>

          <div className="card weather-card" style={{ gridColumn: '1 / -1' }}>
            <div className="card-header">
              <div className="card-title" style={{color: '#64748b'}}>
                <CloudRain size={20} />
                Meteorología en vivo: Desconectado
              </div>
            </div>
            <div style={{ padding: '20px', color: '#64748b', fontStyle: 'italic', textAlign: 'center' }}>
              Refiérase a fuentes oficiales (IFIS/Dirección Meteorológica) para obtener el METAR y TAF vigentes antes de planificar.
            </div>
          </div>
        </div>
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
