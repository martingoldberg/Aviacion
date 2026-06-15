import React, { useState, useEffect } from 'react';
import { getModels, getAircraftsByModel } from '../data/fleetData';
import { usePlanning } from '../context/PlanningContext';
import { AlertTriangle, ChevronDown } from 'lucide-react';

const AircraftSelector = ({ onTriggerChangeModal }) => {
  const { selectedAircraft, isPlanningActive, selectAircraftDirectly } = usePlanning();
  const models = getModels();
  
  const [selectedModelLocal, setSelectedModelLocal] = useState('');
  
  // Sincronizar el modelo local si ya hay una aeronave seleccionada
  useEffect(() => {
    if (selectedAircraft) {
      setSelectedModelLocal(selectedAircraft.model);
    }
  }, [selectedAircraft]);

  const handleModelChange = (e) => {
    setSelectedModelLocal(e.target.value);
  };

  const handleRegistrationChange = (e) => {
    const newReg = e.target.value;
    if (!newReg) return;
    
    if (isPlanningActive && selectedAircraft && selectedAircraft.registration !== newReg) {
      onTriggerChangeModal(newReg);
    } else {
      selectAircraftDirectly(newReg);
    }
  };

  const availableAircrafts = selectedModelLocal ? getAircraftsByModel(selectedModelLocal) : [];

  const getStatusColor = (status) => {
    switch (status) {
      case 'NO OPERATIVA': return 'var(--danger)';
      case 'OP. SOLO P&B': return 'var(--warning)';
      case 'CONF. EN REV.': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <div className="aircraft-selector-container">
      <div className="selector-group">
        <label className="selector-label">Modelo</label>
        <div className="select-wrapper">
          <select value={selectedModelLocal} onChange={handleModelChange} className="aircraft-select">
            <option value="">Seleccionar Modelo</option>
            {models.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <ChevronDown size={14} className="select-icon" />
        </div>
      </div>

      <div className="selector-group">
        <label className="selector-label">Matrícula</label>
        <div className="select-wrapper">
          <select 
            value={selectedAircraft?.registration || ''} 
            onChange={handleRegistrationChange} 
            className="aircraft-select"
            disabled={!selectedModelLocal}
          >
            <option value="">Seleccionar Matrícula</option>
            {availableAircrafts.map(a => (
              <option key={a.registration} value={a.registration}>
                {a.registration}
              </option>
            ))}
          </select>
          <ChevronDown size={14} className="select-icon" />
        </div>
      </div>

      {selectedAircraft && (
        <div className="selected-status-badge" style={{ backgroundColor: getStatusColor(selectedAircraft.status) + '20', color: getStatusColor(selectedAircraft.status), border: `1px solid ${getStatusColor(selectedAircraft.status)}40` }}>
          {selectedAircraft.status === 'NO OPERATIVA' && <AlertTriangle size={14} />}
          <span>{selectedAircraft.status}</span>
        </div>
      )}
    </div>
  );
};

export default AircraftSelector;
