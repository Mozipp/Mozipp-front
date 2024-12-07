import React, { useState, useEffect } from "react";
import DesignerProfilePresentation from "./DesignerProfilePresentation";
import { registerDesignerProfile, getDesignerProfile1 } from "../../../Apis/designer/DesignerApi";

const DesignerProfileContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    petShopName: "",
    address: "",
    addressDetail: "",
    career: "",
  });

  const [profileData, setProfileData] = useState<{
    petShop: {
      petShopName: string;
      address: string;
      addressDetail: string;
    };
    career: string;
  } | null>(null);

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
        fetchProfileData(); // 프로필 등록 후 데이터 새로고침
      } else {
        alert(`오류 발생: ${response.message}`);
      }
    } catch (error) {
      console.error("Error during profile registration:", error);
      alert("프로필 등록 중 오류가 발생했습니다.");
    }
  };

  const fetchProfileData = async () => {
    try {
      const response = await getDesignerProfile1();
      console.log("Fetched profile data:", response); // API 응답 확인
      if (response.isSuccess) {
        setProfileData(response.result); // 가져온 데이터 상태에 저장
      } else {
        alert("프로필 데이터를 가져오는 데 실패했습니다.");
      }
    } catch (error) {
      console.error("Error fetching profile data:", error);
      alert("프로필 데이터를 가져오는 도중 오류가 발생했습니다.");
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <DesignerProfilePresentation
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
      profileData={profileData} // 프로필 데이터 전달
    />
  );
};

export default DesignerProfileContainer;
