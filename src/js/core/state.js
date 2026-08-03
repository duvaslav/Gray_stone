const SAVE_KEY = "gray-stone-save-v1";

export function createInitialState(config) {
  return {
    schemaVersion: config.schemaVersion,
    day: 1,
    time: "05:30",
    actionPoints: config.rules.actionPointsPerDay,
    locationId: config.startLocationId,
    culpritId: null,
    selectedSuspectId: null,
    strategy: "none",
    relationships: {},
    flags: {},
    items: [],
    acquiredClueIds: [],
    completedEventIds: [],
    dialogueHistory: []
  };
}

export function loadState(config) {
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return createInitialState(config);

  try {
    const parsed = JSON.parse(raw);
    if (parsed.schemaVersion !== config.schemaVersion) {
      return createInitialState(config);
    }
    return parsed;
  } catch (error) {
    console.warn("Сохранение повреждено и будет сброшено.", error);
    return createInitialState(config);
  }
}

export function saveState(state) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(state));
}

export function clearState() {
  localStorage.removeItem(SAVE_KEY);
}
