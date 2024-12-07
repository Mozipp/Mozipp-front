import React, { useState, useEffect } from "react";
import DesignerAcceptPresentation from "./DesignerAcceptPresentation";
import { getReservationRequests } from "../../../Apis/designer/DesignerApi";

// 타입 정의 수정 (reservationRequestId를 string으로 변경)
type ReservationRequest = {
  reservationRequestId: string; // number -> string
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

const DesignerAcceptContainer: React.FC = () => {
  const [filter, setFilter] = useState<"PENDING" | "ACCEPTED" | "REJECTED">(
    "PENDING"
  );
  const [requests, setRequests] = useState<ReservationRequest[]>([]);

  // Fetch requests from API
  const fetchRequests = async () => {
    try {
      const response = await getReservationRequests(filter);
      console.log("Fetched requests:", response); // 데이터 확인
      setRequests(
        Array.isArray(response)
          ? response.map((req) => ({
              ...req,
              reservationRequestId: String(req.reservationRequestId), // reservationRequestId를 string으로 변환
            }))
          : []
      );
    } catch (error) {
      console.error("Error fetching reservation requests:", error);
      alert("예약 요청 데이터를 불러오는 데 실패했습니다.");
    }
  };

  // Fetch requests whenever the filter changes
  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleAction = (id: string, action: "ACCEPTED" | "REJECTED") => {
    alert(`요청 ID ${id}가 ${action === "ACCEPTED" ? "수락" : "거절"}되었습니다.`);
    setRequests((prev) =>
      prev.filter((request) => request.reservationRequestId !== id)
    );
  };

  const handleFilterChange = (newFilter: "PENDING" | "ACCEPTED" | "REJECTED") => {
    setFilter(newFilter);
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
