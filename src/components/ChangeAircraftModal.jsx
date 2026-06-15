import React from 'react';
import { AlertCircle, Copy, RefreshCw, XCircle } from 'lucide-react';
import { getAircraftDetails } from '../data/fleetData';
import { usePlanning } from '../context/PlanningContext';

const ChangeAircraftModal = ({ newRegistration, onClose }) => {
  const { selectedAircraft, changeAircraft } = usePlanning();
  const newAircraft = getAircraftDetails(newRegistration);

  if (!newAircraft) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <AlertCircle size={24} color="var(--warning)" />
          <h2>Cambio de Aeronave Detectado</h2>
        </div>
        
        <div className="modal-body">
          <p>
            Tienes una planificación activa para el <strong>{selectedAircraft.registration}</strong>. 
            Estás intentando cambiar a <strong>{newRegistration}</strong>.
          </p>
          <p className="modal-warning-text">
            Los datos de performance, peso y balance y checklist son exclusivos para cada matrícula.
            ¿Qué deseas hacer con la planificación actual?
          </p>

          <div className="action-buttons-vertical">
            <button 
              className="btn-action btn-secondary" 
              onClick={() => { changeAircraft(newRegistration, 'cancel'); onClose(); }}
            >
              <XCircle size={18} />
              <div className="btn-text">
                <strong>Cancelar Cambio</strong>
                <span>Mantener {selectedAircraft.registration} y continuar planificación</span>
              </div>
            </button>

            <button 
              className="btn-action btn-primary" 
              onClick={() => { changeAircraft(newRegistration, 'recalculate'); onClose(); }}
            >
              <RefreshCw size={18} />
              <div className="btn-text">
                <strong>Cambiar y Recalcular</strong>
                <span>Mantiene ruta/piloto, elimina datos técnicos de {selectedAircraft.registration}</span>
              </div>
            </button>

            <button 
              className="btn-action btn-accent" 
              onClick={() => { changeAircraft(newRegistration, 'duplicate'); onClose(); }}
            >
              <Copy size={18} />
              <div className="btn-text">
                <strong>Duplicar para Comparar</strong>
                <span>Compara visualmente {selectedAircraft.registration} con {newRegistration}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAircraftModal;
