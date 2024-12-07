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
  };
  reservationRequestDate: string;
  createdAt: string;
};

const DesignerAcceptContainer: React.FC = () => {
  const [filter, setFilter] = useState<"PENDING" | "ACCEPTED" | "REJECTED" | "CANCELED">("PENDING");
  const [requests, setRequests] = useState<ReservationRequest[]>([]);

  // Fetch reservation requests based on the filter
  const fetchRequests = async () => {
    try {
      const response = await getReservationRequests(filter);
      setRequests(
        Array.isArray(response.result)
          ? response.result.map((req) => ({
              ...req,
              reservationRequestId: String(req.reservationRequestId),
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
