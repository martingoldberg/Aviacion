import React, { useState } from 'react';
import { usePlanning } from '../context/PlanningContext';
import { ChevronRight, ChevronLeft, Check, Plane, Users, Droplets, Scale, Map, FileText } from 'lucide-react';
import AircraftStatusBoard from './AircraftStatusBoard';

export default function PlanningWizard() {
  const { isPlanningActive, setIsPlanningActive, selectedAircraft } = usePlanning();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { id: 1, title: 'Aeronave', icon: Plane },
    { id: 2, title: 'Piloto & Pax', icon: Users },
    { id: 3, title: 'Combustible', icon: Droplets },
    { id: 4, title: 'Peso y Balance', icon: Scale },
    { id: 5, title: 'Ruta & Met.', icon: Map },
    { id: 6, title: 'Validación', icon: FileText }
  ];

  if (!isPlanningActive) return null;

  return (
    <div className="planning-wizard">
      <div className="wizard-header" style={{ marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2>Nueva Planificación de Vuelo</h2>
          <button className="btn-secondary" onClick={() => setIsPlanningActive(false)}>
            Cancelar / Volver
          </button>
        </div>

        {/* Stepper UI */}
        <div className="stepper" style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
          {/* Progress line */}
          <div style={{ position: 'absolute', top: '15px', left: '50px', right: '50px', height: '2px', background: 'rgba(255,255,255,0.1)', zIndex: 0 }}>
            <div style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`, height: '100%', background: 'var(--sky-blue)', transition: 'width 0.3s' }}></div>
          </div>
          
          {steps.map((step) => {
            const Icon = step.icon;
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            
            return (
              <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1, gap: '8px' }}>
                <div style={{ 
                  width: '32px', height: '32px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: isActive ? 'var(--sky-blue)' : (isCompleted ? '#10b981' : 'var(--bg-navy)'),
                  border: `2px solid ${isActive || isCompleted ? 'transparent' : 'rgba(255,255,255,0.2)'}`,
                  color: isActive || isCompleted ? '#fff' : 'var(--text-muted)'
                }}>
                  {isCompleted ? <Check size={16} /> : <Icon size={16} />}
                </div>
                <span style={{ fontSize: '0.8rem', color: isActive ? 'var(--sky-blue)' : 'var(--text-muted)', fontWeight: isActive ? 600 : 400 }}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="wizard-content card" style={{ padding: '30px', minHeight: '400px', display: 'flex', flexDirection: 'column' }}>
        {/* Step 1: Aeronave */}
        {currentStep === 1 && (
          <div className="step-container">
            <h3 style={{ marginBottom: '20px' }}>Confirmar Aeronave</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Verifique el estado operacional de la aeronave seleccionada antes de continuar.
            </p>
            <AircraftStatusBoard />
            
            {selectedAircraft?.modules?.weightAndBalance === 'BLOQUEADO' && (
              <div style={{ padding: '15px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', borderRadius: '8px', color: '#ef4444', marginTop: '20px' }}>
                <strong>ATENCIÓN:</strong> Esta aeronave tiene módulos críticos bloqueados por falta de validación documental. No podrá completar la planificación de Peso y Balance.
              </div>
            )}
          </div>
        )}

        {/* Step 2: Piloto */}
        {currentStep === 2 && (
          <div className="step-container">
            <h3 style={{ marginBottom: '20px' }}>Piloto y Ocupantes</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
              Ingrese el peso de la tripulación y pasajeros en su estación correspondiente.
            </p>
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', border: '1px dashed rgba(255,255,255,0.1)', borderRadius: '8px' }}>
              (Formulario de estaciones de pasajeros en construcción)
            </div>
          </div>
        )}

        {/* Controles del Wizard */}
        <div style={{ marginTop: 'auto', paddingTop: '30px', display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--panel-border)' }}>
          <button 
            className="btn-secondary" 
            onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
            disabled={currentStep === 1}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: currentStep === 1 ? 0.5 : 1 }}
          >
            <ChevronLeft size={16} /> Anterior
          </button>
          
          <button 
            className="btn-primary" 
            onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {currentStep === steps.length ? 'Finalizar y Exportar' : 'Siguiente Paso'} {currentStep < steps.length && <ChevronRight size={16} />}
          </button>
        </div>
      </div>
    </div>
  );
}
