import React, { useState } from 'react';
import { usePlanning } from '../context/PlanningContext';
import { modelsData } from '../data/modelsData';
import { getAircraftsByModel } from '../data/fleetData';

export default function FleetGridSelector() {
  const { selectedAircraft, selectAircraftDirectly } = usePlanning();
  const [customRegistration, setCustomRegistration] = useState('');

  return (
    <div className="fleet-selector-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="fleet-header" style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '500', color: '#fff', marginBottom: '8px' }}>Selecciona tu Avión</h1>
        <p style={{ color: '#94a3b8', fontSize: '1.05rem' }}>
          Elige el tipo y matrícula. Esto se usará en toda la app (planificación, bitácora, performance).
        </p>
      </div>

      <div className="custom-reg-box" style={{ 
        backgroundColor: '#0f172a', border: '1px solid #1e293b', 
        borderRadius: '12px', padding: '20px', marginBottom: '30px',
        display: 'flex', alignItems: 'center', gap: '20px'
      }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
            Matrícula Personalizada
          </label>
          <input 
            type="text" 
            placeholder="CC-XXX" 
            value={customRegistration}
            onChange={(e) => setCustomRegistration(e.target.value.toUpperCase())}
            style={{ 
              width: '100%', backgroundColor: '#020617', border: '1px solid #d97706', 
              color: '#fcd34d', padding: '12px 16px', borderRadius: '8px', 
              fontSize: '1.1rem', outline: 'none'
            }} 
          />
        </div>
        <div style={{ color: '#64748b', fontSize: '0.9rem', paddingTop: '20px' }}>
          Se aplica al modelo que selecciones abajo
        </div>
      </div>

      <div className="fleet-grid" style={{ 
        display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '20px' 
      }}>
        {modelsData.map(model => {
          const availableAircrafts = getAircraftsByModel(model.id);
          const isSelectedModel = selectedAircraft?.model === model.id;

          return (
            <div 
              key={model.id} 
              className={`fleet-card ${isSelectedModel ? 'selected' : ''}`}
              style={{
                backgroundColor: '#0f172a',
                border: isSelectedModel ? '1px solid #38bdf8' : '1px solid #1e293b',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <h3 style={{ fontSize: '1.25rem', color: '#f8fafc', margin: 0, fontWeight: 500 }}>{model.name}</h3>
                <span style={{ color: '#0ea5e9', fontSize: '0.85rem', fontWeight: 600 }}>{model.class}</span>
              </div>
              
              <div style={{ marginBottom: '24px' }}>
                <select 
                  value={isSelectedModel ? selectedAircraft.registration : ''}
                  onChange={(e) => {
                    const reg = e.target.value;
                    if (reg) {
                      selectAircraftDirectly(reg);
                    }
                  }}
                  style={{ 
                    backgroundColor: 'transparent', border: 'none', color: '#d97706', 
                    fontSize: '1rem', fontWeight: 500, padding: 0, outline: 'none',
                    cursor: 'pointer', appearance: 'none'
                  }}
                >
                  <option value="" disabled style={{color: '#94a3b8'}}>Seleccionar Matrícula...</option>
                  {availableAircrafts.map(a => (
                    <option key={a.registration} value={a.registration} style={{backgroundColor: '#0f172a', color: '#d97706'}}>
                      {a.registration}
                    </option>
                  ))}
                  {customRegistration && (
                    <option value={customRegistration} style={{backgroundColor: '#0f172a', color: '#d97706'}}>
                      {customRegistration} (Personalizada)
                    </option>
                  )}
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '12px', marginBottom: '24px' }}>
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>MTOW</div>
                <div style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 500 }}>{model.specs.mtow}</div>
                
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Combustible</div>
                <div style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 500 }}>{model.specs.fuel}</div>
                
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Crucero</div>
                <div style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 500 }}>{model.specs.cruise}</div>
                
                <div style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Consumo</div>
                <div style={{ color: '#f8fafc', fontSize: '0.9rem', fontWeight: 500 }}>{model.specs.consumption}</div>
              </div>

              <div style={{ color: '#64748b', fontSize: '0.85rem', fontStyle: 'italic' }}>
                {model.footer}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
