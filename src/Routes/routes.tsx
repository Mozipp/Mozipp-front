import { RouteObject } from "react-router-dom";
import { LandingContainer } from "../Pages/landing";
import { DesingerReserveContainer } from "../Pages/designer/desingerreserve";
import { ModelLogin, DesignerLogin } from "../Pages/login";
import { RegisterModel, RegisterDesigner } from "../Pages/register";
import { DesignerPageContainer } from "../Pages/designer/designerpage";
import { DesignerProfileContainer } from "../Pages/designer/designerprofile";
import { DesignerProductContainer } from "../Pages/designer/designerproduct";
import { DesignerAcceptContainer } from "../Pages/designer/designeraccept";
import { DesignerFinalContainer } from "../Pages/designer/designerfinal";
import { MypageContainer } from "../Pages/model/mypage";
import { ModelLandingContainer } from "../Pages/model/landing";
import { ModelEditContainer } from "../Pages/model/edit";

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
    element: <DesignerAcceptContainer />,
  },
  {
    path: "designerfinal",
    element: <DesignerFinalContainer />,
  },
  {
    path: "/model/mypage",
    element: <MypageContainer />,
  },
  {
    path: "/model/landing",
    element: <ModelLandingContainer />,
  },
  {
    path: "/model/edit",
    element: <ModelEditContainer />,
  },
];
