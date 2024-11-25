import React, { useState } from 'react';
import DesignerAcceptPresentation from './DesignerAcceptPresentation';
import { getReservationRequests, registerDesignerProfile } from '../../../Apis/designer/DesignerApi';
import { getMyProducts } from '../../../Apis/product/ProductApi';

// Define example data with proper types
type ReservationRequest = {
  reservationRequestId: number;
  reservationRequestStatus: string;
  model: {
    modelDescription: string;
    petName: string;
    petAge: number;
    petGender: string;
    breed: string;
    petImageUrl?: string;
  };
  reservationRequestDate: string;
  createdAt: string;
};

const exampleData: {
  PENDING: ReservationRequest[];
  ACCEPTED: ReservationRequest[];
  REJECTED: ReservationRequest[];
} = {
  PENDING: [
    {
      reservationRequestId: 1,
      reservationRequestStatus: 'PENDING',
      model: {
        modelDescription: '귀여운 강아지입니다.',
        petName: '구름이',
        petAge: 2,
        petGender: 'FEMALE',
        breed: '말티즈',
        petImageUrl: '/강아지1.png',
      },
      reservationRequestDate: '2024-11-20T10:00:00',
      createdAt: '2024-11-18T16:05:02',
    },
  ],
  ACCEPTED: [
    {
      reservationRequestId: 2,
      reservationRequestStatus: 'ACCEPTED',
      model: {
        modelDescription: '밝고 활발한 강아지입니다.',
        petName: '별이',
        petAge: 4,
        petGender: 'MALE',
        breed: '푸들',
        petImageUrl: '/강아지2.png',
      },
      reservationRequestDate: '2024-11-19T14:00:00',
      createdAt: '2024-11-18T16:00:00',
    },
  ],
  REJECTED: [
    {
      reservationRequestId: 3,
      reservationRequestStatus: 'REJECTED',
      model: {
        modelDescription: '조용하고 차분한 강아지입니다.',
        petName: '몽이',
        petAge: 3,
        petGender: 'FEMALE',
        breed: '시바견',
        petImageUrl: '/강아지3.png',
      },
      reservationRequestDate: '2024-11-18T12:00:00',
      createdAt: '2024-11-17T15:00:00',
    },
  ],
};

const DesignerAcceptContainer: React.FC = () => {
  const [filter, setFilter] = useState<'PENDING' | 'ACCEPTED' | 'REJECTED'>(
    'PENDING'
  ); // Restrict filter type
  const [requests, setRequests] = useState<ReservationRequest[]>(exampleData[filter]);

  const handleAction = (id: number, action: 'ACCEPTED' | 'REJECTED') => {
    alert(`요청 ID ${id}가 ${action === 'ACCEPTED' ? '수락' : '거절'}되었습니다.`);
    setRequests((prev) =>
      prev.filter((request) => request.reservationRequestId !== id)
    );
  };

  const handleFilterChange = (newFilter: 'PENDING' | 'ACCEPTED' | 'REJECTED') => {
    setFilter(newFilter);
    setRequests(exampleData[newFilter]);
  };

  return (
    <DesignerAcceptPresentation
      requests={requests}
      filter={filter}
      setFilter={handleFilterChange}
      onAction={handleAction}
    />
  );
};

export default DesignerAcceptContainer;
