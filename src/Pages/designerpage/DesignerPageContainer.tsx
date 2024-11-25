import React, { useState } from "react";
import DesignerPagePresentation from "./DesignerPagePresentation";
import ReservationList from "./ReservationList"; // 예약 리스트 컴포넌트
import ReservationConfirmed from "./ReservationConfirmed"; // 예약 확정 컴포넌트
import ProfileForm from "./ProfileForm"; // 프로필 등록 컴포넌트

const DesignerPageContainer: React.FC = () => {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const handleCardClick = (section: string) => {
    setActiveComponent(section);
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <ProfileForm />;
      case "reservationList":
        return <ReservationList />;
      case "reservationConfirmed":
        return <ReservationConfirmed />;
      default:
        return <div>아래에서 원하는 메뉴를 선택해주세요.</div>;
    }
  };

  const campaigns = [
    { id: 1, title: "프로필 등록", description: "프로필 정보를 등록하세요.", link: "profile" },
    { id: 2, title: "예약 리스트 조회", description: "예약 내역을 확인하세요.", link: "reservationList" },
    { id: 3, title: "예약 확정 조회", description: "확정된 예약을 확인하세요.", link: "reservationConfirmed" },
  ];

  const profile = {
    username: "gkstmddnjs111",
    nickname: "vene",
    points: "0P",
    notifications: "N",
    inquiries: "1:1 문의",
  };

  return (
    <DesignerPagePresentation
      campaigns={campaigns}
      profile={profile}
      onCardClick={handleCardClick} // 클릭 이벤트 전달
      renderedContent={renderComponent()} // 동적 렌더링 콘텐츠 전달
    />
  );
};

export default DesignerPageContainer;
