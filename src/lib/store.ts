import { create } from 'zustand';

interface UIState {
  // Theme
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Dialogs
  isNewProjectDialogOpen: boolean;
  setNewProjectDialogOpen: (open: boolean) => void;
  
  // Sidebar
  isSidebarCollapsed: boolean;
  setSidebarCollapsed: (collapsed: boolean) => void;
  
  // Loading states
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  theme: 'system',
  setTheme: (theme) => set({ theme }),
  
  isNewProjectDialogOpen: false,
  setNewProjectDialogOpen: (open) => set({ isNewProjectDialogOpen: open }),
  
  isSidebarCollapsed: false,
  setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
  
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
