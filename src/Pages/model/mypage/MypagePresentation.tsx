import React, { ChangeEvent } from "react";
import {
  Box,
  Button,
  Flex,
  VStack,
  HStack,
  Image,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Textarea,
  List,
  ListItem,
  Badge,
  Icon,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Spinner,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

interface PetProfile {
  petName: string;
  petAge: number;
  petGender: string;
  breed: string;
  petImageUrl: string;
}

interface PetShop {
  petShopName: string;
  address: string;
  addressDetail: string;
}

interface DesignerProduct {
  designerProductId: string;
  title: string;
  introduction: string;
  design: string;
  modelPreferDescription: string;
  preferBreed: string;
  petShop: PetShop;
}

interface ReservationRequest {
  reservationRequestId: number;
  reservationRequestStatus: string;
  modelDescription: string;
  reservationRequestDate: string;
  designerProduct: DesignerProduct;
  createdAt: string;
}

interface ConfirmedReservation {
  reservationId: number;
  petShop: {
    petShopName: string;
    address: string;
    addressDetail: string;
  };
  design: string;
  reservationStatus: string;
  reservationRequestDate: string;
  createdAt: string;
}

const mapConfirmedToReservation = (
  confirmed: ConfirmedReservation
): ReservationRequest => ({
  reservationRequestId: confirmed.reservationId,
  reservationRequestStatus: confirmed.reservationStatus,
  modelDescription: "", // ConfirmedReservation에 해당하는 값이 없으면 기본값 할당
  reservationRequestDate: confirmed.reservationRequestDate,
  createdAt: confirmed.createdAt,
  designerProduct: {
    designerProductId: "", // 기본값 또는 적절한 값을 제공
    title: "", // 기본값 또는 적절한 값을 제공
    introduction: "", // 기본값 또는 적절한 값을 제공
    design: confirmed.design,
    modelPreferDescription: "", // 기본값 또는 적절한 값을 제공
    preferBreed: "", // 기본값 또는 적절한 값을 제공
    petShop: {
      petShopName: confirmed.petShop.petShopName,
      address: confirmed.petShop.address,
      addressDetail: confirmed.petShop.addressDetail,
    },
  },
});

interface Props {
  handleLandingClick: () => void;
  handleLogoutClick: () => void;
  profileImage: string;
  petProfile: PetProfile | null;
  onImageUpload: (file: File) => void;
  handleEditClick: () => void;
  reservations: ReservationRequest[];
  handleHomeClick: () => void;
  selectedReservation: ReservationRequest | null; // 선택된 예약 데이터
  setSelectedReservation: (reservation: ReservationRequest | null) => void; // 선택된 예약 설정 함수
  reviewContent: string; // 리뷰 내용
  setReviewContent: (content: string) => void; // 리뷰 내용 설정 함수
  handleReviewSubmit: () => void; // 리뷰 제출 핸들러
  confirmedReservations: ConfirmedReservation[];
  completedReservations: ConfirmedReservation[];
}

const MypagePresentation: React.FC<Props> = (props) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      props.onImageUpload(event.target.files[0]);
    }
  };

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
          <Text
            fontSize="xl"
            fontWeight="bold"
            cursor="pointer"
            onClick={props.handleHomeClick}
          >
            Mozip
          </Text>
          <HStack spacing={4}>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: "teal.300" }}
              onClick={props.handleLandingClick}
            >
              랜딩페이지
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
        </HStack>
      </Box>

      {/* 마이페이지 */}
      <Box paddingTop="6rem" paddingX="2rem">
        {/* 반려동물 프로필 */}
        <Flex alignItems="center" mb="6" ml="150px" mr="150px">
          <Box position="relative" w="250px" h="250px">
            <Image
              src={props.profileImage || "https://via.placeholder.com/250"}
              borderRadius="full"
              boxShadow="lg"
              objectFit="cover"
              w="100%"
              h="100%"
            />
            <Box
              position="absolute"
              bottom="10px"
              right="10px"
              bg="teal.500"
              borderRadius="full"
              p="2"
              cursor="pointer"
              boxShadow="lg"
            >
              <Icon as={FaCamera} color="white" />
              <Input
                type="file"
                accept="image/*"
                position="absolute"
                top="0"
                left="0"
                width="100%"
                height="100%"
                opacity="0"
                cursor="pointer"
                onChange={handleFileChange}
              />
            </Box>
          </Box>

          <VStack align="start" spacing="3" ml="100px">
            <Heading size="lg">
              {props.petProfile?.petName || "이름 없음"}
            </Heading>
            <Text color="gray.500" fontSize="md">
              종: {props.petProfile?.breed || "종 없음"}
            </Text>
            <Text color="gray.400" fontSize="md">
              나이: {props.petProfile?.petAge || "나이 없음"}
            </Text>
            <Text color="gray.400" fontSize="md">
              성별: {props.petProfile?.petGender || "성별 없음"}
            </Text>
            <Button
              colorScheme="teal"
              size="sm"
              mt="2"
              onClick={props.handleEditClick}
            >
              수정
            </Button>
          </VStack>
        </Flex>

        {/* 탭 메뉴 */}
        <Tabs variant="line" colorScheme="teal" ml="150px" mr="150px">
          <TabList>
            <Tab>현재 진행 중인 예약</Tab>
            <Tab>승인된 예약</Tab>
            <Tab>리뷰 작성하기</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <List spacing={3}>
                {props.reservations.map((reservation) => (
                  <ListItem
                    key={reservation.reservationRequestId}
                    borderWidth="1px"
                    borderRadius="lg"
                    padding="4"
                    boxShadow="lg"
                    bg="gray.50"
                    _hover={{ bg: "gray.100", transform: "scale(1.02)" }}
                    transition="all 0.2s"
                  >
                    {/* 제목과 상태 */}
                    <Heading size="lg" mb="2" color="teal.600">
                      {reservation.designerProduct.title}
                    </Heading>
                    <HStack
                      justifyContent="space-between"
                      alignItems="center"
                      mb="4"
                    >
                      <Text fontWeight="bold" fontSize="sm">
                        상태:
                      </Text>
                      {reservation.reservationRequestStatus === "PENDING" && (
                        <Box
                          as="span"
                          color="blue.500"
                          fontWeight="bold"
                          bg="blue.100"
                          px="2"
                          py="1"
                          borderRadius="md"
                          fontSize="xs"
                        >
                          ⭕ 대기 중
                        </Box>
                      )}
                      {reservation.reservationRequestStatus === "ACCEPTED" && (
                        <Box
                          as="span"
                          color="green.500"
                          fontWeight="bold"
                          bg="green.100"
                          px="2"
                          py="1"
                          borderRadius="md"
                          fontSize="xs"
                        >
                          ✔ 승인됨
                        </Box>
                      )}
                      {reservation.reservationRequestStatus === "REJECTED" && (
                        <Box
                          as="span"
                          color="red.500"
                          fontWeight="bold"
                          bg="red.100"
                          px="2"
                          py="1"
                          borderRadius="md"
                          fontSize="xs"
                        >
                          ❌ 거절됨
                        </Box>
                      )}
                      {reservation.reservationRequestStatus === "CANCELED" && (
                        <Box
                          as="span"
                          color="gray.500"
                          fontWeight="bold"
                          bg="gray.200"
                          px="2"
                          py="1"
                          borderRadius="md"
                          fontSize="xs"
                        >
                          🚫 취소됨
                        </Box>
                      )}
                    </HStack>

                    {/* 설명 */}
                    <Text fontSize="sm" color="gray.700" mb="2">
                      <Text as="span" fontWeight="bold">
                        설명:
                      </Text>{" "}
                      {reservation.modelDescription}
                    </Text>

                    {/* 예약일 */}
                    <Text fontSize="sm" color="gray.700" mb="2">
                      <Text as="span" fontWeight="bold">
                        예약일:
                      </Text>{" "}
                      {new Date(
                        reservation.reservationRequestDate
                      ).toLocaleDateString()}
                    </Text>

                    {/* 펫샵 정보 */}
                    <Box
                      bg="teal.50"
                      borderRadius="md"
                      p="3"
                      mt="3"
                      boxShadow="sm"
                    >
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color="teal.700"
                        mb="1"
                      >
                        펫샵 정보
                      </Text>
                      <Text fontSize="sm" color="teal.600">
                        이름: {reservation.designerProduct.petShop.petShopName}
                      </Text>
                      <Text fontSize="sm" color="teal.600">
                        주소: {reservation.designerProduct.petShop.address}{" "}
                        {reservation.designerProduct.petShop.addressDetail}
                      </Text>
                    </Box>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List>
                {props.confirmedReservations.map((reservation) => (
                  <ListItem key={reservation.reservationId}>
                    <Text>펫샵 이름: {reservation.petShop.petShopName}</Text>
                    <Text>디자인: {reservation.design}</Text>
                    <Text>예약 상태: {reservation.reservationStatus}</Text>
                    <Text>
                      예약일:{" "}
                      {new Date(
                        reservation.reservationRequestDate
                      ).toLocaleDateString()}
                    </Text>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <List spacing={4}>
                {props.completedReservations.map((reservation) => (
                  <ListItem
                    key={reservation.reservationId}
                    borderWidth="1px"
                    padding="4"
                    borderRadius="md"
                    onClick={() =>
                      props.setSelectedReservation(
                        mapConfirmedToReservation(reservation)
                      )
                    }
                    cursor="pointer"
                  >
                    <Text fontWeight="bold">
                      {reservation.petShop.petShopName}
                    </Text>
                    <Text>디자인: {reservation.design}</Text>
                  </ListItem>
                ))}
              </List>

              {props.selectedReservation && (
                <Modal
                  isOpen={true}
                  onClose={() => props.setSelectedReservation(null)}
                >
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>리뷰 작성</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                      <Textarea
                        placeholder="리뷰를 작성하세요"
                        value={props.reviewContent}
                        onChange={(e) => props.setReviewContent(e.target.value)}
                      />
                      <Button
                        mt={4}
                        colorScheme="teal"
                        onClick={props.handleReviewSubmit}
                        isDisabled={!props.reviewContent.trim()}
                      >
                        리뷰 제출
                      </Button>
                    </ModalBody>
                  </ModalContent>
                </Modal>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default MypagePresentation;
