export const wbData = {
  'CC-DDH': {
    model: 'Tecnam P2002',
    registration: 'CC-DDH',
    units: {
      weight: 'kg',
      arm: 'm',
      fuel: 'L'
    },
    limits: {
      mtow: 600,
      maxBaggage: 20,
      maxFuel: 109,
      fuelDensity: 0.72018, // kg/L (78.5 kg / 109 L)
      envelope: {
        xMin: 1.651,
        xMax: 1.788,
        yMin: 380, // Approximate lower bound for graph visual
        yMax: 600
      }
    },
    performance: {
      cruiseConsumption: 17, // L/h
      vfrReserveMinutes: 45
    },
    stations: {
      empty: { name: 'Avión vacío', weight: 387.2, arm: 1.735 },
      pilot: { name: 'Piloto', arm: 1.840, max: 120 },
      passenger: { name: 'Pasajero', arm: 1.840, max: 120 },
      fuel: { name: 'Combustible', arm: 1.570, maxQty: 109 },
      baggage: { name: 'Equipaje', arm: 2.240, max: 20 }
    }
  }
};

export const getWBData = (registration) => {
  return wbData[registration] || null;
};
