import React from 'react';
import { ShieldAlert, X } from 'lucide-react';
import { usePlanning } from '../context/PlanningContext';
import AircraftStatusBoard from './AircraftStatusBoard'; // Reusing the board to render individual cards inside comparison

const AircraftComparison = () => {
  const { comparisonAircraft, selectedAircraft, setComparisonAircraft } = usePlanning();

  if (!comparisonAircraft || !selectedAircraft) return null;

  return (
    <div className="comparison-overlay">
      <div className="comparison-container">
        <div className="comparison-header">
          <h2>Comparación de Aeronaves</h2>
          <button className="icon-button" onClick={() => setComparisonAircraft(null)}>
            <X size={24} />
          </button>
        </div>

        <div className="comparison-warning">
          <ShieldAlert size={20} color="var(--warning)" />
          <span>COMPARACIÓN NUMÉRICA NO DISPONIBLE — FALTAN DATOS TÉCNICOS VERIFICADOS</span>
        </div>

        <div className="comparison-grid">
          {/* We create a wrapper that provides the context value specific to each aircraft just for rendering the board, 
              or we could just pass the aircraft as a prop to a stateless version of the board. 
              Since AircraftStatusBoard uses the context directly, let's just render the data directly here for comparison. */}
          
          {[comparisonAircraft, selectedAircraft].map((aircraft, idx) => (
            <div key={idx} className="comparison-column">
              <div className={`status-badge ${aircraft.status === 'NO OPERATIVA' ? 'badge-danger' : 'badge-warning'}`} style={{ alignSelf: 'flex-start', marginBottom: '16px' }}>
                {aircraft.status}
              </div>
              <h3>{aircraft.registration} <span style={{fontSize: '0.9rem', color: 'var(--text-muted)'}}>({aircraft.model})</span></h3>
              
              <div className="comparison-section">
                <h4>Funciones Bloqueadas</h4>
                <p className="text-danger">{aircraft.blockedFunctions}</p>
              </div>

              <div className="comparison-section">
                <h4>Datos Faltantes</h4>
                <p>{aircraft.missingData}</p>
              </div>

              <div className="comparison-section">
                <h4>Acción Requerida</h4>
                <p>{aircraft.requiredAction}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AircraftComparison;
