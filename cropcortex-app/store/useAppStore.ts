import { create } from 'zustand';

type Language = 'en' | 'hi' | 'te' | 'kn' | 'ta' | 'mr' | 'pa' | 'bn';

interface User {
  name: string;
  fullName: string;
  mobile: string;
  state: string;
  district: string;
  language: Language;
  avatar: string;
}

interface Field {
  id: string;
  name: string;
  crop: string;
  active: boolean;
}

interface DiagnosisEntry {
  id: string;
  disease: string;
  crop: string;
  date: string;
  severity: string;
  confidence: number;
}

interface Task {
  id: string;
  date: string;
  task: string;
  crop: string;
  field: string;
  time: string;
  priority: 'critical' | 'recommended' | 'optional';
  icon: string;
  done: boolean;
}

interface AppState {
  // Auth
  isAuthenticated: boolean;
  isGuest: boolean;
  authToken: string | null;
  user: User | null;

  // Onboarding
  hasCompletedOnboarding: boolean;
  selectedLanguage: Language;

  // Network
  isOnline: boolean;
  lastSyncTimestamp: string;

  // Field
  activeFieldId: string;
  fields: Field[];

  // Diagnosis
  diagnosisHistory: DiagnosisEntry[];
  isScanning: boolean;
  showDiagnosisResult: boolean;
  currentDiseaseId: string | null;

  // Market
  selectedCategory: string;
  selectedCropForDetail: string | null;

  // Advisory
  selectedDate: string;
  tasks: Task[];

  // UI
  showOfflineBanner: boolean;

  // Actions
  setAuthenticated: (value: boolean) => void;
  setGuest: (value: boolean) => void;
  setAuthToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  completeOnboarding: () => void;
  setLanguage: (lang: Language) => void;
  setOnline: (value: boolean) => void;
  setLastSync: (timestamp: string) => void;
  setActiveField: (fieldId: string) => void;
  setFields: (fields: Field[]) => void;
  addDiagnosis: (entry: DiagnosisEntry) => void;
  setScanning: (value: boolean) => void;
  setShowDiagnosisResult: (value: boolean) => void;
  setCurrentDiseaseId: (id: string | null) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedCropForDetail: (cropId: string | null) => void;
  setSelectedDate: (date: string) => void;
  toggleTaskDone: (taskId: string) => void;
  setTasks: (tasks: Task[]) => void;
  setShowOfflineBanner: (value: boolean) => void;
  logout: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  // Auth
  isAuthenticated: false,
  isGuest: false,
  authToken: null,
  user: null,

  // Onboarding
  hasCompletedOnboarding: false,
  selectedLanguage: 'en',

  // Network
  isOnline: true,
  lastSyncTimestamp: 'Oct 12, 2025 — 3:45 PM',

  // Field
  activeFieldId: 'field-001',
  fields: [
    { id: 'field-001', name: 'Main Plot — Tomato', crop: 'Tomato', active: true },
    { id: 'field-002', name: 'East Plot — Cotton', crop: 'Cotton', active: false },
    { id: 'field-003', name: 'River Side — Rice', crop: 'Rice', active: false },
  ],

  // Diagnosis
  diagnosisHistory: [],
  isScanning: false,
  showDiagnosisResult: false,
  currentDiseaseId: null,

  // Market
  selectedCategory: 'All',
  selectedCropForDetail: null,

  // Advisory
  selectedDate: '2025-10-14',
  tasks: [],

  // UI
  showOfflineBanner: false,

  // Actions
  setAuthenticated: (value) => set({ isAuthenticated: value }),
  setGuest: (value) => set({ isGuest: value }),
  setAuthToken: (token) => set({ authToken: token }),
  setUser: (user) => set({ user }),
  completeOnboarding: () => set({ hasCompletedOnboarding: true }),
  setLanguage: (lang) => set({ selectedLanguage: lang }),
  setOnline: (value) => set({ isOnline: value, showOfflineBanner: !value }),
  setLastSync: (timestamp) => set({ lastSyncTimestamp: timestamp }),
  setActiveField: (fieldId) => set({ activeFieldId: fieldId }),
  setFields: (fields) => set({ fields }),
  addDiagnosis: (entry) => set((state) => ({ diagnosisHistory: [entry, ...state.diagnosisHistory] })),
  setScanning: (value) => set({ isScanning: value }),
  setShowDiagnosisResult: (value) => set({ showDiagnosisResult: value }),
  setCurrentDiseaseId: (id) => set({ currentDiseaseId: id }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedCropForDetail: (cropId) => set({ selectedCropForDetail: cropId }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  toggleTaskDone: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((t) => (t.id === taskId ? { ...t, done: !t.done } : t)),
    })),
  setTasks: (tasks) => set({ tasks }),
  setShowOfflineBanner: (value) => set({ showOfflineBanner: value }),
  logout: () =>
    set({
      isAuthenticated: false,
      isGuest: false,
      authToken: null,
      user: null,
    }),
}));

export default useAppStore;
