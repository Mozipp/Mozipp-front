import { RouteObject } from "react-router-dom";
import { LandingContainer } from "../Pages/landing";
import { RegisterContainer } from "../Pages/register";
import { DesingerReserveContainer } from "../Pages/desingerreserve";
import { CustomerLogin, DesignerLogin } from "../Pages/login";
import { DesingerPageContainer } from "../Pages/designerpage";
import { DesignerProfileContainer } from "../Pages/designerprofile";
import { DesignerProductContainer } from "../Pages/designerproduct";
import { DesingerAcceptContainer } from "../Pages/designeraccept";
import { DesingerFinalContainer } from "../Pages/designerfinal";

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
    element: <RegisterContainer />,
  },
  {
    path: "desingerreserve",
    element: <DesingerReserveContainer />,
  },
  {
    path: "customer/login",
    element: <CustomerLogin />,
  },
  {
    path: "designer/login",
    element: <DesignerLogin />,
  },
  {
    path: "designerpage", // 애견 디자이너 페이지 경로
    element: <DesingerPageContainer />,
  },
  {
    path: "designerprofile",
    element: <DesignerProfileContainer />,
  },
  {
    path: "designerproduct",
    element: <DesignerProductContainer />,
  },
  {
    path: "designeraccept",
    element: <DesingerAcceptContainer />,
  },
  {
    path: "designerfinal",
    element: <DesingerFinalContainer />,
  },
];
