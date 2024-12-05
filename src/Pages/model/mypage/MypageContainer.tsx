import React, { useEffect, useState } from "react";
import MypagePresentation from "./MypagePresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import { uploadPetImage } from "../../../Apis/model/ModelApi";

const MypageContainer: React.FC = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string>("");

  const handleLandingClick = () => {
    navigate('/model/landing');
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
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
    onImageUpload={handleImageUpload}
  />;
};

export default MypageContainer;
