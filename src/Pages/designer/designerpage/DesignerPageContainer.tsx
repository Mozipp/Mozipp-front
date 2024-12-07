import React, { useState } from "react";
import DesignerPagePresentation from "./DesignerPagePresentation";
import ProfileComponent from "../designerprofile/DesignerProfileContainer"; // 프로필 등록 컴포넌트
import ReservationList from "../designeraccept/DesignerAcceptContainer"; // 예약 리스트 조회 컴포넌트
import FinalReservations from "../designerfinal/DesignerFinalContainer"; // 예약 확정 조회 컴포넌트
import ProductRegistration from "../designerproduct/DesignerProductContainer"; // 상품 등록 컴포넌트
import { useAppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";

const DesignerPageContainer: React.FC = () => {
  // 동적으로 렌더링될 컴포넌트를 관리하는 상태
  const [renderedContent, setRenderedContent] = useState<React.ReactNode>(null);
  const { logout }= useAppContext();
  const navigate = useNavigate();

  // 프로필 정보와 캠페인 카드 데이터
  const profile = {
    username: "gkstmddnjs111",
    nickname: "vene",
    points: "0P",
    notifications: "N",
    inquiries: "1:1 문의",
  };

  const campaigns = [
    {
      id: 1,
      title: "프로필 등록",
      description: "프로필 정보를 등록하세요.",
      link: "profile",
    },
    {
      id: 2,
      title: "상품 등록",
      description: "새로운 상품을 등록하세요.",
      link: "product",
    },
    {
      id: 3,
      title: "예약 리스트 조회",
      description: "예약 내역을 확인하세요.",
      link: "reservations",
    },
    {
      id: 4,
      title: "예약 확정 조회",
      description: "확정된 예약을 확인하세요.",
      link: "final-reservations",
    },
  ];

  const handleLogoutClick=()=>
  {
    logout();
    navigate("/");
  }

  // 클릭 이벤트 핸들러: 클릭된 카드에 따라 적절한 컴포넌트를 렌더링
  const handleCardClick = (section: string) => {
    switch (section) {
      case "profile":
        setRenderedContent(<ProfileComponent />); // 프로필 등록 컴포넌트 렌더링
        break;
      case "product":
        setRenderedContent(<ProductRegistration />); // 상품 등록 컴포넌트 렌더링
        break;
      case "reservations":
        setRenderedContent(<ReservationList />); // 예약 리스트 조회 컴포넌트 렌더링
        break;
      case "final-reservations":
        setRenderedContent(<FinalReservations />); // 예약 확정 조회 컴포넌트 렌더링
        break;
      default:
        setRenderedContent(null); // 기본적으로 아무것도 렌더링하지 않음
    }
  };

  return (
    <DesignerPagePresentation
      campaigns={campaigns}
      profile={profile}
      onCardClick={handleCardClick}
      renderedContent={renderedContent}
      handleLogoutClick={handleLogoutClick}
    />
  );
};

export default DesignerPageContainer;
