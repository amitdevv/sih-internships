"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type UIState = {
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;
  role: "student" | "mentor" | "placement" | "admin" | null;
  setRole: (role: UIState["role"]) => void;
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      role: null,
      setRole: (role) => set({ role }),
    }),
    { name: "ui-store" }
  )
);


