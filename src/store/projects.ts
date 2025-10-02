import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Project } from "@/types";

type ProjectsState = {
  projects: Project[];
  addProject: (p: Omit<Project, "id" | "createdAt">) => Project;
  updateProject: (id: string, patch: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProject: (id: string) => Project | undefined;
};

export const useProjects = create<ProjectsState>()(
  persist(
    (set, get) => ({
      projects: [],
      addProject: (p) => {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const proj: Project = {
          id,
          createdAt: now,
          ...p,
          leadsRange: p.leadsRange || "Leads!A1:Z",
          insightsRange: p.insightsRange || "Insights!A1:Z",
        };
        set((s) => ({ projects: [proj, ...s.projects] }));
        return proj;
      },
      updateProject: (id, patch) =>
        set((s) => ({
          projects: s.projects.map((x) =>
            x.id === id ? { ...x, ...patch, updatedAt: new Date().toISOString() } : x
          ),
        })),
      deleteProject: (id) =>
        set((s) => ({ projects: s.projects.filter((x) => x.id !== id) })),
      getProject: (id) => get().projects.find((p) => p.id === id),
    }),
    { name: "localpulse-projects" }
  )
);
