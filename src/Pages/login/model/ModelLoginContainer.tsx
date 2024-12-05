import React, { useState, useEffect } from "react";
import ModelLoginPresentation from "./ModelLoginPresentation";
import { useNavigate } from "react-router-dom";
import { loginModel } from "../../../Apis/model/ModelApi";
import { useAppContext } from "../../../AppContext";

const ModelLoginContainer: React.FC = () => {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { setIsLoggedIn, setUserId, setRole, isLoggedIn, role } = useAppContext();

  const navigate = useNavigate();

  useEffect(() => {
    // role과 로그인 상태에 따라 리다이렉트
    if (isLoggedIn) {
      if (role === "MODEL") {
        navigate("/model/landing");
      }
    }
  }, [isLoggedIn, role, navigate]);

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

  // 엔터 눌렀을 때, 로그인
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSubmit(event as unknown as React.FormEvent);
    }
  };

  // 로그인 처리
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      // 로그인 및 accessToken 가져오기
      await loginModel({ username: id, password });

      setUserId(id);
      setIsLoggedIn(true);
      setRole("MODEL");
      console.log(role);

      alert(`${id}님 어서오세요 😊`);
      navigate("/model/landing"); // 로그인 성공 후 대시보드로 이동
    } catch (error: any) {
      setError(
        error.message || "Failed to log in. Please check your credentials."
      );
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
      handleKeyDown={handleKeyDown}
      clickHome={clickHome}
      clickDesigner={clickDesigner}
      clickRegisterModel={clickRegisterModel}
    />
  );
};

export default ModelLoginContainer;
