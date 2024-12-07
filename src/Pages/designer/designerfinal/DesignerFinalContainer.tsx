
// import React, { useState } from "react";
// import DesignerFinalPresentation from "./DesignerFinalPresentation";

// interface Reservation {
//   reservationId: number;
//   design: string;
//   model: {
//     title: string;
//     modelDescription: string;
//     breed: string;
//     petImageUrl?: string;
//     reviews: Array<{
//       reviewId: number;
//       reviewContent: string;
//       createdAt: string;
//     }>;
//   };
//   reservationDate: string;
//   createdAt: string;
// }

// const DesignerFinalContainer: React.FC = () => {
//   // 더미 데이터
//   const dummyReservations: Reservation[] = [
//     {
//       reservationId: 1,
//       design: "강아지 미용 스타일 1",
//       model: {
//         title: "검정색 푸들 미용 요청",
//         modelDescription: "푸들 스타일로 잘 다듬어주세요.",
//         breed: "푸들",
//         petImageUrl: "/images/poodle1.png",
//         reviews: [],
//       },
//       reservationDate: "2024-12-20T10:00:00",
//       createdAt: "2024-12-01T12:00:00",
//     },
//     {
//       reservationId: 2,
//       design: "강아지 미용 스타일 2",
//       model: {
//         title: "하얀색 말티즈 미용 요청",
//         modelDescription: "말티즈 스타일로 잘 다듬어주세요.",
//         breed: "말티즈",
//         petImageUrl: "/images/maltese1.png",
//         reviews: [],
//       },
//       reservationDate: "2024-12-22T11:00:00",
//       createdAt: "2024-12-02T13:00:00",
//     },
//   ];

//   const [reservations, setReservations] = useState<Reservation[]>(dummyReservations);
//   const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리
//   const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 관리
//   const [currentReservationId, setCurrentReservationId] = useState<number | null>(null); // 현재 리뷰 작성 중인 예약 ID

//   // 리뷰쓰기 버튼 클릭 핸들러
//   const handleWriteReview = (reservationId: number) => {
//     setCurrentReservationId(reservationId); // 현재 예약 ID 설정
//     setShowPopup(true); // 팝업 열기
//   };

//   // 리뷰 제출 핸들러
//   const handleSubmitReview = () => {
//     if (!reviewContent || currentReservationId === null) {
//       alert("리뷰 내용을 입력해주세요.");
//       return;
//     }

//     // 더미 데이터를 업데이트하여 리뷰 추가
//     setReservations((prevReservations) =>
//       prevReservations.map((reservation) =>
//         reservation.reservationId === currentReservationId
//           ? {
//               ...reservation,
//               model: {
//                 ...reservation.model,
//                 reviews: [
//                   ...reservation.model.reviews,
//                   {
//                     reviewId: reservation.model.reviews.length + 1,
//                     reviewContent,
//                     createdAt: new Date().toISOString(),
//                   },
//                 ],
//               },
//             }
//           : reservation
//       )
//     );

//     alert("리뷰가 성공적으로 작성되었습니다!");
//     setShowPopup(false); // 팝업 닫기
//     setReviewContent(""); // 리뷰 내용 초기화
//     setCurrentReservationId(null); // 예약 ID 초기화
//   };

//   return (
//     <>
//       <DesignerFinalPresentation
//         reservations={reservations}
//         onWriteReview={handleWriteReview}
//       />

//       {showPopup && (
//         <div style={styles.popupOverlay}>
//           <div style={styles.popup}>
//             <h3>리뷰 작성</h3>
//             <textarea
//               value={reviewContent}
//               onChange={(e) => setReviewContent(e.target.value)}
//               placeholder="리뷰 내용을 입력하세요..."
//               style={styles.textarea}
//             />
//             <div style={styles.buttonGroup}>
//               <button style={styles.submitButton} onClick={handleSubmitReview}>
//                 제출
//               </button>
//               <button
//                 style={styles.cancelButton}
//                 onClick={() => setShowPopup(false)}
//               >
//                 취소
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const styles = {
//   popupOverlay: {
//     position: "fixed" as const,
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "100%",
//     backgroundColor: "rgba(0, 0, 0, 0.5)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     zIndex: 1000,
//   },
//   popup: {
//     backgroundColor: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     width: "400px",
//     boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//     textAlign: "center" as const,
//   },
//   textarea: {
//     width: "100%",
//     height: "100px",
//     marginBottom: "15px",
//     borderRadius: "5px",
//     padding: "10px",
//     border: "1px solid #ccc",
//     fontSize: "14px",
//   },
//   buttonGroup: {
//     display: "flex",
//     justifyContent: "space-between",
//   },
//   submitButton: {
//     backgroundColor: "#4caf50",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
//   cancelButton: {
//     backgroundColor: "#f44336",
//     color: "white",
//     padding: "10px 20px",
//     border: "none",
//     borderRadius: "5px",
//     cursor: "pointer",
//   },
// };

// export default DesignerFinalContainer;

















import React, { useState, useEffect } from "react";
import DesignerFinalPresentation from "./DesignerFinalPresentation";
import { getReservationRequests, addDesignerReview } from "../../../Apis/designer/DesignerApi";

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
  const [showPopup, setShowPopup] = useState(false); // 팝업 상태 관리
  const [reviewContent, setReviewContent] = useState(""); // 리뷰 내용 관리
  const [currentReservationId, setCurrentReservationId] = useState<number | null>(null); // 현재 리뷰 작성 중인 예약 ID

  // API 호출 및 데이터 매핑
  const fetchReservations = async () => {
    try {
      const response = await getReservationRequests();
      console.log("Fetched reservations:", response);

      const mappedReservations = response.map((reservation: any) => ({
        reservationId: Number(reservation.reservationRequestId),
        design: reservation.design || "디자인 정보 없음",
        model: {
          title: reservation.model?.title || "제목 없음",
          modelDescription: reservation.model?.modelDescription || "설명 없음",
          breed: reservation.model?.breed || "품종 정보 없음",
          petImageUrl: reservation.model?.petImageUrl || undefined,
          reviews:
            reservation.model?.reviews?.map((review: any) => ({
              reviewId: Number(review.reviewId),
              reviewContent: review.reviewContent,
              createdAt: review.createdAt,
            })) || [],
        },
        reservationDate: reservation.reservationRequestDate,
        createdAt: reservation.createdAt,
      }));

      setReservations(mappedReservations);
    } catch (error) {
      console.error("Error fetching reservations:", error);
    }
  };

  // 컴포넌트 마운트 시 데이터 가져오기
  useEffect(() => {
    fetchReservations();
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
      fetchReservations(); // 리뷰 업데이트 후 데이터 새로 가져오기
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
