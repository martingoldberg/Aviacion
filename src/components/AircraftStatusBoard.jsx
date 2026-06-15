import React from 'react';
import { AlertTriangle, CheckCircle, Lock, Info, FileText } from 'lucide-react';
import { usePlanning } from '../context/PlanningContext';

const AircraftStatusBoard = () => {
  const { selectedAircraft } = usePlanning();

  if (!selectedAircraft) {
    return (
      <div className="card status-board empty-state">
        <Info size={32} color="var(--text-muted)" />
        <h3>Ninguna aeronave seleccionada</h3>
        <p>Selecciona un modelo y matrícula en el menú superior para ver su estado operativo.</p>
      </div>
    );
  }

  const { status, modules, missingData, blockedFunctions, requiredAction, requiredDocument, lastRevision } = selectedAircraft;

  const isWarning = status !== 'LISTO' && status !== 'NO OPERATIVA';
  const isDanger = status === 'NO OPERATIVA';

  const renderModuleStatus = (moduleName, moduleStatus) => {
    let icon, colorClass;
    if (moduleStatus === 'LISTO') {
      icon = <CheckCircle size={16} />;
      colorClass = 'status-green';
    } else if (moduleStatus === 'REQ. REV.') {
      icon = <AlertTriangle size={16} />;
      colorClass = 'status-yellow';
    } else {
      icon = <Lock size={16} />;
      colorClass = 'status-red';
    }

    return (
      <div className={`module-status-item ${colorClass}`}>
        {icon}
        <span>{moduleName}</span>
      </div>
    );
  };

  return (
    <div className="card status-board">
      <div className="status-board-header">
        <div>
          <h2>{selectedAircraft.registration}</h2>
          <span className="subtitle">{selectedAircraft.model}</span>
        </div>
        <div className={`status-badge ${isDanger ? 'badge-danger' : isWarning ? 'badge-warning' : 'badge-success'}`}>
          {status}
        </div>
      </div>

      <div className="dev-warning-banner">
        <Info size={14} /> DATOS TEMPORALES DE INTERFAZ — PENDIENTES DE MIGRACIÓN Y VALIDACIÓN EN BASE DE DATOS
      </div>

      {isWarning && (
        <div className="alert-box alert-warning">
          <AlertTriangle size={20} />
          <div>
            <strong>PLANIFICACIÓN PARCIAL</strong>
            <p>Esta aeronave tiene datos faltantes. Algunas funciones de cálculo están bloqueadas por seguridad.</p>
          </div>
        </div>
      )}

      {isDanger && (
        <div className="alert-box alert-danger">
          <Lock size={20} />
          <div>
            <strong>AERONAVE NO OPERATIVA</strong>
            <p>Faltan datos críticos. No utilizar para planificación bajo ninguna circunstancia.</p>
          </div>
        </div>
      )}

      <div className="status-grid">
        <div className="status-section">
          <h3>Estado de Módulos</h3>
          <div className="modules-grid">
            {renderModuleStatus('Peso y Balance', modules.weightAndBalance)}
            {renderModuleStatus('Combustible', modules.fuel)}
            {renderModuleStatus('Navegación', modules.navigation)}
            {renderModuleStatus('Perf. Despegue', modules.perfTakeoff)}
            {renderModuleStatus('Perf. Aterrizaje', modules.perfLanding)}
            {renderModuleStatus('Perf. Ascenso', modules.perfClimb)}
            {renderModuleStatus('Perf. Crucero', modules.perfCruise)}
            {renderModuleStatus('Checklist', modules.checklist)}
            {renderModuleStatus('Limitaciones', modules.limitations)}
          </div>
        </div>

        <div className="status-section">
          <h3>Datos Pendientes y Acciones</h3>
          
          <div className="action-item">
            <span className="action-label">Funciones Bloqueadas:</span>
            <span className="action-value text-danger">{blockedFunctions || 'Ninguna'}</span>
          </div>
          
          <div className="action-item">
            <span className="action-label">Datos Faltantes:</span>
            <span className="action-value">{missingData || 'Ninguno'}</span>
          </div>

          <div className="action-item">
            <span className="action-label">Documento Requerido:</span>
            <span className="action-value"><FileText size={14} style={{display:'inline', marginRight:'4px'}}/>{requiredDocument || 'N/A'}</span>
          </div>

          <div className="action-item">
            <span className="action-label">Acción Requerida:</span>
            <span className="action-value">{requiredAction || 'N/A'}</span>
          </div>
          
          <div className="action-item" style={{ marginTop: '16px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span>Última revisión documental: {new Date(lastRevision).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AircraftStatusBoard;
