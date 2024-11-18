import React from 'react';
import {useNavigate} from 'react-router-dom';

const DesignerPagePresentation: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (path: string) => {
    navigate(path);
  }
  const styles = {
    container: {
      textAlign: 'center' as const,
      padding: '20px',
      background: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)',
      minHeight: '100vh',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      fontSize: '48px',
      color: '#ffffff',
      marginBottom: '40px',
      fontWeight: 'bold',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    },
    roundSection: {
      width: '150px',
      height: '150px',
      margin: '20px auto',
      backgroundColor: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    roundText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ff6f61',
    },
    cardGroup: {
      display: 'grid',
      gap: '20px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      justifyContent: 'center',
      padding: '0 20px',
    },
    card: {
      position: 'relative' as const,
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      padding: '20px',
      textAlign: 'center' as const,
      transition: 'transform 0.2s ease',
      cursor: 'pointer',
    },
    cardImage: {
      width: '100px',
      height: '100px',
      margin: '0 auto 10px',
    },
    cardText: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#333333',
    },
    redCard: {
      backgroundColor: '#ff6f61',
      color: '#ffffff',
    },
    yellowCard: {
      backgroundColor: '#ffd700',
      color: '#ffffff',
    },
    blueCard: {
      backgroundColor: '#6495ed',
      color: '#ffffff',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>애견 디자이너 페이지</h1>

      {/* 신고 버튼 */}
      <div style={styles.roundSection}>
        <span style={styles.roundText}>신고</span>
      </div>

      {/* 프로필 등록, 예약 관리 카드 */}
      <div style={styles.cardGroup}>
        <div style={{ ...styles.card, ...styles.redCard }}
        onClick={() => handleNavigate('/designerprofile')}>
          <img
            src="/강아지1.png"
            alt="Red Dog Icon"
            style={styles.cardImage}
          />
          <div style={styles.cardText}>프로필 등록</div>
        </div>
        <div style={{ ...styles.card, ...styles.yellowCard }}
        onClick={() => handleNavigate('/designeraccept')}>
          <img
            src="/강아지2.png"
            alt="Yellow Dog Icon"
            style={styles.cardImage}
          />
          <div style={styles.cardText}>예약 확정 전 예약 관리</div>
        </div>
        <div style={{ ...styles.card, ...styles.blueCard }}
        onClick={() => handleNavigate('/designerfinal')}>
          <img
            src="/강아지3.png"
            alt="Blue Dog Icon"
            style={styles.cardImage}
          />
          <div style={styles.cardText}>예약 확정 후 예약 관리</div>
        </div>
      </div>
    </div>
  );
};

export default DesignerPagePresentation;
