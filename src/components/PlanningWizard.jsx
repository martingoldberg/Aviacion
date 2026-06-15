import React, { useState } from 'react';
import { usePlanning } from '../context/PlanningContext';
import FleetGridSelector from './FleetGridSelector';
import WeightAndBalanceEngine from './WeightAndBalanceEngine';

export default function PlanningWizard() {
  const { isPlanningActive, setIsPlanningActive, selectedAircraft } = usePlanning();
  const [activeTab, setActiveTab] = useState('W&B');

  const tabs = [
    'Inicio', 'Planificación', 'Meteo', 'W&B', 'Pista', 'Ruta', 
    'Crucero', 'AD', 'Mapa', 'Checklist', 'Emerg.', 'Práctica', 'Bitácora', 'Conv.'
  ];

  if (!isPlanningActive) return null;

  return (
    <div className="planning-wizard" style={{ display: 'flex', flexDirection: 'column', height: '100vh', backgroundColor: '#020617' }}>
      
      {/* Top Navbar matched from screenshot */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '0 20px', backgroundColor: '#0f172a', borderBottom: '1px solid #1e293b', height: '60px' }}>
        
        {/* Aircraft Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: '250px' }}>
          <div style={{ color: '#d97706', fontSize: '1.2rem', fontWeight: 600 }}>
            {selectedAircraft ? selectedAircraft.registration : 'CC-XXX'}
          </div>
          <div style={{ color: '#94a3b8', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {selectedAircraft ? selectedAircraft.model : 'SELECCIONE AERONAVE'}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', gap: '5px' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#1e293b' : 'transparent',
                color: activeTab === tab ? '#d97706' : '#94a3b8',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '0.9rem',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 600 : 400,
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Exit Button */}
        <div>
          <button 
            onClick={() => setIsPlanningActive(false)}
            style={{ backgroundColor: 'transparent', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}
          >
            Salir
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
        {!selectedAircraft ? (
          <FleetGridSelector />
        ) : activeTab === 'W&B' ? (
          <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
            <WeightAndBalanceEngine aircraftRegistration={selectedAircraft.registration} />
          </div>
        ) : activeTab === 'Inicio' ? (
          <FleetGridSelector />
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: '#64748b', fontSize: '1.5rem' }}>
            Módulo {activeTab} en construcción.
          </div>
        )}
      </div>

    </div>
  );
}
