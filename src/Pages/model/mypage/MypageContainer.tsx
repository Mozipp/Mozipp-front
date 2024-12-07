import React, { useEffect, useState } from "react";
import MypagePresentation from "./MypagePresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import { getPetProfile, uploadPetImage, getReservationRequests } from "../../../Apis/model/ModelApi";

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

const MypageContainer: React.FC = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const [petProfile, setPetProfile] = useState<PetProfile | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [reservations, setReservations] = useState<ReservationRequest[]>([]);

  const fetchPetProfile = async () => {
    try {
      const response = await getPetProfile();
      console.log("받아온 프로필 데이터:", response); // 데이터 확인
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
      const transformedReservations: ReservationRequest[] = response.map((reservation: any) => ({
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
          modelPreferDescription: reservation.designerProduct.modelPreferDescription,
          preferBreed: reservation.designerProduct.preferBreed,
          petShop: {
            petShopName: reservation.designerProduct.petShop.petShopName,
            address: reservation.designerProduct.petShop.address,
            addressDetail: reservation.designerProduct.petShop.addressDetail,
          },
        },
      }));
  
      setReservations(transformedReservations); // 상태 업데이트
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
    }
  };
  

  useEffect(() => {
    fetchPetProfile();
    fetchReservations();
  }, [profileImage]);

  useEffect(() => {
    if (petProfile) {
      setProfileImage(petProfile.petImageUrl);
    }
  }, [petProfile]);

  useEffect(() => {
    if (petProfile) {
      console.log("업데이트된 petProfile:", petProfile.breed);
    }
  }, [petProfile]);

  const handleLandingClick = () => {
    navigate('/model/landing');
    console.log("이게뭐야" + petProfile?.petAge);
  };

  const handleHomeClick=()=>{
    navigate('/');
  }

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };
  
  const handleEditClick=()=>{
    navigate('/model/edit');
  };

  const handleImageUpload = async (file: File) => {
    try {
      const response = await uploadPetImage(file);
      if (response && response.imageUrl) {
        setProfileImage(response.imageUrl); // 업로드 성공 시 이미지 URL 업데이트
        console.log("Image uploaded successfully:", response.imageUrl);
      }
    } catch (error) {
      console.error("Failed to upload image:", error);
    }
  };

  return <MypagePresentation 
    handleLandingClick={handleLandingClick}
    handleLogoutClick = {handleLogoutClick}
    profileImage={profileImage}
    petProfile={petProfile}
    onImageUpload={handleImageUpload}
    handleEditClick={handleEditClick}
    reservations={reservations}
    handleHomeClick={handleHomeClick}
  />;
};

export default MypageContainer;
