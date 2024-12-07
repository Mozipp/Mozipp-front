import React, { useState } from "react";
import DesignerProfilePresentation from "./DesignerProfilePresentation";
import {
  getDesignerProfile1,
  registerDesignerProfile,
} from "../../../Apis/designer/DesignerApi";

const DesignerProfileContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    petShopName: "",
    address: "",
    addressDetail: "",
    career: "",
  });

  const [profile, setProfile] = useState<{
    career: string;
    petShop: { petShopName: string; address: string; addressDetail: string };
  } | null>(null); // 처음에는 null로 설정

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
        fetchProfile(); // 등록 후 프로필 정보 가져오기
      } else {
        alert(`오류 발생: ${response.message}`);
      }
    } catch (error) {
      console.error("Error registering profile:", error);
      alert("프로필 등록 중 오류가 발생했습니다.");
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await getDesignerProfile1();
      if (response.isSuccess) {
        setProfile({
          career: response.result.career || "",
          petShop: {
            petShopName: response.result.petShop.petShopName || "",
            address: response.result.petShop.address || "",
            addressDetail: response.result.petShop.addressDetail || "",
          },
        });
      } else {
        alert("프로필 정보를 불러오지 못했습니다.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <DesignerProfilePresentation
      profile={profile}
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default DesignerProfileContainer;
