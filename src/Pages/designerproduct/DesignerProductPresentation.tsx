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
      width: '900px',
      margin: '50px auto',
      padding: '40px',
      background: 'linear-gradient(135deg, #ff9a9e, #fad0c4)',
      borderRadius: '30px',
      boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)',
      fontFamily: '"Arial", sans-serif',
      color: '#333',
      position: 'relative' as const,
    },
    header: {
      textAlign: 'center' as const,
      fontSize: '48px',
      fontWeight: 'bold',
      marginBottom: '20px',
      color: '#fff',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
    },
    formGroup: {
      marginBottom: '20px',
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      alignItems: 'center',
    },
    label: {
      fontWeight: 'bold',
      fontSize: '16px',
      color: '#fff',
    },
    input: {
      width: '90%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '15px',
      fontSize: '14px',
      boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
      background: '#fff',
    },
    textarea: {
      width: '90%',
      padding: '10px',
      border: '1px solid #ddd',
      borderRadius: '15px',
      fontSize: '14px',
      resize: 'none' as const,
      boxShadow: 'inset 0 2px 5px rgba(0, 0, 0, 0.1)',
      background: '#fff',
    },
    buttonGroup: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '30px',
    },
    button: {
      padding: '15px 30px',
      backgroundColor: '#4caf50',
      color: '#fff',
      fontWeight: 'bold' as const,
      fontSize: '18px',
      border: 'none',
      borderRadius: '15px',
      cursor: 'pointer',
      boxShadow: '0 5px 10px rgba(0, 0, 0, 0.2)',
      transition: 'background-color 0.3s',
    },
    placeholderImage: {
      width: '150px',
      height: '150px',
      backgroundColor: '#eee',
      borderRadius: '50%',
      margin: '20px auto',
      overflow: 'hidden' as const, // 이미지가 영역을 벗어나지 않도록 설정
    },
    leftDecoration: {
      position: 'absolute' as const,
      top: '20px',
      left: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      overflow: 'hidden',
    },
    rightDecoration: {
      position: 'absolute' as const,
      top: '20px',
      right: '20px',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      overflow: 'hidden',
    },
  };

  return (
    <div style={styles.container}>
      {/* 왼쪽 상단 장식 이미지 */}
      <div style={styles.leftDecoration}>
        <img
          src="/강아지1.png"
          alt="Left Decoration"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* 오른쪽 상단 장식 이미지 */}
      <div style={styles.rightDecoration}>
        <img
          src="/강아지2.png"
          alt="Right Decoration"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      <h1 style={styles.header}>상품 등록</h1>

      {/* 중앙 메인 이미지 */}
      <div style={styles.placeholderImage}>
        <img
          src="/강아지3.png"
          alt="Main"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

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

        <div style={styles.buttonGroup}>
          <button type="submit" style={styles.button}>
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default DesignerProductPresentation;
