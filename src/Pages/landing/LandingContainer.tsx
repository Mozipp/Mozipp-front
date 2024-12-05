import React, { useEffect, useState } from "react";
import LandingPresentation from "./LandingPresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../AppContext";

const images = ["/강아지사진1.png", "/강아지사진2.png", "/강아지사진3.png"];

const LandingContainer: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isLoggedIn, role } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    // role과 로그인 상태에 따라 리다이렉트
    if (isLoggedIn) {
      if (role === "model") {
        navigate("/model/landing");
      } else if (role === "designer") {
        navigate("/designerpage");
      }
    }
  }, [isLoggedIn, role, navigate]);

  const clickCustomer = () => {
    navigate("/model/login");
  };

  const clickDesigner = () => {
    navigate("/designer/login");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <LandingPresentation
      images={images}
      currentImageIndex={currentImageIndex}
      clickCustomer={clickCustomer}
      clickDesigner={clickDesigner}
    />
  );
};

export default LandingContainer;
