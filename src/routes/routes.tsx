import Dashbord from "../pages/Dashbord/Dashbord";
import ManageStudent from "../pages/admin/manage-student";
 
import ManageEvents from "../pages/admin/manage-events";

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  role?: "admin" | "faculty" | "student";
}

export const routesConfig: AppRoute[] = [
  {
    path: "/dashboard",
    element: <Dashbord />,
  },

  {
    path: "/manage-events",
    element: <ManageEvents />,
  },
  {
    path: "/manage-students",
    element: <ManageStudent />,
  },
];
