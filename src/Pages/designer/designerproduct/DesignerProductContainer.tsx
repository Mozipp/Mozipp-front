import React, { useState } from 'react';
import DesignerProductPresentation from './DesignerProductPresentation';

const DesignerProductContainer: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    introduction: '',
    design: '',
    modelPreferDescription: '',
    preferBreed: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // API 요청 보내기
    try {
      const response = await fetch('/api/products/designer-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok && result.isSuccess) {
        alert('상품이 성공적으로 등록되었습니다!');
      } else {
        alert(`오류 발생: ${result.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('상품 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <DesignerProductPresentation
      formData={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
};

export default DesignerProductContainer;
