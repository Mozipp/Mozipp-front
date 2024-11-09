import { RouteObject } from "react-router-dom";
import { LandingContainer } from "../Pages/landing";
import { RegisterContainer } from "../Pages/register";
import { DesingerReserveContainer } from "../Pages/desingerreserve";
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
   {
      path: "register",
      element: <RegisterContainer/>,
   },
   {
      path: "desingerreserve",
      element: <DesingerReserveContainer/>,
   },
];

