import { RouteObject } from "react-router-dom";
import { LandingContainer } from "../Pages/landing";
import { DesingerReserveContainer } from "../Pages/desingerreserve";
import { ModelLogin, DesignerLogin } from "../Pages/login";
import { RegisterModel, RegisterDesigner } from "../Pages/register";
import { DesignerPageContainer } from "../Pages/designerpage";
import { DesignerProfileContainer } from "../Pages/designerprofile";
import { DesignerProductContainer } from "../Pages/designerproduct";
import { DesingerAcceptContainer } from "../Pages/designeraccept";
import { DesingerFinalContainer } from "../Pages/designerfinal";
import { MypageContainer } from "../Pages/model/mypage";
import { ModelLandingContainer } from "../Pages/model/landing";

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
    path: "model/register",
    element: <RegisterModel />,
  },
  {
    path: "designer/register",
    element: <RegisterDesigner />,
  },
  {
    path: "desingerreserve",
    element: <DesingerReserveContainer />,
  },
  {
    path: "model/login",
    element: <ModelLogin />,
  },
  {
    path: "designer/login",
    element: <DesignerLogin />,
  },
  {
    path: "designerpage", // 애견 디자이너 페이지 경로
    element: <DesignerPageContainer />,
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
  {
    path: "/model/mypage",
    element: <MypageContainer />,
  },
  {
    path: "/model/landing",
    element: <ModelLandingContainer />,
  }
];
