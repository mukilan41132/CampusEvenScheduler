import type { Role } from "../Types";

// ── Route menus (used by router/breadcrumbs) ───────────────────────────────
export interface RouteMenu {
  label: string;
  path: string;
}

export const routeMenus: Record<Role, RouteMenu[]> = {
  ADMIN: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Manage Students", path: "/manage-students" },
    { label: "Manage Events", path: "/manage-events" },
  ],
  faculty: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Host Event", path: "/host-event" },
    { label: "My Events", path: "/my-events" },
    { label: "Student Register", path: "/student-register" },
  ],
  STUDENT: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "View Events", path: "/view-events" },
    { label: "My Registrations", path: "/my-registrations" },
    { label: "Profile", path: "/profile" },
  ],
};

// ── Sidebar nav items (used by <Sidebar />) ────────────────────────────────
export interface NavSection {
  section: string;
}

export interface NavItem {
  icon: string;
  label: string;
  active?: boolean;
  badge?: string;
}

export type NavEntry = NavItem | NavSection;

export const navMap: Record<Role, NavEntry[]> = {
  ADMIN: [
    { icon: "layout-dashboard", label: "Dashboard", active: true },
    { icon: "calendar-event", label: "All events" },
    { icon: "clock-check", label: "Approvals", badge: "5" },
    { section: "Manage" },
    { icon: "users", label: "Users" },
    { icon: "building", label: "Departments" },
    { icon: "chart-bar", label: "Analytics" },
    { icon: "settings", label: "Settings" },
  ],
  faculty: [
    { icon: "layout-dashboard", label: "Dashboard", active: true },
    { icon: "calendar-event", label: "My events" },
    { icon: "plus", label: "Create event" },
    { section: "Tools" },
    { icon: "users", label: "Registrations" },
    { icon: "bell", label: "Notifications" },
  ],
  STUDENT: [
    { icon: "layout-dashboard", label: "Dashboard", active: true },
    { icon: "calendar-event", label: "Browse events" },
    { icon: "bookmark", label: "My registrations" },
    { section: "Other" },
    { icon: "bell", label: "Reminders" },
    { icon: "user", label: "Profile" },
  ],
};

export const roleIcons: Record<Role, string> = {
  ADMIN: "shield",
  faculty: "school",
  STUDENT: "user",
};

// ── Type guard to distinguish nav sections from nav items ──────────────────
export const isNavSection = (entry: NavEntry): entry is NavSection =>
  "section" in entry;

// ── Sidebar props (co-locate with the data it describes) ───────────────────
export interface SidebarProps {
  role: Role;
  onRoleChange: (role: Role) => void;
}

export default routeMenus;