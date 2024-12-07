import React, { useState, useEffect } from "react";
import DesignerAcceptPresentation from "./DesignerAcceptPresentation";
import { getReservationRequests, updateReservationStatus } from "../../../Apis/designer/DesignerApi";

type ReservationRequest = {
  reservationRequestId: string;
  reservationRequestStatus: string;
  model: {
    modelDescription: string;
    petName: string;
    petAge: number;
    petGender: string;
    breed: string;
    petImageUrl?: string;
    reviews: Array<{
      reviewId: string;
      reviewContent: string;
      createdAt: string;
    }>; // reviews 속성 추가
  };
  reservationRequestDate: string;
  createdAt: string;
};

const DesignerAcceptContainer: React.FC = () => {
  const [filter, setFilter] = useState<"PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED">("PENDING");
  const [requests, setRequests] = useState<ReservationRequest[]>([]);

  const [currentReviews, setCurrentReviews] = useState<
    Array<{ reviewId: string; reviewContent: string; createdAt: string }>
  >([]);
  const [showReviewsPopup, setShowReviewsPopup] = useState(false);

  // Fetch reservation requests based on the filter
  const fetchRequests = async () => {
    try {
      const response = await getReservationRequests(filter);
      setRequests(
        Array.isArray(response.result)
          ? response.result.map((req) => ({
              ...req,
              reservationRequestId: String(req.reservationRequestId),
              model: {
                ...req.model,
                reviews: req.model.reviews
                  ? req.model.reviews.map((review) => ({
                      ...review,
                      reviewId: String(review.reviewId), // reviewId를 string으로 변환
                    }))
                  : [], // 빈 배열로 초기화
              },
            }))
          : []
      );
    } catch (error) {
      console.error("Error fetching reservation requests:", error);
      alert("예약 요청 데이터를 불러오는 데 실패했습니다.");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  // Handle accept or reject actions with API call
  const handleAction = async (id: string, action: "ACCEPT" | "REJECT") => {
    try {
      const response = await updateReservationStatus(id, action);
      if (response.success) {
        alert(`요청 ID ${id}가 ${action === "ACCEPT" ? "수락" : "거절"}되었습니다.`);
        // Remove the updated request from the list
        setRequests((prev) => prev.filter((request) => request.reservationRequestId !== id));
      } else {
        alert(`상태 변경 실패: ${response.message}`);
      }
    } catch (error) {
      console.error("Error updating reservation status:", error);
      alert("상태를 변경하는 도중 오류가 발생했습니다.");
    }
  };

  const handleFilterChange = (newFilter: "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED") => {
    setFilter(newFilter);
  };

  const handleViewReviews = (
    reviews: Array<{ reviewId: string; reviewContent: string; createdAt: string }>
  ) => {
    if (!reviews || reviews.length === 0) {
      alert("리뷰가 없습니다.");
      return;
    }
    // 팝업 로직 추가
    setCurrentReviews(reviews); // 현재 리뷰 상태 설정
    setShowReviewsPopup(true); // 팝업 열기
  };

  const closeReviewsPopup = () => {
    setShowReviewsPopup(false);
    setCurrentReviews([]); // 리뷰 초기화
  };

  return (
    <>
      <DesignerAcceptPresentation
        requests={requests}
        filter={filter}
        setFilter={handleFilterChange}
        onAction={handleAction}
        onViewReviews={handleViewReviews}
      />
      {showReviewsPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              maxWidth: "500px",
              width: "90%",
              textAlign: "center",
            }}
          >
            <h3>리뷰 보기</h3>
            {currentReviews.map((review) => (
              <div key={review.reviewId} style={{ marginBottom: "10px" }}>
                <p>
                  <strong>작성일:</strong> {new Date(review.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>내용:</strong> {review.reviewContent}
                </p>
                <hr />
              </div>
            ))}
            <button
              style={{
                marginTop: "10px",
                padding: "10px",
                backgroundColor: "#4caf50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={closeReviewsPopup}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DesignerAcceptContainer;
