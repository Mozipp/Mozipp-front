import React, { useState } from 'react';
import { addDesignerPortfolio } from '../../../Apis/designer/DesignerApi';
import DesignerNaverPresentation from "./DesignerNaverPresentation";

const DesignerNaverContainer: React.FC = () => {
    const [formData, setFormData] = useState({
        title: '',
        introduction: '',
        design: '',
        modelPreferDescription: '',
        preferBreed: '',
        naverPlaceUrl: '',
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
    
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const response = await addDesignerPortfolio(
            formData.title,
            formData.introduction,
            formData.design,
            formData.modelPreferDescription,
            formData.preferBreed,
            formData.naverPlaceUrl
          );
          if (response.isSuccess) {
            alert("상품이 성공적으로 등록되었습니다!");
          } else {
            alert(`오류 발생: ${response.message}`);
          }
        } catch (error) {
          console.error("Error:", error);
          alert("상품 등록 중 오류가 발생했습니다.");
        }
      };
      return (
        <DesignerNaverPresentation
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      );
    };
    
    export default DesignerNaverContainer;