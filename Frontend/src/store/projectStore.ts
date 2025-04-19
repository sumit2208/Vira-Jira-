import { create } from 'zustand';

interface ProjectFromAPI {
  id: string;
  name: string;
  description?: string;
}

interface EnhancedProject extends ProjectFromAPI {
  manualStatus: string;
  manualProgress: number;
  manualFavorite: boolean;
  manualActive: boolean;
}

interface ProjectState {
  projects: EnhancedProject[];
  searchQuery: string;
  viewMode: 'grid' | 'list';
  activeTab: string;

  setProjects: (projects: ProjectFromAPI[]) => void;
  setSearchQuery: (query: string) => void;
  setViewMode: (mode: 'grid' | 'list') => void;
  setActiveTab: (tab: string) => void;

  toggleActive: (id: string) => void;
  toggleFavorite: (id: string) => void;
  changeStatus: (id: string) => void;
  incrementProgress: (id: string) => void;
  decrementProgress: (id: string) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projects: [],
  searchQuery: '',
  viewMode: 'grid',
  activeTab: 'all',

  setProjects: (data: ProjectFromAPI[]) => {
    const enhanced: EnhancedProject[] = data.map((project) => ({
      ...project,
      manualStatus: 'Pending',
      manualProgress: 0,
      manualFavorite: false,
      manualActive: false,
    }));
    set({ projects: enhanced });
  },
  

  setSearchQuery: (query) => set({ searchQuery: query }),
  setViewMode: (mode) => set({ viewMode: mode }),
  setActiveTab: (tab) => set({ activeTab: tab }),

  toggleActive: (id) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, manualActive: !p.manualActive } : p
      ),
    })),

  toggleFavorite: (id) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, manualFavorite: !p.manualFavorite } : p
      ),
    })),

  changeStatus: (id) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === id) {
          let nextStatus =
            p.manualStatus === 'Pending'
              ? 'In Progress'
              : p.manualStatus === 'In Progress'
              ? 'Completed'
              : 'Pending';
          return { ...p, manualStatus: nextStatus };
        }
        return p;
      }),
    })),

  incrementProgress: (id) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === id) {
          const newProgress = Math.min(100, p.manualProgress + 10);
          const newStatus = newProgress === 100 ? 'Completed' : p.manualStatus;
          return { ...p, manualProgress: newProgress, manualStatus: newStatus };
        }
        return p;
      }),
    })),

  decrementProgress: (id) =>
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id === id) {
          const newProgress = Math.max(0, p.manualProgress - 10);
          const newStatus =
            p.manualProgress === 100 && newProgress < 100 ? 'In Progress' : p.manualStatus;
          return { ...p, manualProgress: newProgress, manualStatus: newStatus };
        }
        return p;
      }),
    })),
}));
