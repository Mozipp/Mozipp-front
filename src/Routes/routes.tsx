import { RouteObject } from "react-router-dom";
import { LandingContainer } from "../Pages/landing";
export const routes: RouteObject[] = [
   {
      path: "/",
      element: <LandingContainer />,
   },
   {
      path: "*",
      element: <LandingContainer />,
   },
   {
      path: "landing",
      element: <LandingContainer />,
   },
];

