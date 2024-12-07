import React, { useState } from "react";
import DesignerProfilePresentation from "./DesignerProfilePresentation";
import { registerDesignerProfile } from "../../../Apis/designer/DesignerApi";

const DesignerProfileContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    petShopName: "",
    address: "",
    addressDetail: "",
    career: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await registerDesignerProfile(
        formData.petShopName,
        formData.address,
        formData.addressDetail,
        formData.career
      );
      if (response.isSuccess) {
        alert("프로필이 성공적으로 등록되었습니다!");
      } else {
        alert(`오류 발생: ${response.message}`);
      }
    } catch (error) {
      console.error("Error registering profile:", error);
      alert("프로필 등록 중 오류가 발생했습니다.");
    }
  };
  






  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   // API 요청 보내기
  //   try {
  //     const response = await registerDesignerProfile(
  //       formData.petShopName,
  //       formData.address,
  //       formData.addressDetail,
  //       formData.career
  //     );

  //     if (response.success) {
  //       alert("프로필이 성공적으로 등록되었습니다!");
  //     } else {
  //       alert(`오류 발생: ${response.error || "알 수 없는 오류"}`);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting profile:", error);
  //     alert("프로필 등록 중 오류가 발생했습니다.");
  //   }
  // };

  return (
    <DesignerProfilePresentation
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default DesignerProfileContainer;
