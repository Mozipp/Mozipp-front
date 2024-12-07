import React, { ChangeEvent } from "react";
import {
  Box,
  Button,
  Flex,
  VStack,
  HStack,
  Avatar,
  Image,
  Text,
  Heading,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Icon,
  Input,
  List,
  ListItem,
  Badge,
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

interface PetProfile {
  petName: string;
  petAge: number;
  petGender: string;
  breed: string;
  petImageUrl: string;
}

interface Reservation {
  reservationId: string;
  designerProductTitle: string;
  status: string;
  reservationDate: string;
}

interface Props {
  handleLandingClick: () => void;
  handleLogoutClick: () => void;
  profileImage: string;
  petProfile: PetProfile | null;
  onImageUpload: (file: File) => void;
  handleEditClick: () => void;
  reservations: Reservation[]; // 예약 리스트
}

const MypagePresentation: React.FC<Props> = (props) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      props.onImageUpload(event.target.files[0]);
    }
  };

  const reservations = props.reservations || []; // 기본값 설정

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
          <Text fontSize="xl" fontWeight="bold" cursor="pointer" onClick={props.handleLandingClick}>
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
              src={
                props.profileImage ||
                "https://via.placeholder.com/250"
              }
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
            <HStack>
              이름: <Heading size="lg">{props.petProfile?.petName || "이름 없음"}</Heading>
              <Text color="gray.500" fontSize="md">
                종: {props.petProfile?.breed || "종 없음"}
              </Text>
            </HStack>
            <Text color="gray.400" fontSize="md">
              나이: {props.petProfile?.petAge || "나이 없음"}
            </Text>
            <Text color="gray.400" fontSize="md">
              성별: {props.petProfile?.petGender || "성별 없음"}
            </Text>
            <Button colorScheme="teal" size="sm" mt="2" onClick={props.handleEditClick}>
              수정
            </Button>
          </VStack>
        </Flex>

        {/* 탭 메뉴 */}
        <Tabs variant="line" colorScheme="teal" ml="150px" mr="150px">
          <TabList>
            <Tab>현재 진행 중인 예약</Tab>
            <Tab>리뷰 작성하기</Tab>
            <Tab>완료한 리뷰</Tab>
          </TabList>
          <TabPanels>
            {/* 현재 진행 중인 예약 */}
            <TabPanel>
              <List spacing={3}>
                {reservations.map((reservation) => (
                  <ListItem
                    key={reservation.reservationId}
                    borderWidth="1px"
                    borderRadius="md"
                    padding="3"
                    boxShadow="md"
                    bg="white"
                  >
                    <Heading size="sm">{reservation.designerProductTitle}</Heading>
                    <Text>상태: <Badge colorScheme="blue">{reservation.status}</Badge></Text>
                    <Text>예약일: {new Date(reservation.reservationDate).toLocaleDateString()}</Text>
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            {/* 리뷰 작성하기 */}
            <TabPanel>
              <Text>리뷰 작성하기 컨텐츠</Text>
            </TabPanel>

            {/* 완료한 리뷰 */}
            <TabPanel>
              <Text>완료한 리뷰 컨텐츠</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default MypagePresentation;
