import Dashbord from "../pages/Dashbord/Dashbord";
import ManageStudent from "../pages/admin/manage-student";

import ManageEvents from "../pages/admin/manage-events";
import ErrorBoundary from "../Error/ErrorBoundary";
 

export interface AppRoute {
  path: string;
  element: React.ReactNode;
  role?: "admin" | "faculty" | "student";
}

export const routesConfig: AppRoute[] = [
  {
    path: "/dashboard",
    element: (
      <ErrorBoundary>
        <Dashbord />
      </ErrorBoundary>
    ),
  },

  {
    path: "/manage-events",
    element: (
      <ErrorBoundary>
        {" "}
        <ManageEvents />
      </ErrorBoundary>
    ),
  },
  {
    path: "/manage-students",
    element: (
      <ErrorBoundary>
        <ManageStudent />
      </ErrorBoundary>
    ),
  },
];
