/**
 * DATOS TEMPORALES DE INTERFAZ — PENDIENTES DE MIGRACIÓN Y VALIDACIÓN EN BASE DE DATOS
 * Nota: Estos datos son un reflejo exacto de la matriz de habilitación operativa (fleet_operational_status.md).
 * No deben considerarse como fuente técnica definitiva para los cálculos, solo para UI y bloqueos.
 */

export const fleetData = [
  {
    registration: 'CC-DKD',
    model: 'P2006T',
    status: 'NO OPERATIVA',
    modules: {
      weightAndBalance: 'BLOQUEADO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'REQ. REV.',
      limitations: 'LISTO'
    },
    missingData: 'Brazo/momento vacío, pesaje individual.',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Reporte pesaje individual firmado (CMA 287).',
    requiredAction: 'Conseguir y cargar el reporte de pesaje individual.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DDF',
    model: 'P2002 MKII',
    status: 'OP. SOLO P&B',
    modules: {
      weightAndBalance: 'REQ. REV.',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Verificar visualmente pesaje de 2019 y subir perf.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DDG',
    model: 'P2002 MKII',
    status: 'CONF. EN REV.',
    modules: {
      weightAndBalance: 'BLOQUEADO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Resolución de discrepancia de peso (2 lbs).',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Enmienda o aclaración de pesaje reciente (2022-2025).',
    requiredAction: 'Confirmar cuál es el peso vacío oficial vigente.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DDH',
    model: 'P2002 MKII',
    status: 'OP. SOLO P&B',
    modules: {
      weightAndBalance: 'REQ. REV.',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Verificar visualmente pesaje de 2022 y subir perf.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DMJ',
    model: 'P2002 iS',
    status: 'CONF. EN REV.',
    modules: {
      weightAndBalance: 'BLOQUEADO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Resolución de discrepancia de peso (2 lbs).',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Aclaración sobre peso con/sin unusable fuel.',
    requiredAction: 'Confirmar si peso vacío incluye combustible no usable.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-DMK',
    model: 'P92 LSA',
    status: 'CONF. EN REV.',
    modules: {
      weightAndBalance: 'BLOQUEADO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Envolvente de CG verificado del P92.',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'POH Sección 6 (Envolvente CG del P92).',
    requiredAction: 'Entregar envolvente de CG correcto del P92.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-CIM',
    model: 'Cessna 152',
    status: 'OP. SOLO P&B',
    modules: {
      weightAndBalance: 'LISTO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del POH.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-TCA',
    model: 'Cessna 152',
    status: 'CONF. EN REV.',
    modules: {
      weightAndBalance: 'REQ. REV.',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Confirmación de STC Hélice en cartilla física.',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Confirmación de hélice Sensenich (2022).',
    requiredAction: 'Aprobar uso de datos de enmienda de 2022.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-KIJ',
    model: 'Cessna 152',
    status: 'CONF. EN REV.',
    modules: {
      weightAndBalance: 'BLOQUEADO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Reporte de pesaje individual de CC-KIJ.',
    blockedFunctions: 'Peso y Balance, Combustible, Perf.',
    requiredDocument: 'Reporte de pesaje firmado de CC-KIJ.',
    requiredAction: 'Cargar el certificado de pesaje individual.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-AFB',
    model: 'Cessna 172',
    status: 'OP. SOLO P&B',
    modules: {
      weightAndBalance: 'LISTO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del C172SP.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-AFC',
    model: 'Cessna 172',
    status: 'OP. SOLO P&B',
    modules: {
      weightAndBalance: 'LISTO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del C172SP.',
    lastRevision: new Date().toISOString()
  },
  {
    registration: 'CC-AFD',
    model: 'Cessna 172',
    status: 'OP. SOLO P&B',
    modules: {
      weightAndBalance: 'LISTO',
      fuel: 'BLOQUEADO',
      navigation: 'BLOQUEADO',
      perfTakeoff: 'BLOQUEADO',
      perfLanding: 'BLOQUEADO',
      perfClimb: 'BLOQUEADO',
      perfCruise: 'BLOQUEADO',
      checklist: 'LISTO',
      limitations: 'LISTO'
    },
    missingData: 'Tablas de performance y consumo.',
    blockedFunctions: 'Combustible de ruta, Perf.',
    requiredDocument: 'Tablas de performance del POH.',
    requiredAction: 'Cargar tablas de performance y consumo del C172SP.',
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
