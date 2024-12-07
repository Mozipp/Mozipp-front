import React from "react";

interface DesignerPortfolioPresentationProps {
  selectedFileName: string;
  uploadedImages: string[];
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onUpload: () => void;
  onViewUploadedImages: () => void;
  onDeleteImage: (imageUrl: string) => void;
}

const DesignerPortfolioPresentation: React.FC<DesignerPortfolioPresentationProps> = ({
  selectedFileName,
  uploadedImages,
  onFileChange,
  onUpload,
  onViewUploadedImages,
  onDeleteImage,
}) => {
  const styles = {
    container: {
      maxWidth: "800px",
      margin: "0 auto",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    header: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    fileInput: {
      marginBottom: "10px",
    },
    buttonGroup: {
      display: "flex",
      gap: "10px",
      marginBottom: "20px",
    },
    button: {
      padding: "10px 20px",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#4caf50",
      color: "#fff",
      cursor: "pointer",
    },
    imageList: {
      display: "flex",
      flexWrap: "wrap" as const,
      gap: "10px",
    },
    imageCard: {
      position: "relative" as const,
      width: "150px",
      height: "150px",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover" as const,
    },
    deleteButton: {
      position: "absolute" as const,
      top: "5px",
      right: "5px",
      padding: "5px 10px",
      backgroundColor: "#ff4d4f",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>포트폴리오 관리</div>

      {/* 이미지 업로드 */}
      <div>
        <input
          type="file"
          onChange={onFileChange}
          style={styles.fileInput}
        />
        <div>{selectedFileName || "선택된 파일 없음"}</div>
      </div>

      {/* 버튼 그룹 */}
      <div style={styles.buttonGroup}>
        <button style={styles.button} onClick={onUpload}>
          이미지 추가
        </button>
        <button style={styles.button} onClick={onViewUploadedImages}>
          올린 이미지 보기
        </button>
      </div>

      {/* 업로드된 이미지 리스트 */}
      <div style={styles.imageList}>
        {uploadedImages.map((imageUrl, index) => (
          <div key={index} style={styles.imageCard}>
            <img src={imageUrl} alt={`Uploaded ${index}`} style={styles.image} />
            <button
              style={styles.deleteButton}
              onClick={() => onDeleteImage(imageUrl)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DesignerPortfolioPresentation;
