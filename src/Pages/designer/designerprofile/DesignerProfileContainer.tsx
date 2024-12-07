import React, { useState } from "react";
import DesignerProfilePresentation from "./DesignerProfilePresentation";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // API 호출 로직 추가 가능
  };

  return (
    <DesignerProfilePresentation
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default DesignerProfileContainer;
