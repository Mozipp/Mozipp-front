import React from 'react';

interface Reservation {
  reservationId: number;
  design: string;
  model: {
    title: string;
    modelDescription: string;
    breed: string;
    petImageUrl?: string;
    reviews: Array<{
      reviewId: number;
      reviewContent: string;
      createdAt: string;
    }>;
  };
  reservationDate: string;
  createdAt: string;
}

interface DesignerFinalPresentationProps {
  reservations: Reservation[];
  onWriteReview: (reservationId: number) => void; // 리뷰쓰기 버튼 클릭 핸들러
}

const DesignerFinalPresentation: React.FC<DesignerFinalPresentationProps> = ({
  reservations,
  onWriteReview,
}) => {
  const styles = {
    container: {
      maxWidth: '1000px',
      margin: '50px auto',
      padding: '30px',
      background: 'linear-gradient(135deg, #f9f7f7, #dbe2ef)',
      borderRadius: '30px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      fontFamily: '"Arial", sans-serif',
    },
    header: {
      textAlign: 'center' as const,
      fontSize: '36px',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#333',
    },
    card: (isExpired: boolean) => (isExpired ? {
      background: '#f4f4f4',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column' as const,
      opacity: 0.8,
      position: 'relative' as const,
      border: '2px solid #ccc',
    } : {
      background: '#fff',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      flexDirection: 'column' as const,
      position: 'relative' as const,
    }),
    content: {
      flex: 1,
    },
    details: {
      marginBottom: '10px',
    },
    reviewButton: {
      marginTop: '15px',
      padding: '10px',
      backgroundColor: '#4caf50',
      color: '#fff',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>확정된 예약 리스트</h1>
      {reservations.map((reservation) => (
        <div
          key={reservation.reservationId}
          style={styles.card(false)}
        >
          <div style={styles.content}>
            <h3>{reservation.design || '디자인 정보 없음'}</h3>
            <p style={styles.details}>
              <strong>제목:</strong> {reservation.model.title || '제목 없음'}
            </p>
            <p style={styles.details}>
              <strong>품종:</strong> {reservation.model.breed || '품종 정보 없음'}
            </p>
            <p style={styles.details}>
              <strong>예약일:</strong>{' '}
              {new Date(reservation.reservationDate).toLocaleDateString()}
            </p>
            <p style={styles.details}>
              <strong>설명:</strong> {reservation.model.modelDescription || '설명 없음'}
            </p>
            <button
              style={styles.reviewButton}
              onClick={() => onWriteReview(reservation.reservationId)}
            >
              리뷰쓰기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignerFinalPresentation;
