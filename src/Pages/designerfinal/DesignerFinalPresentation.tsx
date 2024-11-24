import React from 'react';

interface Reservation {
  reservationId: number;
  design: string;
  model: {
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
}

const DesignerFinalPresentation: React.FC<DesignerFinalPresentationProps> = ({
  reservations,
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
    card: (isExpired: boolean) => ({
      background: isExpired ? '#f4f4f4' : '#fff',
      borderRadius: '15px',
      padding: '20px',
      marginBottom: '15px',
      boxShadow: isExpired
        ? '0 4px 6px rgba(0, 0, 0, 0.05)'
        : '0 4px 6px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      gap: '20px',
      opacity: isExpired ? 0.8 : 1, // 종료된 예약은 반투명 처리
      position: 'relative' as const,
      border: isExpired ? '2px solid #ccc' : 'none', // 종료된 예약에 회색 테두리 추가
    }),
    expiredLabel: {
      position: 'absolute' as const,
      top: '10px',
      right: '10px',
      background: '#ff6666',
      color: '#fff',
      padding: '5px 10px',
      borderRadius: '10px',
      fontSize: '12px',
      fontWeight: 'bold',
    },
    image: {
      width: '120px',
      height: '120px',
      borderRadius: '15px',
      objectFit: 'cover' as const,
      background: '#eee',
    },
    content: {
      flex: 1,
    },
    details: {
      marginBottom: '10px',
    },
    reviews: {
      marginTop: '10px',
      fontSize: '14px',
      color: '#555',
    },
    reviewItem: {
      marginTop: '5px',
    },
  };

  // Helper function to check if reservation is expired
  const isExpired = (reservationDate: string) => {
    const today = new Date();
    const reservationDay = new Date(reservationDate);
    return reservationDay < today; // 예약일이 오늘보다 이전이면 종료된 예약
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>확정된 예약 리스트</h1>
      {reservations.map((reservation) => (
        <div
          key={reservation.reservationId}
          style={styles.card(isExpired(reservation.reservationDate))}
        >
          {isExpired(reservation.reservationDate) && (
            <div style={styles.expiredLabel}>종료된 예약</div>
          )}
          <img
            src={reservation.model.petImageUrl || '/default-dog.png'}
            alt={reservation.model.breed}
            style={styles.image}
          />
          <div style={styles.content}>
            <h3>{reservation.design}</h3>
            <p style={styles.details}>
              <strong>품종:</strong> {reservation.model.breed}
            </p>
            <p style={styles.details}>
              <strong>예약일:</strong>{' '}
              {new Date(reservation.reservationDate).toLocaleDateString()}
            </p>
            <p style={styles.details}>
              <strong>설명:</strong> {reservation.model.modelDescription}
            </p>
            <div style={styles.reviews}>
              <strong>리뷰:</strong>
              {reservation.model.reviews.length > 0 ? (
                reservation.model.reviews.map((review) => (
                  <div key={review.reviewId} style={styles.reviewItem}>
                    - {review.reviewContent} ({new Date(review.createdAt).toLocaleDateString()})
                  </div>
                ))
              ) : (
                <p>리뷰가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DesignerFinalPresentation;
