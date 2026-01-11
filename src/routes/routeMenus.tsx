export interface RouteMenu {
  label: string;
  path: string;
}

const routeMenus: Record<string, RouteMenu[]> = {
  admin: [
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
  student: [
    { label: "Dashboard", path: "/dashboard" },
    { label: "View Events", path: "/view-events" },
    { label: "My Registrations", path: "/my-registrations" },
    { label: "Profile", path: "/profile" },
  ],
};

export default routeMenus;
