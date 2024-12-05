import React, { useEffect, useState } from "react";
import MypagePresentation from "./MypagePresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";

const MypageContainer: React.FC = () => {
  const { logout } = useAppContext();
  const navigate = useNavigate();

  const handleLandingClick = () => {
    navigate('/model/landing');
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return <MypagePresentation 
    handleLandingClick={handleLandingClick}
    handleLogoutClick = {handleLogoutClick}
  />;
};

export default MypageContainer;
