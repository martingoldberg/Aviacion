import React, { useState, useEffect } from 'react';
import { getWBData } from '../data/wbData';
import { Check, AlertTriangle, FileText } from 'lucide-react';

export default function WeightAndBalanceEngine({ aircraftRegistration }) {
  const wb = getWBData(aircraftRegistration);

  // States for inputs
  const [pilot, setPilot] = useState(70);
  const [passenger, setPassenger] = useState(0);
  const [baggage, setBaggage] = useState(0);
  const [margin, setMargin] = useState(5);
  const [fuel, setFuel] = useState(92);
  const [extraHour, setExtraHour] = useState(true);

  if (!wb) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#ef4444' }}>
        <AlertTriangle size={48} style={{ margin: '0 auto 20px' }} />
        <h2>Datos no disponibles</h2>
        <p>No se encontraron datos de Peso y Balance verificados para la matrícula {aircraftRegistration}.</p>
      </div>
    );
  }

  // Engine Calculations
  const fuelWeight = fuel * wb.limits.fuelDensity;
  
  const weights = {
    empty: wb.stations.empty.weight,
    pilot: pilot,
    passenger: passenger,
    baggage: baggage,
    fuel: fuelWeight
  };

  const moments = {
    empty: weights.empty * wb.stations.empty.arm,
    pilot: weights.pilot * wb.stations.pilot.arm,
    passenger: weights.passenger * wb.stations.passenger.arm,
    baggage: weights.baggage * wb.stations.baggage.arm,
    fuel: weights.fuel * wb.stations.fuel.arm
  };

  const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
  const totalMoment = Object.values(moments).reduce((a, b) => a + b, 0);
  const currentCG = totalMoment / totalWeight;

  const effectiveMTOW = wb.limits.mtow - margin;
  const isWeightValid = totalWeight <= effectiveMTOW;
  const isCGValid = currentCG >= wb.limits.envelope.xMin && currentCG <= wb.limits.envelope.xMax;
  const isValid = isWeightValid && isCGValid;

  // Autonomy Calculations
  const totalHours = fuel / wb.performance.cruiseConsumption;
  const reserveHours = wb.performance.vfrReserveMinutes / 60;
  const extraHours = extraHour ? 1 : 0;
  const availableHours = Math.max(0, totalHours - reserveHours - extraHours);

  const formatHours = (decimalHours) => {
    const h = Math.floor(decimalHours);
    const m = Math.round((decimalHours - h) * 60);
    return `${h}h ${m.toString().padStart(2, '0')}m`;
  };

  // SVG Chart Logic
  const svgWidth = 500;
  const svgHeight = 300;
  const chartPadding = 40;
  const plotWidth = svgWidth - chartPadding * 2;
  const plotHeight = svgHeight - chartPadding * 2;
  
  const xMinAxis = 1.6;
  const xMaxAxis = 1.85;
  const yMinAxis = 380;
  const yMaxAxis = 620;

  const scaleX = (val) => chartPadding + ((val - xMinAxis) / (xMaxAxis - xMinAxis)) * plotWidth;
  const scaleY = (val) => svgHeight - chartPadding - ((val - yMinAxis) / (yMaxAxis - yMinAxis)) * plotHeight;

  // Envelope points (simple rectangle for CC-DDH)
  const envX1 = scaleX(wb.limits.envelope.xMin);
  const envX2 = scaleX(wb.limits.envelope.xMax);
  const envY1 = scaleY(wb.limits.envelope.yMin); // Bottom
  const envY2 = scaleY(wb.limits.envelope.yMax); // Top

  const cgX = scaleX(currentCG);
  const cgY = scaleY(totalWeight);

  // Custom Slider Component
  const WBSlider = ({ label, value, max, onChange, step = 1, unit = 'kg', extraLabel = '' }) => (
    <div style={{ marginBottom: '25px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', fontSize: '0.9rem', marginBottom: '10px' }}>
        <span>{label} {extraLabel && <span style={{opacity: 0.7}}>• {extraLabel}</span>}</span>
        <span style={{ color: '#d97706', fontWeight: 600 }}>{value}</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max={max} 
        step={step}
        value={value} 
        onChange={(e) => onChange(Number(e.target.value))}
        className="custom-wb-slider"
        style={{
          width: '100%',
          appearance: 'none',
          height: '6px',
          background: `linear-gradient(to right, #d97706 ${(value/max)*100}%, #334155 ${(value/max)*100}%)`,
          borderRadius: '3px',
          outline: 'none'
        }}
      />
    </div>
  );

  return (
    <div className="wb-engine" style={{ backgroundColor: '#020617', color: '#f8fafc', padding: '30px', borderRadius: '12px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 400, color: '#f8fafc', margin: '0 0 10px 0' }}>Peso y Balance</h1>
        <div style={{ color: '#64748b', fontSize: '1.05rem' }}>
          MTOW {wb.limits.mtow} kg (efectivo {effectiveMTOW} kg con {margin} kg margen) • CG {wb.limits.envelope.xMin}–{wb.limits.envelope.xMax} m
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        
        {/* Left Column: Sliders */}
        <div className="wb-panel" style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '30px' }}>
          <WBSlider label="Piloto (kg)" value={pilot} max={120} onChange={setPilot} />
          <WBSlider label="Pasajero (kg)" value={passenger} max={120} onChange={setPassenger} />
          <WBSlider label="Equipaje (kg)" extraLabel={`máx ${wb.limits.maxBaggage}`} value={baggage} max={wb.limits.maxBaggage} onChange={setBaggage} />
          <WBSlider label="Margen de seguridad MTOW (kg)" value={margin} max={50} onChange={setMargin} />
          
          <div style={{ marginTop: '40px' }}>
            <WBSlider 
              label="Combustible base" 
              extraLabel={`máx 92 L • +17 L extra`} 
              value={fuel} 
              max={wb.limits.maxFuel} 
              onChange={setFuel} 
            />
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
              <button 
                onClick={() => { setFuel(109); setExtraHour(true); }}
                style={{ flex: 1, backgroundColor: 'rgba(217, 119, 6, 0.1)', border: '1px solid #d97706', color: '#d97706', padding: '12px', borderRadius: '8px', cursor: 'pointer', fontWeight: 500 }}
              >
                ⛽ Llenar al máx + 1h extra
              </button>
              <button 
                onClick={() => setFuel(wb.limits.maxFuel)}
                style={{ flex: 1, backgroundColor: '#1e293b', border: 'none', color: '#94a3b8', padding: '12px', borderRadius: '8px', cursor: 'pointer' }}
              >
                Llenar tanque
              </button>
            </div>
            
            <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#64748b', lineHeight: '1.6', fontFamily: 'monospace' }}>
              <div>Tanque usable: {wb.limits.maxFuel} L - cabe el llenado completo.</div>
              <div>Base = {Math.min(92, fuel).toFixed(1)} L • Extra +{Math.max(0, fuel - 92).toFixed(1)} L</div>
              <div>Total = {fuel.toFixed(1)} L • {fuelWeight.toFixed(1)} kg • {(fuelWeight * 2.20462).toFixed(1)} lb</div>
            </div>
          </div>
        </div>

        {/* Right Column: Envelope & Table */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Chart Panel */}
          <div className="wb-panel" style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '30px' }}>
            <div style={{ color: '#f8fafc', fontSize: '1.1rem', marginBottom: '20px' }}>SOBRE DE CG</div>
            
            <svg width="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} style={{ borderBottom: '1px solid #334155', borderLeft: '1px solid #334155' }}>
              {/* Grid Lines */}
              {[380, 440, 500, 560, 620].map(y => (
                <line key={y} x1={chartPadding} y1={scaleY(y)} x2={svgWidth - chartPadding} y2={scaleY(y)} stroke="#1e293b" strokeDasharray="4 4" />
              ))}
              {[1.6, 1.665, 1.73, 1.795, 1.85].map(x => (
                <line key={x} x1={scaleX(x)} y1={chartPadding} x2={scaleX(x)} y2={svgHeight - chartPadding} stroke="#1e293b" strokeDasharray="4 4" />
              ))}
              
              {/* Envelope Box */}
              <polygon 
                points={`${envX1},${envY1} ${envX1},${envY2} ${envX2},${envY2} ${envX2},${envY1}`} 
                fill="rgba(34, 197, 94, 0.1)" 
                stroke="#22c55e" 
                strokeWidth="1.5" 
              />
              
              {/* Current CG Point */}
              <circle cx={cgX} cy={cgY} r="6" fill="#d97706" />
              
              {/* Axis Labels */}
              {[380, 440, 500, 560, 620].map(y => (
                <text key={y} x={chartPadding - 10} y={scaleY(y) + 4} fill="#64748b" fontSize="12" textAnchor="end">{y}</text>
              ))}
              {[1.6, 1.665, 1.73, 1.795, 1.85].map(x => (
                <text key={x} x={scaleX(x)} y={svgHeight - chartPadding + 20} fill="#64748b" fontSize="12" textAnchor="middle">{x}</text>
              ))}
              
              <text x={15} y={svgHeight/2} fill="#94a3b8" fontSize="14" transform={`rotate(-90 15,${svgHeight/2})`} textAnchor="middle">Peso (kg)</text>
              <text x={svgWidth/2} y={svgHeight - 5} fill="#94a3b8" fontSize="14" textAnchor="middle">Brazo (m)</text>
            </svg>
            
            <div style={{ marginTop: '20px', fontSize: '1rem', color: '#94a3b8' }}>
              CG actual: <span style={{ color: isCGValid ? '#d97706' : '#ef4444', fontWeight: 600 }}>{currentCG.toFixed(3)} m</span> • Peso: <span style={{ color: isWeightValid ? '#d97706' : '#ef4444', fontWeight: 600 }}>{totalWeight.toFixed(1)} kg</span>
            </div>
          </div>

        </div>

      </div>

      {/* Autonomy Section */}
      <div style={{ marginTop: '30px', backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px', padding: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ color: '#f8fafc', fontSize: '1.1rem', letterSpacing: '1px' }}>AUTONOMÍA ESTIMADA</div>
          <div style={{ color: '#64748b', fontSize: '0.9rem' }}>Consumo: <span style={{color: '#d97706'}}>{wb.performance.cruiseConsumption}</span> L/h</div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1px', backgroundColor: '#1e293b', borderRadius: '8px', overflow: 'hidden', marginBottom: '20px' }}>
          <div style={{ backgroundColor: '#0f172a', padding: '20px', textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '1px' }}>TOTAL</div>
            <div style={{ color: '#d97706', fontSize: '1.4rem', fontWeight: 600 }}>{formatHours(totalHours)}</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{totalHours.toFixed(2)} h</div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '20px', textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '1px' }}>RESERVA</div>
            <div style={{ color: '#0ea5e9', fontSize: '1.4rem', fontWeight: 600 }}>{formatHours(reserveHours)}</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{reserveHours.toFixed(2)} h</div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '20px', textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '1px' }}>EXTRA</div>
            <div style={{ color: '#10b981', fontSize: '1.4rem', fontWeight: 600 }}>{formatHours(extraHours)}</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{extraHours.toFixed(2)} h</div>
          </div>
          <div style={{ backgroundColor: '#0f172a', padding: '20px', textAlign: 'center' }}>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '8px', letterSpacing: '1px' }}>DISPONIBLE</div>
            <div style={{ color: '#22c55e', fontSize: '1.4rem', fontWeight: 600 }}>{formatHours(availableHours)}</div>
            <div style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>{availableHours.toFixed(2)} h</div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#f8fafc', marginBottom: '10px' }}>
          <input 
            type="checkbox" 
            checked={extraHour} 
            onChange={(e) => setExtraHour(e.target.checked)} 
            style={{ accentColor: '#d97706', width: '18px', height: '18px' }}
          />
          <label>Reservar <strong>+1 hora</strong> extra de combustible (17 L)</label>
        </div>
        <div style={{ color: '#64748b', fontSize: '0.9rem' }}>
          Rotax 912iS - crucero 75% ≃ 17 L/h - reserva VFR diurna 45 min
        </div>
      </div>

      {/* Calculation Table & Summary */}
      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
        
        <div style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#94a3b8', lineHeight: '2' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '10px' }}>
            <span>Avión vacío</span>
            <span>{weights.empty.toFixed(1)} kg × {wb.stations.empty.arm.toFixed(3)} = {moments.empty.toFixed(1)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '10px' }}>
            <span>Ocupantes</span>
            <span>{(weights.pilot + weights.passenger).toFixed(1)} kg × {wb.stations.pilot.arm.toFixed(3)} = {(moments.pilot + moments.passenger).toFixed(1)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '10px' }}>
            <span>Combustible</span>
            <span>{weights.fuel.toFixed(1)} kg × {wb.stations.fuel.arm.toFixed(3)} = {moments.fuel.toFixed(1)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '10px' }}>
            <span>Equipaje</span>
            <span>{weights.baggage.toFixed(1)} kg × {wb.stations.baggage.arm.toFixed(3)} = {moments.baggage.toFixed(1)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: '#f8fafc', fontSize: '1.1rem', paddingTop: '10px' }}>
            <span>TOTAL</span>
            <span>{totalWeight.toFixed(1)} kg • CG {currentCG.toFixed(3)} m</span>
          </div>
        </div>

        {isValid ? (
          <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.1)', border: '1px solid #22c55e', color: '#22c55e', padding: '15px 20px', borderRadius: '8px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Check size={20} /> Dentro de límites — listo para volar
          </div>
        ) : (
          <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '15px 20px', borderRadius: '8px', fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} /> Excede los límites de Peso y Balance. Ajuste la carga.
          </div>
        )}

        <div style={{ backgroundColor: 'rgba(217, 119, 6, 0.05)', border: '1px solid rgba(217, 119, 6, 0.3)', padding: '25px', borderRadius: '8px' }}>
          <div style={{ color: '#d97706', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px' }}>
            <FileText size={16} /> RESUMEN FINAL
          </div>
          <p style={{ color: '#cbd5e1', lineHeight: '1.8', margin: 0, fontSize: '1.05rem' }}>
            Vas a despegar con <strong style={{color: '#d97706'}}>{totalWeight.toFixed(0)} kg</strong> ({(wb.limits.mtow - totalWeight).toFixed(0)} kg por debajo del MTOW efectivo de {effectiveMTOW} kg — margen de {margin} kg reservado). 
            Llevas <strong style={{color: '#d97706'}}>{fuel} L</strong> de combustible (incluye <strong style={{color: '#0ea5e9'}}>+1 h extra</strong> de reserva), lo que da <strong style={{color: '#d97706'}}>{formatHours(totalHours)}</strong> de autonomía total y <strong style={{color: '#22c55e'}}>{formatHours(availableHours)}</strong> disponibles para volar después de la reserva VFR de 45 min y la hora extra.
            <br/><br/>
            El centro de gravedad está en <strong style={{color: '#d97706'}}>{currentCG.toFixed(3)} m</strong> {isCGValid ? <span style={{color: '#22c55e'}}>✓ dentro del envelope.</span> : <span style={{color: '#ef4444'}}>✗ FUERA DEL ENVELOPE.</span>}
            <br/><br/>
            {isValid ? (
              <span style={{color: '#22c55e'}}>→ Configuración válida. Continúa con el cálculo de pista y el checklist.</span>
            ) : (
              <span style={{color: '#ef4444'}}>→ Configuración inválida. No puedes volar con estos parámetros.</span>
            )}
          </p>
        </div>

      </div>

    </div>
  );
}
