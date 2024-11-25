import React from "react";

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
  onCardClick: (section: string) => void; // 클릭 이벤트 핸들러
  renderedContent: React.ReactNode; // 렌더링될 콘텐츠
}

const DesignerPagePresentation: React.FC<DesignerPagePresentationProps> = ({
  campaigns,
  profile,
  onCardClick,
  renderedContent,
}) => {
  const styles = {
    container: {
      display: "flex",
      gap: "20px",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    leftPanel: {
      width: "15%",
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
    renderedContentContainer: {
      marginTop: "20px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#f9f9f9",
    },
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽 패널 */}
      <div style={styles.leftPanel}>
        <div style={styles.profileSection}>
          <img
            src="https://via.placeholder.com/80"
            alt="Profile"
            style={styles.profileImage}
          />
          <div style={styles.profileName}>{profile.username}</div>
          <div style={styles.profileNickname}>{profile.nickname}</div>
        </div>
        <div style={styles.profilePoints}>
          <strong>보유 포인트:</strong> {profile.points}
        </div>
        <div style={styles.buttonsContainer}>
          {/* <div style={styles.button}>환전</div>
          <div style={styles.button}>내역</div> */}
          <div
    style={{
      ...styles.button,
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
    }}
    onClick={() => console.log("상품 리스트 클릭")}
  >
    상품 리스트
  </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div style={styles.mainContent}>
        <div style={styles.header}>My 캠페인 관리</div>
        <div style={styles.campaignList}>
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              style={styles.campaignCard}
              onClick={() => onCardClick(campaign.link)}
            >
              <div>{campaign.title}</div>
            </div>
          ))}
        </div>
        {/* 렌더링된 콘텐츠 */}
        <div style={styles.renderedContentContainer}>{renderedContent}</div>
      </div>
    </div>
  );
};

export default DesignerPagePresentation;
