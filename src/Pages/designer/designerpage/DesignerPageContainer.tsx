import React, { useState, useEffect } from "react";
import DesignerPagePresentation from "./DesignerPagePresentation";
import ProfileComponent from "../designerprofile/DesignerProfileContainer"; // 프로필 등록 컴포넌트
import ReservationList from "../designeraccept/DesignerAcceptContainer"; // 예약 리스트 조회 컴포넌트
import FinalReservations from "../designerfinal/DesignerFinalContainer"; // 예약 확정 조회 컴포넌트
import ProductRegistration from "../designerproduct/DesignerProductContainer"; // 상품 등록 컴포넌트
import { useAppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import { getDesignerProfile } from "../../../Apis/designer/DesignerApi"; // API 함수 임포트

const DesignerPageContainer: React.FC = () => {
  const [renderedContent, setRenderedContent] = useState<React.ReactNode>(null);
  const [profile, setProfile] = useState({
    name: "", // username 제거하고 name만 유지
  });
  const { logout } = useAppContext();
  const navigate = useNavigate();

  // 캠페인 카드 데이터
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

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  // 클릭 이벤트 핸들러: 클릭된 카드에 따라 적절한 컴포넌트를 렌더링
  const handleCardClick = (section: string) => {
    switch (section) {
      case "profile":
        setRenderedContent(<ProfileComponent />);
        break;
      case "product":
        setRenderedContent(<ProductRegistration />);
        break;
      case "reservations":
        setRenderedContent(<ReservationList />);
        break;
      case "final-reservations":
        setRenderedContent(<FinalReservations />);
        break;
      default:
        setRenderedContent(null);
    }
  };

  // API 호출 및 프로필 상태 업데이트
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getDesignerProfile();
        if (response.success && response.data) {
          const { name } = response.data; // name만 추출
          setProfile({
            name: name || "No Name", // 필요한 값만 설정
          });
        } else {
          console.error("Failed to fetch profile:", response.error);
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <DesignerPagePresentation
      campaigns={campaigns}
      profile={profile} // name만 전달
      onCardClick={handleCardClick}
      renderedContent={renderedContent}
      handleLogoutClick={handleLogoutClick}
      handleHomeClick={handleHomeClick}
    />
  );
};

export default DesignerPageContainer;
