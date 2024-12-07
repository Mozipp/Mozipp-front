import React, { useEffect, useState } from "react";
import MypagePresentation from "./MypagePresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import { getPetProfile, uploadPetImage, getReservationRequests } from "../../../Apis/model/ModelApi";

interface PetProfile {
  petName: string;
  petAge: number;
  petGender: string;
  breed: string;
  petImageUrl: string;
}


interface Reservation {
  reservationId: string;
  designerProductTitle: string;
  status: string; // 예: "PENDING", "ACCEPTED"
  reservationDate: string;
}

const MypageContainer: React.FC = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const [petProfile, setPetProfile] = useState<PetProfile | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");
  const [reservations, setReservations] = useState<Reservation[]>([]);

  const fetchPetProfile = async () => {
    try {
      const response = await getPetProfile();
      setPetProfile(response);
    } catch (error) {
      console.error("Failed to fetch pet profile:", error);
    }
  };

  const fetchReservations = async () => {
    try {
      const response = await getReservationRequests("PENDING");
      setReservations(response.data);
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

  const handleLandingClick = () => {
    navigate('/model/landing');
    console.log("펫 이름: " + petProfile?.petName);
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
