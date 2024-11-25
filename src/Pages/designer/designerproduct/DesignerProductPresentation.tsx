import React from 'react';

interface DesignerProductProps {
  formData: {
    title: string;
    introduction: string;
    design: string;
    modelPreferDescription: string;
    preferBreed: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DesignerProductPresentation: React.FC<DesignerProductProps> = ({
  formData,
  onChange,
  onSubmit,
}) => {
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      background: '#f9f9f9',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    header: {
      textAlign: 'center' as const,
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '14px',
      resize: 'none' as const,
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#4caf50',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>상품 등록</h1>
      <form onSubmit={onSubmit}>
        {/* Title */}
        <div style={styles.formGroup}>
          <label style={styles.label}>제목</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            style={styles.input}
            placeholder="상품 제목을 입력하세요"
          />
        </div>

        {/* Introduction */}
        <div style={styles.formGroup}>
          <label style={styles.label}>소개</label>
          <textarea
            name="introduction"
            value={formData.introduction}
            onChange={onChange}
            style={styles.textarea}
            rows={3}
            placeholder="상품 소개를 입력하세요"
          />
        </div>

        {/* Design */}
        <div style={styles.formGroup}>
          <label style={styles.label}>디자인</label>
          <input
            type="text"
            name="design"
            value={formData.design}
            onChange={onChange}
            style={styles.input}
            placeholder="디자인을 입력하세요"
          />
        </div>

        {/* Model Preference Description */}
        <div style={styles.formGroup}>
          <label style={styles.label}>모델 선호 설명</label>
          <textarea
            name="modelPreferDescription"
            value={formData.modelPreferDescription}
            onChange={onChange}
            style={styles.textarea}
            rows={3}
            placeholder="모델 선호에 대한 설명을 입력하세요"
          />
        </div>

        {/* Prefer Breed */}
        <div style={styles.formGroup}>
          <label style={styles.label}>선호 품종</label>
          <input
            type="text"
            name="preferBreed"
            value={formData.preferBreed}
            onChange={onChange}
            style={styles.input}
            placeholder="선호 품종을 입력하세요 (예: 말티즈)"
          />
        </div>

        <button type="submit" style={styles.button}>
          등록
        </button>
      </form>
    </div>
  );
};

export default DesignerProductPresentation;
