import React from "react";
import { Box, Grid, Text, Stack, HStack, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";

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

interface Props {
  products: Product[];
  selectedProduct: Product | null;
  onProductClick: (designerProductId: string) => void;
  onCloseDetails: () => void;
}

const ModelLandingPresentation: React.FC<Props> = ({ products, selectedProduct, onProductClick, onCloseDetails }) => {
  return (
    <Box bgColor="#F0F4F8" width="100%" minHeight="100vh">
      {/* 상단바 */}
      <Box
        width="100%"
        bgColor="#2C3E50"
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
      <Stack alignItems="center" justifyContent="center" paddingTop="6rem" paddingX="2rem">
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
              cursor="pointer"
              onClick={() => onProductClick(product.designerProductId)}
            >
              <Text fontWeight="bold">{product.title}</Text>
              <Text>{product.introduction}</Text>
              <Text color="gray.500">{product.design}</Text>
              <Text>{product.modelPreferDescription}</Text>
              <Text>선호 품종: {product.preferBreed}</Text>
              <Text>
                상태: {product.productStatus === "AVAILABLE" ? "예약 가능" : "예약됨"}
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

      {/* 상세 모달 */}
      {selectedProduct && (
        <Modal isOpen={true} onClose={onCloseDetails}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedProduct.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold">설명: </Text>
              <Text>{selectedProduct.introduction}</Text>
              <Text fontWeight="bold" marginTop="1rem">디자인: </Text>
              <Text>{selectedProduct.design}</Text>
              <Text fontWeight="bold" marginTop="1rem">선호 품종: </Text>
              <Text>{selectedProduct.preferBreed}</Text>
              <Text fontWeight="bold" marginTop="1rem">주소: </Text>
              <Text>
                {selectedProduct.petShop.address} {selectedProduct.petShop.addressDetail}
              </Text>
              <Text fontWeight="bold" marginTop="1rem">등록일: </Text>
              <Text>{new Date(selectedProduct.createdAt).toLocaleDateString()}</Text>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ModelLandingPresentation;
