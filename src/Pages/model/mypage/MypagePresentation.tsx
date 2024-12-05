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
} from "@chakra-ui/react";
import { FaCamera } from "react-icons/fa";

interface Props {
  handleLandingClick: () => void;
  handleLogoutClick: () => void;
  profileImage: string;
  onImageUpload: (file: File) => void;
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
            onClick={props.handleLandingClick}
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
      <Box
        alignItems="center"
        justifyContent="center"
        paddingTop="6rem"
        paddingX="2rem"
      >
        {/* 반려동물 프로필 */}
        <Flex alignItems="center" mb="6" ml="150px" mr="150px">
          <Box position="relative">
            <Image
              boxSize="250px"
              src={props.profileImage}
              borderRadius="full"
              boxShadow="lg"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            <Box
              position="absolute"
              bottom="0"
              right="0"
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
          <VStack align="start" spacing="1" ml="100px">
            <HStack>
              <Heading size="lg">마루쫑쫑</Heading>
              <Text color="gray.500">(골든 리트리버)</Text>
            </HStack>
            <Text color="gray.400">나이: 3살</Text>
            <Text color="gray.400">성별: 공주님</Text>
            <Button colorScheme="teal">수정</Button>
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
            {/* Overview 탭 */}
            <TabPanel>
              <Heading size="md" mb="4">
                Pet Characteristics
              </Heading>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                  <Box
                    bg="white"
                    shadow="md"
                    borderRadius="md"
                    padding="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Heading size="sm" mb="2">
                      Temperament
                    </Heading>
                    <Text>Friendly and energetic</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    bg="white"
                    shadow="md"
                    borderRadius="md"
                    padding="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Heading size="sm" mb="2">
                      Training
                    </Heading>
                    <Text>Well-trained, knows basic commands</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    bg="white"
                    shadow="md"
                    borderRadius="md"
                    padding="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Heading size="sm" mb="2">
                      Diet
                    </Heading>
                    <Text>Premium dry food, 2 meals per day</Text>
                  </Box>
                </GridItem>
                <GridItem>
                  <Box
                    bg="white"
                    shadow="md"
                    borderRadius="md"
                    padding="4"
                    borderWidth="1px"
                    borderColor="gray.200"
                  >
                    <Heading size="sm" mb="2">
                      Exercise
                    </Heading>
                    <Text>2 walks daily, loves fetch</Text>
                  </Box>
                </GridItem>
              </Grid>
            </TabPanel>

            {/* Health Records 탭 */}
            <TabPanel>
              <Text>Health records content goes here...</Text>
            </TabPanel>

            {/* Gallery 탭 */}
            <TabPanel>
              <Text>Gallery content goes here...</Text>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default MypagePresentation;
