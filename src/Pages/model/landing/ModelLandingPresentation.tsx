import React from "react";
import { Box, Grid, Text, Stack, HStack, Button } from "@chakra-ui/react";

// ModelLandingContainer에서 동일한 타입 정의를 여기에 복사
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

// props 타입 정의
interface Props {
  products: Product[];
}

const ModelLandingPresentation: React.FC<Props> = ({ products }) => {
  return (
    <Box bgColor="#F0F4F8" width="100%" minHeight="100vh">
      {/* 상단바 */}
      <Box
        width="100%"
        bgColor="#2C3E50" // 상단바 색상
        padding="1rem"
        color="white"
        position="fixed"
        top="0"
        zIndex="10"
      >
        <HStack justifyContent="space-between" maxWidth="1200px" mx="auto">
          <Text fontSize="xl" fontWeight="bold" cursor="pointer">
            Mozip
          </Text>
          <HStack spacing={4}>
            <Button variant="ghost" color="white" _hover={{ color: "teal.300" }}>
              마이페이지
            </Button>
            <Button variant="ghost" color="white" _hover={{ color: "teal.300" }}>
              로그아웃
            </Button>
          </HStack>
        </HStack>
      </Box>
  
      {/* 콘텐츠 영역 */}
      <Stack
        alignItems="center"
        justifyContent="center"
        paddingTop="6rem" // 상단바 높이에 맞춘 여백 추가
        paddingX="2rem"
      >
        <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
          상품 리스트
        </Text>
        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap="1rem" width="100%" maxWidth="1200px">
          {products.map((product) => (
            <Box
              key={product.designerProductId}
              borderWidth="1px"
              borderRadius="md"
              padding="1rem"
              bgColor="#f9f9f9"
              shadow="md"
            >
              <Text fontWeight="bold">{product.title}</Text>
              <Text>{product.introduction}</Text>
              <Text color="gray.500">{product.design}</Text>
              <Text>{product.modelPreferDescription}</Text>
              <Text>선호 품종: {product.preferBreed}</Text>
              <Text>
                상태:{" "}
                {product.productStatus === "AVAILABLE"
                  ? "예약 가능"
                  : "예약됨"}
              </Text>
              <Box marginTop="0.5rem">
                <Text fontWeight="bold">{product.petShop.petShopName}</Text>
                <Text>
                  {product.petShop.address} {product.petShop.addressDetail}
                </Text>
              </Box>
              <Text fontSize="sm" color="gray.400">
                등록일: {new Date(product.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
};  

export default ModelLandingPresentation;
