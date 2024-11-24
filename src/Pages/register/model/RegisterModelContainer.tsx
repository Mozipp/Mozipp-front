import React, { useState } from "react";
import RegisterModelPresentation from "./RegisterModelPresentation";
import { useNavigate } from "react-router-dom";

const RegisterModelContainer: React.FC = () => {
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
    <RegisterModelPresentation
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      clickBack={clickBack}
    />
  );
};

export default RegisterModelContainer;
