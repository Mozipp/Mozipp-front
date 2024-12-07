import React, { useEffect, useState } from "react";
import ModelLandingPresentation from "./ModelLandingPresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";
import { getProducts } from "../../../Apis/product/ProductApi";
import { createReservationRequest } from "../../../Apis/model/ModelApi"; // 예약 요청 API
import { useToast } from "@chakra-ui/react";

// 타입 정의
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
  const { isLoggedIn, logout, role } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
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
        const response = await getProducts("AVAILABLE");
        const data: Product[] = await response.json();
        setProducts(data);
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

  const handleProductClick = async (designerProductId: string) => {
    try {
      const response = await fetch(
        `/api/products/designer-product/${designerProductId}`
      );
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
    const product =
      products.find((p) => p.designerProductId === designerProductId) || null;
    setSelectedProduct(product);
  };

  const handleReservation = async (
    designerProductId: string,
    modelDescription: string
  ) => {
    try {
      setLoading(true);
      const requestData = {
        designerProductId: Number(designerProductId),
        modelDescription: modelDescription.trim(),
        reservationRequestDate: new Date().toISOString(),
      };

      await createReservationRequest(requestData);

      toast({
        title: "예약 요청이 성공적으로 전송되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      setSelectedProduct(null); // 상세 모달 닫기
    } catch (error) {
      console.error("Failed to create reservation request:", error);
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
    console.log(isLoggedIn);
    console.log(role);
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
