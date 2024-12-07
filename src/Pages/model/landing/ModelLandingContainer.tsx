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

interface Product {
  designerProductId: string; // string으로 정의
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
        const fetchedProducts = await getProducts("AVAILABLE");

        const transformedProducts = fetchedProducts.map((product) => ({
          ...product,
          designerProductId: String(product.designerProductId), // 변환
        }));

        setProducts(transformedProducts);
        console.log("Fetched Products:", transformedProducts);
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
      const productDetails = await getDesignerProduct(designerProductId);
      const transformedProduct = productDetails.result || productDetails;

      setSelectedProduct(transformedProduct);
      console.log("선택된 상품 상세 데이터:", transformedProduct);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
  };
  useEffect(() => {
    if (selectedProduct) {
      console.log("제발:", selectedProduct);
    }
  }, [selectedProduct]);
  

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

      setSelectedProduct(null);
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
