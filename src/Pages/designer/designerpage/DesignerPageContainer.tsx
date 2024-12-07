import React, { useState, useEffect } from "react";
import DesignerPagePresentation from "./DesignerPagePresentation";
import ProfileComponent from "../designerprofile/DesignerProfileContainer";
import ReservationList from "../designeraccept/DesignerAcceptContainer";
import FinalReservations from "../designerfinal/DesignerFinalContainer";
import ProductRegistration from "../designerproduct/DesignerProductContainer";
import DesignerPortfolio from "../designerportfolio/DesignerPortfolioContainer"; // 포트폴리오 추가
import { useAppContext } from "../../../AppContext";
import { useNavigate } from "react-router-dom";
import { getDesignerProfile } from "../../../Apis/designer/DesignerApi";

const DesignerPageContainer: React.FC = () => {
  const [renderedContent, setRenderedContent] = useState<React.ReactNode>(null);
  const [profile, setProfile] = useState({
    name: "",
  });
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const campaigns = [
    { id: 1, title: "프로필 등록", description: "프로필 정보를 등록하세요.", link: "profile" },
    { id: 2, title: "상품 등록", description: "새로운 상품을 등록하세요.", link: "product" },
    { id: 3, title: "예약 리스트 조회", description: "예약 내역을 확인하세요.", link: "reservations" },
    { id: 4, title: "예약 확정 조회", description: "확정된 예약을 확인하세요.", link: "final-reservations" },
    { id: 5, title: "포트폴리오", description: "포트폴리오를 확인하세요.", link: "portfolio" }, // 포트폴리오 추가
  ];

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

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
      case "portfolio": // 포트폴리오 추가
        setRenderedContent(<DesignerPortfolio />);
        break;
      default:
        setRenderedContent(null);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getDesignerProfile();
        if (response.isSuccess) {
          const { name } = response.result;
          setProfile({ name });
        } else {
          console.error("Failed to fetch profile:", response.message);
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
      profile={profile}
      onCardClick={handleCardClick}
      renderedContent={renderedContent}
      handleLogoutClick={handleLogoutClick}
      handleHomeClick={handleHomeClick}
    />
  );
};

export default DesignerPageContainer;
