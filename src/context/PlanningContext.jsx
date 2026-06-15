import React, { createContext, useState, useContext } from 'react';
import { getAircraftDetails } from '../data/fleetData';

const PlanningContext = createContext();

export const usePlanning = () => useContext(PlanningContext);

export const PlanningProvider = ({ children }) => {
  const [selectedAircraft, setSelectedAircraft] = useState(null);
  const [isPlanningActive, setIsPlanningActive] = useState(false);
  const [planningData, setPlanningData] = useState({
    general: { date: '', pilot: '', route: '', passengers: 0 },
    specific: null, // peso, performance, etc.
  });
  
  // For comparison simulation
  const [comparisonAircraft, setComparisonAircraft] = useState(null);

  const changeAircraft = (newRegistration, action) => {
    const newDetails = getAircraftDetails(newRegistration);
    if (!newDetails) return;

    if (action === 'cancel') {
      // Do nothing, keep current
      return;
    }

    if (action === 'recalculate') {
      // Keep general data, clear specific data
      setPlanningData(prev => ({
        ...prev,
        specific: null
      }));
      setSelectedAircraft(newDetails);
      setComparisonAircraft(null);
    }

    if (action === 'duplicate') {
      // Keep current as comparison, set new as selected
      setComparisonAircraft(selectedAircraft);
      setSelectedAircraft(newDetails);
    }
  };

  const selectAircraftDirectly = (registration) => {
    const details = getAircraftDetails(registration);
    if (details) setSelectedAircraft(details);
  };

  return (
    <PlanningContext.Provider value={{
      selectedAircraft,
      isPlanningActive,
      setIsPlanningActive,
      planningData,
      setPlanningData,
      changeAircraft,
      selectAircraftDirectly,
      comparisonAircraft,
      setComparisonAircraft
    }}>
      {children}
    </PlanningContext.Provider>
  );
};
