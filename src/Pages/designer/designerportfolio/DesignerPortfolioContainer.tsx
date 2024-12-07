import React, { useState } from "react";
import DesignerPortfolioPresentation from "./DesignerPortfolioPresentation";
import {
  uploadPetGroomingImage,
  getUploadedPetGroomingImages,
  deleteUploadedPetGroomingImage,
} from "../../../Apis/designer/DesignerApi";

const DesignerPortfolioContainer: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("이미지를 선택하세요.");
      return;
    }

    try {
      const response: any = await uploadPetGroomingImage(selectedFile);

      // 응답 데이터를 기존 형식으로 변환
      if (response?.isSuccess && response?.data?.imageUrl) {
        alert("이미지가 성공적으로 업로드되었습니다!");
        setUploadedImages((prev) => [...prev, response.data.imageUrl]);
      } else {
        alert(`이미지 업로드 실패: ${response?.message || "알 수 없는 오류"}`);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  const handleViewUploadedImages = async () => {
    try {
      const result: any = await getUploadedPetGroomingImages();

      // 데이터 변환
      setUploadedImages(result?.map((item: { imageUrl: string }) => item.imageUrl));
    } catch (error) {
      console.error("Error fetching uploaded images:", error);
      alert("이미지를 불러오는 데 실패했습니다.");
    }
  };

  const handleDeleteImage = async (imageUrl: string) => {
    const confirmDelete = window.confirm("정말로 이 이미지를 삭제하시겠습니까?");
    if (!confirmDelete) return;

    try {
      const response: any = await deleteUploadedPetGroomingImage(imageUrl);

      // 응답 데이터를 기존 형식으로 변환
      if (response?.isSuccess) {
        setUploadedImages((prev) => prev.filter((img) => img !== imageUrl));
        alert("이미지가 성공적으로 삭제되었습니다.");
      } else {
        alert(`이미지 삭제 실패: ${response?.message}`);
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("이미지 삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <DesignerPortfolioPresentation
      selectedFileName={selectedFile?.name || ""}
      uploadedImages={uploadedImages}
      onFileChange={handleFileChange}
      onUpload={handleUpload}
      onViewUploadedImages={handleViewUploadedImages}
      onDeleteImage={handleDeleteImage}
    />
  );
};

export default DesignerPortfolioContainer;
