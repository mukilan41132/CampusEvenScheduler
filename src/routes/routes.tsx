import CreateStudent from "../pages/admin/create-student";
import Dashbord from "../pages/Dashbord/Dashbord";
import ManageStudent from "../pages/admin/manage-student";

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
    path: "/createstudent",
    element: <CreateStudent />,
  },
  {
    path: "/manage-students",
    element: <ManageStudent />,
  },
];
