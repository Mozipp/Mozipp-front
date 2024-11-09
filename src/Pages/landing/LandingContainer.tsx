import React, { useEffect, useState } from "react";
import LandingPresentation from "./LandingPresentation";
import { useNavigate } from "react-router-dom";

const images = ["/강아지사진1.png", "/강아지사진2.png", "/강아지사진3.png"];

const LandingContainer: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const navigate = useNavigate();

  const clickCustomer = () => {
    navigate("/customer/login");
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
