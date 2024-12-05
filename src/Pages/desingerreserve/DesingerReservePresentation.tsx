import React from 'react';

type Reservation = {
  id: number;
  client: string;
  date: string;
  time: string;
  status: 'pending' | 'accepted' | 'rejected';
};

type DesignerReservePresentationProps = {
  reservations: Reservation[];
  onUpdateStatus: (id: number, status: 'accepted' | 'rejected') => void;
};

const DesignerReservePresentation: React.FC<DesignerReservePresentationProps> = ({ reservations, onUpdateStatus }) => {
  return (
    <div>
      {reservations.map((reservation) => (
        <div key={reservation.id} style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
          <p>고객 이름: {reservation.client}</p>
          <p>예약 날짜: {reservation.date}</p>
          <p>예약 시간: {reservation.time}</p>
          <p>상태: {reservation.status}</p>
          <button onClick={() => onUpdateStatus(reservation.id, 'accepted')}>수락</button>
          <button onClick={() => onUpdateStatus(reservation.id, 'rejected')}>거절</button>
        </div>
      ))}
    </div>
  );
};

export default DesignerReservePresentation;
