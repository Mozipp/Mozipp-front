import React, { useEffect, useState } from "react";
import ModelLandingPresentation from "./ModelLandingPresentation"; // named export는 {}로 가져와야 함
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import { getProducts } from "../../../Apis/product/ProductApi";
import { createReservationRequest } from "../../../Apis/model/ModelApi";
import { useToast } from "@chakra-ui/react";
import { getDesignerProduct } from "../../../Apis/product/ProductApi";

interface PetShop {
  petShopName: string;
  address: string;
  addressDetail: string;
}

interface Review {
  reviewId: number;
  reviewContent: string;
  createdAt: string;
}

interface ProductSummary {
  designerProductId: number;
  title: string;
  introduction: string;
  design: string;
  modelPreferDescription: string;
  preferBreed: string;
  productStatus: "AVAILABLE" | "UNAVAILABLE";
  petShop: PetShop;
  createdAt: string;
}

// 상세 데이터 타입
interface ProductDetails extends ProductSummary {
  name: string;
  gender: string;
  career: string;
  petGroomingImageUrl: { imageUrl: string }[];
  reviews: Review[];
}

const ModelLandingContainer = () => {
  const { isLoggedIn, logout, role, loading } = useAppContext();
  const [products, setProducts] = useState<ProductSummary[]>([]);
const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [loadings, setLoadings] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();
  
  useEffect(() => {
    if (!loading && !isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, loading, navigate]);
  
  const fetchProducts = async () => {
    setLoadings(true);
    try {
      const fetchedProducts: ProductSummary[] = await getProducts("AVAILABLE");
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      toast({
        title: "상품을 불러오는 데 실패했습니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [toast]);

  const handleProductClick = async (designerProductId: number) => {
    try {
      const productDetails = await getDesignerProduct(designerProductId);
      const transformedProduct = productDetails.result || productDetails;
      setSelectedProduct({ ...transformedProduct, designerProductId });
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };
   

  const handleReservation = async (
    designerProductId: number,
    modelDescription: string
  ) => {
    try {
      setLoadings(true);
  
      // 요청 데이터 구성
      const requestData = {
        designerProductId,
        modelDescription: modelDescription.trim(),
        reservationRequestDate: new Date().toISOString(),
      };

      console.log("이건 뭘까?", designerProductId);
  
      // 예약 요청 API 호출
      await createReservationRequest(requestData);
  
      // 성공 알림
      toast({
        title: "예약 요청이 성공적으로 전송되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      await fetchProducts();
  
      // 선택된 상품 초기화
      setSelectedProduct(null);
    } catch (error) {
      console.error("Failed to create reservation request:", error);
  
      // 에러 알림
      toast({
        title: "예약 요청에 실패했습니다.",
        description: "다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoadings(false);
    }
  };
  

  const handleMypageClick = () => {
    if (role === "DESIGNER") {
      // 디자이너 마이페이지 요청
      navigate("/designerpage");
    } else if (role === "MODEL") {
      // 모델 마이페이지 요청
      navigate("/model/mypage");
      
    } else {
      console.warn("Role is not set or invalid. Skipping server logout.");
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/");
  };

  return (
    <ModelLandingPresentation
      products={products}
      selectedProduct={selectedProduct}
      onProductClick={handleProductClick}
      onCloseDetails={() => setSelectedProduct(null)}
      handleMypageClick={handleMypageClick}
      handleLogoutClick={handleLogoutClick}
      isLoading={loadings}
      handleHomeClick={handleHomeClick}
      handleReservation={handleReservation}
    />
  );
};

export default ModelLandingContainer;
