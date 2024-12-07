import React, { useEffect, useState } from "react";
import MypagePresentation from "./MypagePresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import {
  getPetProfile,
  uploadPetImage,
  getReservationRequests,
  getConfirmedReservations,
  getCompletedReservations,
  createReview,
} from "../../../Apis/model/ModelApi";

interface PetProfile {
  breed: string;
  petAge: number;
  petGender: string;
  petImageUrl: string;
  petName: string;
}

interface PetShop {
  petShopName: string;
  address: string;
  addressDetail: string;
}

interface DesignerProduct {
  designerProductId: string;
  title: string;
  introduction: string;
  design: string;
  modelPreferDescription: string;
  preferBreed: string;
  petShop: PetShop;
}

interface ReservationRequest {
  reservationRequestId: number;
  reservationRequestStatus: string; // 예: "PENDING", "ACCEPTED", "REJECTED"
  modelDescription: string;
  reservationRequestDate: string;
  designerProduct: DesignerProduct;
  createdAt: string;
}

interface ConfirmedReservation {
  reservationId: number;
  petShop: {
    petShopName: string;
    address: string;
    addressDetail: string;
  };
  design: string;
  reservationStatus: string;
  reservationRequestDate: string;
  createdAt: string;
}

const MypageContainer: React.FC = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const [petProfile, setPetProfile] = useState<PetProfile | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [reservations, setReservations] = useState<ReservationRequest[]>([]);
  const [reviewContent, setReviewContent] = useState<string>("");
  const [selectedReservation, setSelectedReservation] =
    useState<ReservationRequest | null>(null);
  const [confirmedReservations, setConfirmedReservations] = useState<ConfirmedReservation[]>([]);
  const [completedReservations, setCompletedReservations] = useState<ConfirmedReservation[]>([]);

  const fetchPetProfile = async () => {
    try {
      const response = await getPetProfile();
      const transformedProfile: PetProfile = {
        ...response,
        petAge: Number(response.petAge), // 숫자로 변환
      };
      setPetProfile(transformedProfile);
    } catch (error) {
      console.error("Failed to fetch pet profile:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await getReservationRequests("PENDING"); // API 호출
      console.log("Fetched Reservations:", response);

      // 데이터를 타입에 맞게 변환
      const transformedReservations: ReservationRequest[] = response.map(
        (reservation: any) => ({
          reservationRequestId: reservation.reservationRequestId,
          reservationRequestStatus: reservation.reservationRequestStatus,
          modelDescription: reservation.modelDescription,
          reservationRequestDate: reservation.reservationRequestDate,
          createdAt: reservation.createdAt,
          designerProduct: {
            designerProductId: reservation.designerProduct.designerProductId,
            title: reservation.designerProduct.title,
            introduction: reservation.designerProduct.introduction,
            design: reservation.designerProduct.design,
            modelPreferDescription:
              reservation.designerProduct.modelPreferDescription,
            preferBreed: reservation.designerProduct.preferBreed,
            petShop: {
              petShopName: reservation.designerProduct.petShop.petShopName,
              address: reservation.designerProduct.petShop.address,
              addressDetail: reservation.designerProduct.petShop.addressDetail,
            },
          },
        })
      );

      setReservations(transformedReservations); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };

  const fetchConfirmedReservations = async () => {
    try {
      const reservations = await getConfirmedReservations();
      setConfirmedReservations(reservations); // 상태에 저장
    } catch (error) {
      console.error("Error fetching confirmed reservations:", error);
    }
  };

  useEffect(() => {
    const fetchCompletedReservations = async () => {
      try {
        const reservations = await getCompletedReservations();
        setCompletedReservations(reservations);
      } catch (error) {
        console.error("Error fetching completed reservations:", error);
      }
    };

    fetchCompletedReservations();
  }, []);

  useEffect(() => {
    fetchPetProfile();
    fetchReservations();
    fetchConfirmedReservations();
  }, [profileImage]);

  useEffect(() => {
    if (petProfile) {
      setProfileImage(petProfile.petImageUrl);
    }
  }, [petProfile]);

  const handleLandingClick = () => {
    navigate("/model/landing");
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  const handleEditClick = () => {
    navigate("/model/edit");
  };

  const handleImageUpload = async (file: File) => {
    try {
      const response = await uploadPetImage(file);
      if (response && response.imageUrl) {
        setProfileImage(response.imageUrl); // 업로드 성공 시 이미지 URL 업데이트
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };
  const handleReviewSubmit = async () => {
    if (!selectedReservation || !reviewContent.trim()) {
      console.error("리뷰를 작성하거나 예약을 선택해야 합니다.");
      return;
    }

    try {
      const reviewData = {
        reservationId: selectedReservation.reservationRequestId,
        reviewContent: reviewContent.trim(),
      };

      await createReview(reviewData);
      

      // 초기화
      setReviewContent("");
      setSelectedReservation(null);

      // 리뷰 제출 후 목록 새로고침
      const updatedReservations = await getCompletedReservations();
      setCompletedReservations(updatedReservations);
    } catch (error) {
      console.error("리뷰 제출 실패:", error);
    }
  };

  return (
    <MypagePresentation
      handleLandingClick={handleLandingClick}
      handleLogoutClick={handleLogoutClick}
      profileImage={profileImage}
      petProfile={petProfile}
      onImageUpload={handleImageUpload}
      handleEditClick={handleEditClick}
      reservations={reservations}
      handleHomeClick={handleHomeClick}
      selectedReservation={selectedReservation} // 추가
      setSelectedReservation={setSelectedReservation} // 추가
      reviewContent={reviewContent} // 추가
      setReviewContent={setReviewContent} // 추가
      handleReviewSubmit={handleReviewSubmit} // 추가
      confirmedReservations={confirmedReservations}
      completedReservations={completedReservations}
    />
  );
};

export default MypageContainer;
