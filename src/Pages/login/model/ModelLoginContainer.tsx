import React, { useState } from "react";
import ModelLoginPresentation from "./ModelLoginPresentation";
import { useNavigate } from "react-router-dom";
import { loginModel } from "../../../Apis/model/ModelApi";

const ModelLoginContainer: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // 홈으로 이동
  const clickHome = () => {
    navigate("/");
  };

  // 디자이너 로그인 페이지로 이동
  const clickDesigner = () => {
    navigate("/designer/login");
  };

  // 모델 회원가입 페이지로 이동
  const clickRegisterModel = () => {
    navigate("/model/register");
  };

  // 로그인 처리
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      // 로그인 및 accessToken 가져오기
      await loginModel({ username: id, password });

      alert("Customer login successful!");
      navigate("/model/landing"); // 로그인 성공 후 대시보드로 이동
    } catch (error: any) {
      setError(error.message || "Failed to log in. Please check your credentials.");
    }
  };

  return (
    <ModelLoginPresentation
      id={id}
      password={password}
      error={error}
      setId={setId}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      clickHome={clickHome}
      clickDesigner={clickDesigner}
      clickRegisterModel={clickRegisterModel}
    />
  );
};

export default ModelLoginContainer;
