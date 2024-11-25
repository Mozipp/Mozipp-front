import React, { useEffect, useState } from "react";
import ModelLandingPresentation from "./ModelLandingPresentation";

// 타입 정의를 이 파일 내부에 작성
interface PetShop {
  petShopName: string;
  address: string;
  addressDetail: string;
}

interface Product {
  designerProductId: string;
  title: string;
  introduction: string;
  design: string;
  modelPreferDescription: string;
  preferBreed: string;
  productStatus: "AVAILABLE" | "UNAVAILABLE";
  petShop: PetShop;
  createdAt: string;
}

const ModelLandingContainer = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      designerProductId: "1",
      title: "고급스러운 디자이너 가방",
      introduction: "최고급 가죽으로 만들어진 디자이너 가방입니다.",
      design: "심플하면서도 고급스러운 디자인",
      modelPreferDescription: "가죽 제품을 선호하는 모델에게 추천",
      preferBreed: "리트리버",
      productStatus: "AVAILABLE",
      petShop: {
        petShopName: "펫샵1",
        address: "서울특별시 강남구",
        addressDetail: "테헤란로 123",
      },
      createdAt: "2024-11-20",
    },
    {
      designerProductId: "2",
      title: "럭셔리 애완용 침대",
      introduction: "반려동물을 위한 최고급 침대",
      design: "편안한 곡선형 디자인",
      modelPreferDescription: "큰 사이즈의 반려동물을 위한 제품",
      preferBreed: "시츄",
      productStatus: "UNAVAILABLE",
      petShop: {
        petShopName: "펫샵2",
        address: "부산광역시 해운대구",
        addressDetail: "센텀로 45",
      },
      createdAt: "2024-11-18",
    },
  ]); // 초기 더미 데이터 추가

  useEffect(() => {
    fetch("/api/products/designer-product")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data)) // 타입 캐스팅
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  return <ModelLandingPresentation products={products} />;
};

export default ModelLandingContainer;
