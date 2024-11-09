import React, { useState } from 'react';
import DesignerReservePresentation from './DesignerReservePresentation';

// 초기 예약 데이터 예시
const initialDesignerReservations = [
  { id: 1, client: '김철수', date: '2024-10-10', time: '13:00', status: 'pending' },
  { id: 2, client: '이영희', date: '2024-10-10', time: '16:00', status: 'pending' },
  { id: 3, client: '박민수', date: '2024-10-11', time: '09:00', status: 'pending' },
];

const DesignerReserveContainer = () => {
  const [reservations, setReservations] = useState(initialDesignerReservations);

  // 예약 상태 업데이트 함수
  const handleUpdateStatus = (id: number, status: 'accepted' | 'rejected') => {
    const updatedReservations = reservations.map((reservation) =>
      reservation.id === id ? { ...reservation, status } : reservation
    );
    setReservations(updatedReservations);
  };

  return (
    <div>
      <h1>디자이너 예약 리스트</h1>
      {/* Presentation 컴포넌트에 데이터 전달 */}
      <DesignerReservePresentation reservations={reservations} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
};

export default DesignerReserveContainer;
