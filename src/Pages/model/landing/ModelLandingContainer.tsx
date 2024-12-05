import React, { useEffect, useState } from "react";
import ModelLandingPresentation from "./ModelLandingPresentation";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../../AppContext";

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
  const { isLoggedIn, logout } = useAppContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch("/api/products/designer-product");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = async (designerProductId: string) => {
    try {
      const response = await fetch(`/api/products/designer-product/${designerProductId}`);
      const data = await response.json();
      setSelectedProduct(data);
    } catch (error) {
      console.error("Failed to fetch product details:", error);
    }
    const product = products.find((p) => p.designerProductId === designerProductId) || null;
      setSelectedProduct(product);
  };

  const handleMypageClick=()=>{
    navigate('/model/mypage')
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
    />
  );
};

export default ModelLandingContainer;
