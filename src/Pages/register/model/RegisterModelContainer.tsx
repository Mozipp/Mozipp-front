import React, { useState } from "react";
import RegisterModelPresentation from "./RegisterModelPresentation";
import { useNavigate } from "react-router-dom";
import { registerModel } from "../../../Apis/model/ModelApi";

const RegisterModelContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "MALE",
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isFormValid = (): boolean => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // 회원가입 API 호출
      await registerModel(formData);
      alert("회원가입이 성공적으로 완료되었습니다!");
      navigate("/model/login"); // 회원가입 성공 후 로그인 페이지로 이동
    } catch (error: any) {
      // 에러 메시지 처리
      const errorMessage = error.response?.data?.message || "회원가입 중 문제가 발생했습니다.";
      setError(errorMessage);
    }
  };

  const clickBack = () => {
    navigate(-1);
  };

  return (
    <RegisterModelPresentation
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      clickBack={clickBack}
      error={error}
      isFormValid={isFormValid()}
    />
  );
};

export default RegisterModelContainer;
