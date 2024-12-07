import React from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Text,
  Stack,
  HStack,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Spinner,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";

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
  isLoading: boolean;
  handleMypageClick: () => void;
  handleLogoutClick: () => void;
  handleHomeClick: () => void;
  handleReservation: (designerProductId: string, modelDescription: string) => void;
}

const ModelLandingPresentation: React.FC<Props> = (props) => {
  const [description, setDescription] = useState<string>(""); // Description 상태 추가
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false); // Input 표시 상태

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
            <Button variant="ghost" color="white" _hover={{ color: "teal.300" }} onClick={props.handleMypageClick}>
              마이페이지
            </Button>
            <Button variant="ghost" color="white" _hover={{ color: "teal.300" }} onClick={props.handleLogoutClick} >
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
          {props.products.map((product) => (
            <Box
              key={product.designerProductId}
              borderWidth="1px"
              borderRadius="md"
              padding="1rem"
              bgColor="#f9f9f9"
              shadow="md"
              cursor="pointer"
              onClick={() => props.onProductClick(product.designerProductId)}
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

      {/* 로딩창 */}
      {props.isLoading && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          backgroundColor="rgba(0, 0, 0, 0.4)"
          zIndex="999"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" color="white" thickness="4px" speed="0.65s" />
        </Box>
      )}

      {/* 상세 모달 */}
      {props.selectedProduct && (
        <Modal isOpen={true} onClose={props.onCloseDetails}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{props.selectedProduct.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text fontWeight="bold">설명:</Text>
              <Text>{props.selectedProduct.introduction}</Text>
              <Text fontWeight="bold" mt="1rem">
                디자인:
              </Text>
              <Text>{props.selectedProduct.design}</Text>
              <Text fontWeight="bold" mt="1rem">
                선호 품종:
              </Text>
              <Text>{props.selectedProduct.preferBreed}</Text>
              <Text fontWeight="bold" mt="1rem">
                주소:
              </Text>
              <Text>
                {props.selectedProduct.petShop.address}{" "}
                {props.selectedProduct.petShop.addressDetail}
              </Text>
              <Text fontWeight="bold" mt="1rem">
                등록일:
              </Text>
              <Text>{new Date(props.selectedProduct.createdAt).toLocaleDateString()}</Text>

              {/* 예약하기 버튼 */}
              {!isInputVisible && (
                <Button
                  colorScheme="teal"
                  width="full"
                  mt="1rem"
                  onClick={() => setIsInputVisible(true)} // Input 표시
                >
                  예약하기
                </Button>
              )}

              {/* Description 입력 필드 */}
              {isInputVisible && (
                <>
                  <FormControl id="description" mt="1rem">
                    <FormLabel>예약 요청 메시지</FormLabel>
                    <Input
                      type="text"
                      placeholder="예약 요청 메시지를 입력하세요"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </FormControl>
                  <Button
                    colorScheme="teal"
                    width="full"
                    mt="1rem"
                    onClick={() =>
                      props.handleReservation(
                        props.selectedProduct!.designerProductId,
                        description // Description 전달
                      )
                    }
                    isDisabled={!description.trim()} // Description이 없으면 비활성화
                  >
                    예약 요청 전송
                  </Button>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ModelLandingPresentation;  