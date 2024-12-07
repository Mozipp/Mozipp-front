import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, HStack, Button } from "@chakra-ui/react";

interface Campaign {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface ProfileInfo {
  name: string;
}

interface DesignerPagePresentationProps {
  campaigns: Campaign[];
  profile: ProfileInfo;
  onCardClick: (section: string) => void; // 클릭 이벤트 핸들러
  renderedContent: React.ReactNode; // 렌더링될 콘텐츠
  handleLogoutClick: () => void;
  handleHomeClick: () => void;
}

const DesignerPagePresentation: React.FC<DesignerPagePresentationProps> = (
  props
) => {
  const navigate = useNavigate(); // 페이지 이동용 navigate 함수

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
    buttonsContainer: {
      display: "flex",
      flexDirection: "column" as const,
      justifyContent: "center",
      gap: "10px",
      marginTop: "10px",
    },
    button: {
      padding: "10px",
      border: "1px solid #ddd",
      color: "#333",
      borderRadius: "5px",
      fontSize: "14px",
      cursor: "pointer",
      textAlign: "center" as const,
      backgroundColor: "#fff",
      transition: "background-color 0.2s, color 0.2s",
    },
    buttonHover: {
      backgroundColor: "#f5f5f5",
      color: "#000",
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
    <Box bgColor="#F0F4F8" width="100%" minHeight="100vh">
      {/* 상단바 */}
      <Box
        width="100%"
        bgColor="#2C3E50"
        padding="1rem"
        color="white"
        position="fixed"
        top="0"
        zIndex="10"
      >
        <HStack justifyContent="space-between" maxWidth="1200px" mx="auto">
          <Text
            fontSize="xl"
            fontWeight="bold"
            cursor="pointer"
            onClick={props.handleHomeClick}
          >
            Mozip
          </Text>
        </HStack>
      </Box>

      {/* 새로운 콘텐츠 섹션 */}
      <Box mt="5rem" padding="1rem">
        <div style={styles.container}>
          {/* 왼쪽 패널 */}
          <div style={styles.leftPanel}>
            <div style={styles.profileSection}>
              <img
                src="https://via.placeholder.com/80"
                alt="Profile"
                style={styles.profileImage}
              />
              <div style={styles.profileName}>{props.profile.name}</div>
            </div>
            <div style={styles.buttonsContainer}>
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.buttonHover)
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, styles.button)
                }
                onClick={() => navigate("/model/landing")} // 리스트 보기 버튼 클릭 시 페이지 이동
              >
                리스트 보기
              </button>
              <button
                style={styles.button}
                onMouseEnter={(e) =>
                  Object.assign(e.currentTarget.style, styles.buttonHover)
                }
                onMouseLeave={(e) =>
                  Object.assign(e.currentTarget.style, styles.button)
                }
                onClick={() => props.handleLogoutClick()}
              >
                로그아웃
              </button>
            </div>
          </div>

          {/* 메인 콘텐츠 */}
          <div style={styles.mainContent}>
            <div style={styles.header}>My 캠페인 관리</div>
            <div style={styles.campaignList}>
              {props.campaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  style={styles.campaignCard}
                  onClick={() => props.onCardClick(campaign.link)}
                >
                  <div>{campaign.title}</div>
                </div>
              ))}
            </div>
            <div style={styles.renderedContentContainer}>
              {props.renderedContent}
            </div>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default DesignerPagePresentation;
