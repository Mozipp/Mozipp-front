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
      title: "리트리버 미용",
      introduction: "리트리버를 위한 고급 미용 서비스",
      design: "깔끔한 디자인으로 스타일링",
      modelPreferDescription: "리트리버와 같은 중형견 이상 추천",
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
      title: "시츄 미용",
      introduction: "시츄를 위한 럭셔리 미용 서비스",
      design: "시츄 전용의 편안한 디자인 제공",
      modelPreferDescription: "작고 귀여운 강아지에 적합",
      preferBreed: "시츄",
      productStatus: "AVAILABLE",
      petShop: {
        petShopName: "펫샵2",
        address: "부산광역시 해운대구",
        addressDetail: "센텀로 45",
      },
      createdAt: "2024-11-18",
    },
    {
      designerProductId: "3",
      title: "푸들 스타일링",
      introduction: "푸들을 위한 특별한 스타일링 제공",
      design: "부드럽고 고급스러운 느낌을 강조",
      modelPreferDescription: "푸들처럼 털이 풍성한 강아지에게 추천",
      preferBreed: "푸들",
      productStatus: "UNAVAILABLE",
      petShop: {
        petShopName: "펫샵3",
        address: "대전광역시 중구",
        addressDetail: "은행동 456",
      },
      createdAt: "2024-11-19",
    },
  ]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch("/api/products/designer-product")
      .then((response) => response.json())
      .then((data: Product[]) => setProducts(data))
      .catch((error) => console.error("Failed to fetch products:", error));
  }, []);

  const handleProductClick = async (designerProductId: string) => {
    // try {
    //   const response = await fetch(`/api/products/designer-product/${designerProductId}`);
    //   const data = await response.json();
    //   setSelectedProduct(data);
    // } catch (error) {
    //   console.error("Failed to fetch product details:", error);
    // }
    const product = products.find((p) => p.designerProductId === designerProductId) || null;
      setSelectedProduct(product);
  };

  return (
    <ModelLandingPresentation
      products={products}
      selectedProduct={selectedProduct}
      onProductClick={handleProductClick}
      onCloseDetails={() => setSelectedProduct(null)}
    />
  );
};

export default ModelLandingContainer;
