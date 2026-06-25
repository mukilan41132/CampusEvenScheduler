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
  path: string;
}

export type NavEntry = NavItem | NavSection;

export const navMap: Record<Role, NavEntry[]> = {
  ADMIN: [
    { icon: "layout-dashboard", label: "Dashboard", path: "/dashboard", active: true },
    { icon: "calendar-event", label: "All events", path: "/manage-events" },
    { icon: "clock-check", label: "Approvals", path: "/admin/approvals", badge: "5" },
    { section: "Manage" },
    { icon: "users", label: "Users", path: "/admin/users" },
    { icon: "students", label: "Students", path: "/manage-students" },
    { icon: "building", label: "Departments", path: "/admin/departments" },
    { icon: "chart-bar", label: "Analytics", path: "/admin/analytics" },
    { icon: "settings", label: "Settings", path: "/admin/settings" },
  ],
  faculty: [
    { icon: "layout-dashboard", label: "Dashboard", path: "/faculty/dashboard", active: true },
    { icon: "calendar-event", label: "My events", path: "/faculty/events" },
    { icon: "plus", label: "Create event", path: "/faculty/events/create" },
    { section: "Tools" },
    { icon: "users", label: "Registrations", path: "/faculty/registrations" },
    { icon: "bell", label: "Notifications", path: "/faculty/notifications" },
  ],
  STUDENT: [
    { icon: "layout-dashboard", label: "Dashboard", path: "/student/dashboard", active: true },
    { icon: "calendar-event", label: "Browse events", path: "/student/events" },
    { icon: "bookmark", label: "My registrations", path: "/student/registrations" },
    { section: "Other" },
    { icon: "bell", label: "Reminders", path: "/student/reminders" },
    { icon: "user", label: "Profile", path: "/student/profile" },
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