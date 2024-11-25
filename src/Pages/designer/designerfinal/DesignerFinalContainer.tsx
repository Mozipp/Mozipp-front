import React, { useState } from 'react';
import DesignerFinalPresentation from './DesignerFinalPresentation';

const exampleData = [
  {
    reservationId: 1,
    design: '귀여운 컷',
    model: {
      modelDescription: '귀여운 강아지 스타일로 잘 다듬어주세요.',
      breed: '말티즈',
      petImageUrl: '/강아지1.png',
      reviews: [
        {
          reviewId: 1,
          reviewContent: '정말 만족스러운 서비스였습니다!',
          createdAt: '2024-11-17T15:00:00',
        },
        {
          reviewId: 2,
          reviewContent: '강아지가 편안해했어요.',
          createdAt: '2024-11-18T16:00:00',
        },
      ],
    },
    reservationStatus: 'CONFIRMED',
    reservationDate: '2024-11-15T10:00:00',
    createdAt: '2024-11-18T16:05:02',
  },
  {
    reservationId: 2,
    design: '깔끔한 스타일',
    model: {
      modelDescription: '단정하고 깔끔하게 부탁드려요.',
      breed: '푸들',
      petImageUrl: '/강아지2.png',
      reviews: [],
    },
    reservationStatus: 'CONFIRMED',
    reservationDate: '2024-11-21T14:00:00',
    createdAt: '2024-11-19T11:00:00',
  },
];

const DesignerFinalContainer: React.FC = () => {
  const [reservations] = useState(exampleData); // 예시 데이터 사용

  return <DesignerFinalPresentation reservations={reservations} />;
};

export default DesignerFinalContainer;
