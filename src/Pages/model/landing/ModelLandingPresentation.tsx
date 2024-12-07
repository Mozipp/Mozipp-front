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

interface Review {
  reviewId: number;
  reviewContent: string;
  createdAt: string;
}

// 목록 데이터 타입
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

interface Product {
  designerProductId: number;
  title: string;
  introduction: string;
  design: string;
  modelPreferDescription: string;
  preferBreed: string;
  productStatus: "AVAILABLE" | "UNAVAILABLE";
  petShop: PetShop;
  createdAt: string;
  name: string; // 추가
  gender: string; // 추가
  career: string; // 추가
  petGroomingImageUrl: { imageUrl: string }[]; // 추가
  reviews: Review[]; // 추가
}

interface Props {
  products: ProductSummary[];
  selectedProduct: ProductDetails | null;
  onProductClick: (designerProductId: number) => void;
  onCloseDetails: () => void;
  isLoading: boolean;
  handleMypageClick: () => void;
  handleLogoutClick: () => void;
  handleHomeClick: () => void;
  handleReservation: (
    designerProductId: number,
    modelDescription: string
  ) => void;
}

const ModelLandingPresentation: React.FC<Props> = (props) => {
  const [description, setDescription] = useState<string>(""); // Description 상태 추가
  const [isInputVisible, setIsInputVisible] = useState<boolean>(false); // Input 표시 상태
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
              <Text
                fontWeight="bold"
                fontSize="xl"
                mb="0.5rem"
                color="teal.600"
              >
                {product.title}
              </Text>
              <Text fontSize="sm" color="gray.600" mb="0.5rem" noOfLines={2}>
                {product.introduction}
              </Text>
              <Text fontSize="sm" color="gray.500" mb="0.5rem">
                <strong>디자인:</strong> {product.design}
              </Text>
              <Text fontSize="sm" color="gray.500" mb="0.5rem">
                <strong>선호 품종:</strong> {product.preferBreed}
              </Text>
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

      {props.selectedProduct && (
        <Modal isOpen={true} onClose={props.onCloseDetails} size="lg">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader bg="teal.500" color="white" textAlign="center">
              상세정보
            </ModalHeader>
            <ModalCloseButton color="white" />
            <ModalBody bg="gray.50" p="6">
              {/* 이름, 성별, 경력 */}
              <Box mb="4">
                <Text fontWeight="bold" fontSize="lg" color="teal.600">
                  이름:
                </Text>
                <Text fontSize="md" color="gray.700">
                  {props.selectedProduct.name}
                </Text>
              </Box>
              <Box mb="4">
                <Text fontWeight="bold" fontSize="lg" color="teal.600">
                  성별:
                </Text>
                <Text fontSize="md" color="gray.700">
                  {props.selectedProduct.gender === "MALE" ? "남자" : "여자"}
                </Text>
              </Box>
              <Box mb="4">
                <Text fontWeight="bold" fontSize="lg" color="teal.600">
                  경력:
                </Text>
                <Text fontSize="md" color="gray.700">
                  {props.selectedProduct.career}
                </Text>
              </Box>
              <Box mb="4">
                <Text fontWeight="bold" fontSize="lg" color="teal.600">
                  위치:
                </Text>
                <Text fontSize="md" color="gray.700">
                  {props.selectedProduct.petShop.address}{" "}
                  {props.selectedProduct.petShop.addressDetail}
                </Text>
              </Box>

              {/* 미용 이미지 */}
              <Box mb="4">
                <Text fontWeight="bold" fontSize="lg" color="teal.600" mb="2">
                  미용 이미지:
                </Text>
                <Grid
                  templateColumns="repeat(auto-fill, minmax(100px, 1fr))"
                  gap="2"
                  bg="white"
                  p="2"
                  borderRadius="md"
                  shadow="sm"
                >
                  {props.selectedProduct.petGroomingImageUrl.map(
                    (image, index) => (
                      <Box
                        key={index}
                        borderWidth="1px"
                        borderRadius="md"
                        overflow="hidden"
                        shadow="md"
                        cursor="pointer"
                        onClick={() => setSelectedImage(image.imageUrl)} // 이미지 클릭 시 상태 업데이트
                      >
                        <img
                          src={image.imageUrl}
                          alt={`Grooming ${index}`}
                          width="100%"
                        />
                      </Box>
                    )
                  )}
                </Grid>
              </Box>

              {/* 리뷰 */}
              <Box>
                <Text fontWeight="bold" fontSize="lg" color="teal.600" mb="2">
                  리뷰:
                </Text>
                {props.selectedProduct.reviews.length > 0 ? (
                  props.selectedProduct.reviews.map((review) => (
                    <Box
                      key={review.reviewId}
                      borderWidth="1px"
                      borderRadius="md"
                      p="3"
                      bg="white"
                      shadow="sm"
                      mb="3"
                    >
                      <Text fontSize="md" color="gray.700">
                        {review.reviewContent}
                      </Text>
                      <Text
                        fontSize="xs"
                        color="gray.500"
                        textAlign="right"
                        mt="1"
                      >
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Text>
                    </Box>
                  ))
                ) : (
                  <Text fontSize="md" color="gray.500">
                    리뷰가 없습니다.
                  </Text>
                )}
              </Box>

              {/* 예약 버튼 */}
              {!isInputVisible && (
                <Button
                  colorScheme="teal"
                  width="full"
                  mt="4"
                  size="lg"
                  shadow="md"
                  onClick={() => setIsInputVisible(true)} // Input 표시
                >
                  예약하기
                </Button>
              )}

              {/* 예약 요청 메시지 입력 필드 */}
              {isInputVisible && (
                <>
                  <FormControl id="description" mt="4">
                    <FormLabel fontWeight="bold" color="teal.600">
                      예약 요청 메시지
                    </FormLabel>
                    <Input
                      type="text"
                      placeholder="예약 요청 메시지를 입력하세요"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      size="lg"
                    />
                  </FormControl>
                  <Button
                    colorScheme="teal"
                    width="full"
                    mt="4"
                    size="lg"
                    shadow="md"
                    onClick={() =>
                      props.handleReservation(
                        props.selectedProduct!.designerProductId,
                        description.trim() // 메시지 전달
                      )
                    }
                    isDisabled={!description.trim()} // 입력값 없으면 비활성화
                  >
                    예약 요청 전송
                  </Button>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      )}

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <Modal
          isOpen={true}
          onClose={() => setSelectedImage(null)}
          size="4xl" // Increased size for better viewing
          isCentered // Center the modal
        >
          <ModalOverlay
            bg="blackAlpha.700" // Dark overlay
            backdropFilter="blur(4px)" // Blur effect
          />
          <ModalContent
            bg="transparent"
            boxShadow="lg"
            maxWidth="90vw" // Max width: 90% of the viewport width
            maxHeight="90vh" // Max height: 90% of the viewport height
            overflow="hidden"
            borderRadius="xl"
            position="relative"
          >
            <ModalCloseButton
              color="white"
              bg="blackAlpha.600"
              borderRadius="full"
              p={2}
              right={4}
              top={4}
              zIndex={10} // Ensure the close button is on top
            />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              width="100%"
              height="100%"
              padding={4}
              overflow="hidden"
            >
              <Box
                position="relative"
                width="100%"
                height="0"
                paddingBottom="56.25%" // Aspect ratio: 16:9 (common for images)
                overflow="hidden"
              >
                <img
                  src={selectedImage}
                  alt="확대된 이미지"
                  style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    objectFit: "contain", // Maintain aspect ratio
                    borderRadius: "0.75rem",
                    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                  }}
                />
              </Box>
            </Box>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default ModelLandingPresentation;
