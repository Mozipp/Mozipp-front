import React, { useState } from "react";
import RegisterDesignerPresentation from "./RegisterDesignerPresentation";
import { useNavigate } from "react-router-dom";

const RegisterDesignerContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "MALE",
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    // API 요청 로직 추가
  };

  const clickBack = () => {
    navigate(-1);
  }

  return (
    <RegisterDesignerPresentation
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      clickBack={clickBack}
    />
  );
};

export default RegisterDesignerContainer;
