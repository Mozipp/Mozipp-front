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
  Flex,
  Spacer,
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
  handleReservation: (
    designerProductId: string,
    modelDescription: string
  ) => void;
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
        <Flex
          justifyContent="space-between" /* 좌우 끝 배치 */
          alignItems="center"
          maxWidth="1200px"
          mx="auto"
        >
          {/* 왼쪽: Mozip */}
          <Text
            fontSize="xl"
            fontWeight="bold"
            cursor="pointer"
            onClick={props.handleHomeClick}
          >
            Mozip
          </Text>
          <Spacer />

          {/* 오른쪽: 버튼들 */}
          <HStack spacing={4}>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: "teal.300" }}
              onClick={props.handleMypageClick}
            >
              마이페이지
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: "teal.300" }}
              onClick={props.handleLogoutClick}
            >
              로그아웃
            </Button>
          </HStack>
        </Flex>
      </Box>

      {/* 콘텐츠 영역 */}
      <Stack
        alignItems="center"
        justifyContent="center"
        paddingTop="6rem"
        paddingX="2rem"
      >
        <Text fontSize="2xl" fontWeight="bold" marginBottom="1rem">
          상품 리스트
        </Text>
        <Grid
          templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
          gap="1.5rem"
          width="100%"
          maxWidth="1200px"
          px="2rem"
        >
          {props.products.map((product) => (
            <Box
              key={product.designerProductId}
              borderWidth="1px"
              borderRadius="lg"
              padding="1.5rem"
              bgColor="white"
              shadow="lg"
              cursor="pointer"
              transition="transform 0.3s, box-shadow 0.3s"
              _hover={{ transform: "scale(1.05)", shadow: "2xl" }}
              onClick={() => props.onProductClick(product.designerProductId)}
            >
              {/* 제목 */}
              <Text
                fontWeight="bold"
                fontSize="xl"
                mb="0.5rem"
                color="teal.600"
                noOfLines={1}
              >
                {product.title}
              </Text>

              {/* 설명 */}
              <Text fontSize="sm" color="gray.600" mb="0.5rem" noOfLines={2}>
                {product.introduction}
              </Text>

              {/* 디자인 및 선호 품종 */}
              <Text fontSize="sm" color="gray.500" mb="0.5rem">
                <strong>디자인:</strong> {product.design}
              </Text>
              <Text fontSize="sm" color="gray.500" mb="0.5rem">
                <strong>선호 품종:</strong> {product.preferBreed}
              </Text>

              {/* 상태 */}
              <Text
                fontSize="sm"
                fontWeight="bold"
                color={
                  product.productStatus === "AVAILABLE"
                    ? "green.500"
                    : "red.500"
                }
                mb="1rem"
              >
                {product.productStatus === "AVAILABLE"
                  ? "✔ 예약 가능"
                  : "❌ 예약됨"}
              </Text>

              {/* 펫샵 정보 */}
              <Box bg="gray.50" p="3" borderRadius="md" shadow="sm" mb="1rem">
                <Text
                  fontWeight="bold"
                  fontSize="sm"
                  color="teal.700"
                  mb="0.5rem"
                >
                  펫샵 정보
                </Text>
                <Text fontSize="sm" color="teal.600">
                  이름: {product.petShop.petShopName}
                </Text>
                <Text fontSize="sm" color="teal.600">
                  주소: {product.petShop.address}{" "}
                  {product.petShop.addressDetail}
                </Text>
              </Box>

              {/* 등록일 */}
              <Text fontSize="xs" color="gray.400" textAlign="right">
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
              <Text>
                {new Date(props.selectedProduct.createdAt).toLocaleDateString()}
              </Text>

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
