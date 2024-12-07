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
  const { isLoggedIn, logout, role } = useAppContext();
  const [products, setProducts] = useState<ProductSummary[]>([]);
const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts: ProductSummary[] = await getProducts("AVAILABLE");
        setProducts(fetchedProducts); // 타입 일치
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast({
          title: "상품을 불러오는 데 실패했습니다.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

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
  
  
  useEffect(() => {
    if (selectedProduct) {
      console.log("제발:", selectedProduct.designerProductId);
    }
  }, [selectedProduct]);
  

  const handleReservation = async (
    designerProductId: number,
    modelDescription: string
  ) => {
    try {
      setLoading(true);
  
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
      setLoading(false);
    }
  };
  

  const handleMypageClick = () => {
    navigate("/model/mypage");
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
      isLoading={loading}
      handleHomeClick={handleHomeClick}
      handleReservation={handleReservation}
    />
  );
};

export default ModelLandingContainer;
