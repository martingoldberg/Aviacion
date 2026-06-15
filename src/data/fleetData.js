/**
 * DATOS TEMPORALES DE INTERFAZ — PENDIENTES DE MIGRACIÓN Y VALIDACIÓN EN BASE DE DATOS
 * Nota: Estos datos son un reflejo de la auditoría documental v2.
 * Habilitan el cálculo de Peso y Balance solo para aeronaves con POH y Certificado verificados.
 */

export const fleetData = [
  {
    registration: 'CC-CIM',
    model: 'Cessna 152',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del POH.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-TCA',
    model: 'Cessna 152',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del POH.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-KIJ',
    model: 'Cessna 152',
    status: 'CONF. EN REV.',
    modules: { weightAndBalance: 'BLOQUEADO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Reporte de pesaje individual de CC-KIJ.',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Reporte de pesaje firmado de CC-KIJ.',
    requiredAction: 'Cargar el certificado de pesaje individual.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-AFB',
    model: 'Cessna 172SP',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del C172SP.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-AFC',
    model: 'Cessna 172SP',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del C172SP.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-AFD',
    model: 'Cessna 172SP',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del C172SP.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DDF',
    model: 'Tecnam P2002',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Verificar visualmente pesaje de 2019 y subir perf.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DDG',
    model: 'Tecnam P2002',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Verificar visualmente pesaje y subir perf.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DDH',
    model: 'Tecnam P2002',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Verificar visualmente pesaje de 2022 y subir perf.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DMJ',
    model: 'Tecnam P2002',
    status: 'OP. SOLO P&B',
    modules: { weightAndBalance: 'LISTO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH de la variante iS.',
    requiredAction: 'Cargar y verificar manual P2002 MKII iS.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DMK',
    model: 'Tecnam P92',
    status: 'CONF. EN REV.',
    modules: { weightAndBalance: 'BLOQUEADO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'LISTO', limitations: 'LISTO' },
    missingData: 'Certificado individual de Peso y Balance.',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Reporte de pesaje firmado de CC-DMK.',
    requiredAction: 'Cargar el certificado individual validado.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DWC',
    model: 'Tecnam P2006T',
    status: 'NO OPERATIVA',
    modules: { weightAndBalance: 'BLOQUEADO', fuel: 'BLOQUEADO', navigation: 'BLOQUEADO', perfTakeoff: 'BLOQUEADO', perfLanding: 'BLOQUEADO', perfClimb: 'BLOQUEADO', perfCruise: 'BLOQUEADO', checklist: 'REQ. REV.', limitations: 'REQ. REV.' },
    missingData: 'Pesaje individual y confirmación de modelo.',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Reporte de pesaje firmado P2006T.',
    requiredAction: 'Conseguir y cargar el reporte de pesaje individual.',
    lastRevision: new Date().toISOString()
  }
];

export const getModels = () => {
  const models = [...new Set(fleetData.map(a => a.model))];
  return models.sort();
};

export const getAircraftsByModel = (model) => {
  return fleetData.filter(a => a.model === model);
};

export const getAircraftDetails = (registration) => {
  return fleetData.find(a => a.registration === registration);
};
