import React, { useState } from "react";
import DesignerLoginPresentation from "./DesignerLoginPresentation";
import { useNavigate } from "react-router-dom";
import { loginDesigner } from "../../../Apis/designer/DesignerApi";

const DesignerLoginContainer: React.FC = () => {
  const [id, setId] = useState<string>(""); // email -> id
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const clickHome = () => {
    navigate("/");
  };

  const clickModel = () => {
    navigate("/model/login");
  };

  const clickRegisterDesigner = () => {
    navigate("/designer/register");
  };

  // 로그인 처리
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      // 로그인 및 accessToken 가져오기
      await loginDesigner({ username: id, password }); // email -> id

      alert("Designer login successful!");
      navigate("/"); // 로그인 성공 후 대시보드로 이동
    } catch (error: any) {
      setError(error.message || "Failed to log in. Please check your credentials.");
    }
  };

  return (
    <DesignerLoginPresentation
      id={id} // email -> id
      password={password}
      error={error}
      setId={setId} // setEmail -> setId
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      clickHome={clickHome}
      clickModel={clickModel}
      clickRegisterDesigner={clickRegisterDesigner}
    />
  );
};

export default DesignerLoginContainer;
