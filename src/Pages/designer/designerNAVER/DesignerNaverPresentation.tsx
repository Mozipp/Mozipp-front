import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, HStack } from "@chakra-ui/react";

interface DesignerNaverPresentationProps {
  formData: {
    title: string;
    introduction: string;
    design: string;
    modelPreferDescription: string;
    preferBreed: string;
    naverPlaceUrl: string;
  };
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const DesignerNaverPresentation: React.FC<DesignerNaverPresentationProps> = (
  props
) => {
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      background: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    header: {
      textAlign: "center" as const,
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      fontWeight: "bold",
      marginBottom: "5px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      fontSize: "14px",
      resize: "none" as const,
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#4caf50",
      color: "white",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>상품 등록</h1>
      <form onSubmit={props.onSubmit}>
        {/* Title */}
        <div style={styles.formGroup}>
          <label style={styles.label}>제목</label>
          <input
            type="text"
            name="title"
            value={props.formData.title}
            onChange={props.onChange}
            style={styles.input}
            placeholder="상품 제목을 입력하세요"
          />
        </div>

        {/* Introduction */}
        <div style={styles.formGroup}>
          <label style={styles.label}>소개</label>
          <textarea
            name="introduction"
            value={props.formData.introduction}
            onChange={props.onChange}
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
            value={props.formData.design}
            onChange={props.onChange}
            style={styles.input}
            placeholder="디자인을 입력하세요"
          />
        </div>

        {/* Model Preference Description */}
        <div style={styles.formGroup}>
          <label style={styles.label}>모델 선호 설명</label>
          <textarea
            name="modelPreferDescription"
            value={props.formData.modelPreferDescription}
            onChange={props.onChange}
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
            value={props.formData.preferBreed}
            onChange={props.onChange}
            style={styles.input}
            placeholder="선호 품종을 입력하세요 (예: 말티즈)"
          />
        </div>

        {/* Naver place */}
        <div style={styles.formGroup}>
          <label style={styles.label}>네이버 플레이스 URL</label>
          <input
            type="text"
            name="naverPlaceUrl"
            value={props.formData.naverPlaceUrl}
            onChange={props.onChange}
            style={styles.input}
            placeholder="네이버 플레이스 url 주소를 입력하세요"
          />
        </div>

        <button type="submit" style={styles.button}>
          등록
        </button>
      </form>
    </div>
  );
};

export default DesignerNaverPresentation;
