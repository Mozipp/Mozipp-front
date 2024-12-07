import React, { useState, useEffect } from 'react';
import DesignerFinalPresentation from './DesignerFinalPresentation';
import { getReservationRequests } from '../../../Apis/designer/DesignerApi';

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

const DesignerFinalContainer: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);

  // API 호출 및 데이터 매핑
  const fetchReservations = async () => {
    try {
      const response = await getReservationRequests(); // API 호출
      console.log('Fetched reservations:', response);

      const mappedReservations = response.map((reservation: any) => ({
        reservationId: Number(reservation.reservationRequestId), // 문자열 ID를 숫자로 변환
        design: reservation.design || '디자인 정보 없음', // 기본값 설정
        model: {
          title: reservation.model?.title || '제목 없음', // 기본값 설정
          modelDescription: reservation.model?.modelDescription || '설명 없음',
          breed: reservation.model?.breed || '품종 정보 없음',
          petImageUrl: reservation.model?.petImageUrl || undefined,
          reviews: reservation.model?.reviews?.map((review: any) => ({
            reviewId: Number(review.reviewId), // 문자열 ID를 숫자로 변환
            reviewContent: review.reviewContent,
            createdAt: review.createdAt,
          })) || [],
        },
        reservationDate: reservation.reservationRequestDate,
        createdAt: reservation.createdAt,
      }));

      setReservations(mappedReservations);
    } catch (error) {
      // console.error('Error fetching reservations:', error);
      // alert('예약 데이터를 가져오는 데 실패했습니다.');
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchReservations();
  }, []);

  // 리뷰쓰기 핸들러
  const handleWriteReview = (reservationId: number) => {
    alert(`리뷰 작성 페이지로 이동합니다. 예약 ID: ${reservationId}`);
  };

  return (
    <DesignerFinalPresentation
      reservations={reservations}
      onWriteReview={handleWriteReview}
    />
  );
};

export default DesignerFinalContainer;
