import React from "react";
import { useNavigate } from "react-router-dom";

// 타입 정의
interface Campaign {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface ProfileInfo {
  username: string;
  nickname: string;
  points: string;
  notifications: string;
  inquiries: string;
}

interface DesignerPagePresentationProps {
  campaigns: Campaign[];
  profile: ProfileInfo;
  onCardClick: (section: string) => void; // 상태 업데이트 함수
  renderedContent: React.ReactNode; // 동적으로 렌더링될 콘텐츠
}

// 스타일 정의
const styles = {
  container: {
    display: "flex",
    gap: "20px",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
  },
  leftPanel: {
    width: "20%",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    fontSize: "14px",
  },
  profileSection: {
    marginBottom: "20px",
  },
  profileImage: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    marginBottom: "10px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  profileName: {
    textAlign: "center" as const,
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  profileNickname: {
    textAlign: "center" as const,
    color: "#888",
    fontSize: "14px",
  },
  profilePoints: {
    marginTop: "15px",
    textAlign: "center" as const,
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginTop: "10px",
  },
  button: {
    padding: "5px 10px",
    border: "1px solid #007bff",
    color: "#007bff",
    borderRadius: "5px",
    fontSize: "12px",
    cursor: "pointer",
    textDecoration: "none",
    textAlign: "center" as const,
  },
  sectionHeader: {
    marginTop: "20px",
    fontWeight: "bold",
    color: "#d9534f",
  },
  notification: {
    backgroundColor: "#ff4d4f",
    color: "white",
    padding: "2px 8px",
    borderRadius: "20px",
    fontSize: "12px",
    marginLeft: "5px",
  },
  inquiries: {
    marginTop: "10px",
    color: "#007bff",
    cursor: "pointer",
  },
  mainContent: {
    width: "75%",
  },
  header: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  campaignList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  campaignCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    textAlign: "center" as const,
    backgroundColor: "#ffffff",
    cursor: "pointer",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
  },
  cardTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  cardDescription: {
    fontSize: "14px",
    color: "#666",
  },
  renderedContentContainer: {
    marginTop: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
};

const DesignerPagePresentation: React.FC<DesignerPagePresentationProps> = ({
  campaigns,
  profile,
  onCardClick,
  renderedContent,
}) => {
  const navigate = useNavigate();

  const handleClick = (link: string) => {
    onCardClick(link); // 클릭 이벤트로 상태 업데이트
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽 패널 */}
      <div style={styles.leftPanel}>
        {/* 프로필 섹션 */}
        <div style={styles.profileSection}>
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            style={styles.profileImage}
          />
          <div style={styles.profileName}>{profile.username}</div>
          <div style={styles.profileNickname}>{profile.nickname}</div>
        </div>
        {/* 포인트 섹션 */}
        <div style={styles.profilePoints}>
          <strong>보유 포인트:</strong> {profile.points}
        </div>
        <div style={styles.buttonsContainer}>
          <div style={styles.button}>환전</div>
          <div style={styles.button}>내역</div>
        </div>
        {/* 캠페인 관리 섹션 */}
        <div style={styles.sectionHeader}>My 캠페인 관리</div>
        <div>
          <span>
            알림
            <span style={styles.notification}>{profile.notifications}</span>
          </span>
        </div>
        <div style={styles.inquiries}>{profile.inquiries}</div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={styles.mainContent}>
        <div style={styles.header}>My 캠페인 관리</div>
        <div style={styles.campaignList}>
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              style={styles.campaignCard}
              onClick={() => handleClick(campaign.link)}
            >
              <div style={styles.cardTitle}>{campaign.title}</div>
              <div style={styles.cardDescription}>{campaign.description}</div>
            </div>
          ))}
        </div>
        {/* 동적으로 렌더링될 콘텐츠 */}
        <div style={styles.renderedContentContainer}>{renderedContent}</div>
      </div>
    </div>
  );
};

export default DesignerPagePresentation;
