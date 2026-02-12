// Temporary empty store to resolve import errors
export const useAdminStore = (selector?: any) => {
  if (selector) {
    return selector({
      buses: [],
      drivers: [],
      routes: [],
      feedback: [],
      incidents: [],
      schedules: [],
      loading: {
        buses: false,
        drivers: false,
        routes: false,
        feedback: false,
        incidents: false,
        schedules: false
      },
      error: null,
      loadAllData: async () => {}
    });
  }
  return {
    buses: [],
    drivers: [],
    routes: [],
    feedback: [],
    incidents: [],
    schedules: [],
    loading: {
      buses: false,
      drivers: false,
      routes: false,
      feedback: false,
      incidents: false,
      schedules: false
    },
    error: null,
    loadAllData: async () => {}
  };
};