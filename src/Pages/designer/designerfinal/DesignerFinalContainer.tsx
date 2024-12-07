import React, { useState, useEffect } from "react";
import DesignerFinalPresentation from "./DesignerFinalPresentation";
import { getReservationRequests, addDesignerReview, getConfirmedReservations, updatefinalReservationStatus } from "../../../Apis/designer/DesignerApi";

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
interface ConfirmedReservation {
  reservationId: number;
  design: string;
  model: {
    modelDescription: string;
    petName: string;
    petAge: number;
    petGender: string;
    breed: string;
    petImageUrl: string;
    reviews: [
      {
        reviewId: string;
        reviewContent: string;
        createdAt: string;
      }
    ]
  }
  reservationStatus: string;
  reservationRequestDate: string;
  createdAt: string;
}

const DesignerFinalContainer: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리
  const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 관리
  const [currentReservationId, setCurrentReservationId] = useState<number | null>(null); // 현재 리뷰 작성 중인 예약 ID
  const [confirmedReservations, setConfirmedReservations] = useState<ConfirmedReservation[]>([]);

  const fetchConfirmedReservations = async () => {
    try {
      const reservations = await getConfirmedReservations();
      setConfirmedReservations(reservations); // 상태에 저장
      console.log("Fetched Confirmed Reservations:", reservations);
    } catch (error) {
      console.error("Error fetching confirmed reservations:", error);
    }
  };

  const handleComplete = async (reservationId:number) =>
  {
    try{
      const response= await updatefinalReservationStatus(reservationId, "COMPLETED");
      fetchConfirmedReservations();
    }
    catch(error){
      console.error("Error Completed", error);
    }
  }
  // API 호출 및 데이터 매핑
  // 

  // const fetchReservations = async () => {
  //   try {
  //     const response = await getReservationRequests();
  //     if (response.isSuccess) {
  //       const mappedReservations = response.result.map((reservation) => ({
  //         reservationId: Number(reservation.reservationRequestId),
  //         design: reservation.model?.modelDescription || "디자인 정보 없음",
  //         model: {
  //           title: reservation.model?.petName || "제목 없음",
  //           modelDescription: reservation.model?.modelDescription || "설명 없음",
  //           breed: reservation.model?.breed || "품종 정보 없음",
  //           petImageUrl: reservation.model?.petImageUrl || "",
  //           reviews: reservation.model?.reviews || [],
  //         },
  //         reservationDate: reservation.reservationRequestDate,
  //         createdAt: reservation.createdAt,
  //       }));
  //       setReservations(mappedReservations);
  //     } else {
  //       console.error("Error fetching reservations:", response.message);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching reservations:", error);
  //   }
  // };


  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    //fetchReservations();
    fetchConfirmedReservations();
  }, []);

  // 리뷰쓰기 버튼 클릭 핸들러
  const handleWriteReview = (reservationId: number) => {
    setCurrentReservationId(reservationId); // 현재 예약 ID 설정
    setShowPopup(true); // 팝업 열기
  };

  // 리뷰 제출 핸들러
  const handleSubmitReview = async () => {
    if (!reviewContent || currentReservationId === null) {
      alert("리뷰 내용을 입력해주세요.");
      return;
    }

    try {
      await addDesignerReview(currentReservationId, reviewContent); // API 호출
      alert("리뷰가 성공적으로 작성되었습니다!");
      setShowPopup(false); // 팝업 닫기
      setReviewContent(""); // 리뷰 내용 초기화
      setCurrentReservationId(null); // 예약 ID 초기화
      fetchConfirmedReservations();
      //fetchReservations(); // 리뷰 업데이트 후 데이터 새로 가져오기
    } catch (error) {
      console.error("리뷰 작성 실패:", error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  return (
    <>
      <DesignerFinalPresentation
        reservations={reservations}
        onWriteReview={handleWriteReview}
        confirmedReservations={confirmedReservations}
        onCompleteTreatment={handleComplete}
      />

      {showPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popup}>
            <h3>리뷰 작성</h3>
            <textarea
              value={reviewContent}
              onChange={(e) => setReviewContent(e.target.value)}
              placeholder="리뷰 내용을 입력하세요..."
              style={styles.textarea}
            />
            <div style={styles.buttonGroup}>
              <button style={styles.submitButton} onClick={handleSubmitReview}>
                제출
              </button>
              <button
                style={styles.cancelButton}
                onClick={() => setShowPopup(false)}
              >
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const styles = {
  popupOverlay: {
    position: "fixed" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
  },
  textarea: {
    width: "100%",
    height: "100px",
    marginBottom: "15px",
    borderRadius: "5px",
    padding: "10px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "space-between",
  },
  submitButton: {
    backgroundColor: "#4caf50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  cancelButton: {
    backgroundColor: "#f44336",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default DesignerFinalContainer;   