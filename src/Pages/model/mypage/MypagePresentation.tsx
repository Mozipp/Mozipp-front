import React from "react";
import {
  Box,
  Avatar,
  VStack,
  HStack,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Heading,
  Text,
  Stack,
} from "@chakra-ui/react";

interface UserProfile {
  name: string;
  age: number;
  gender: "남성" | "여성";
  dogBreed: string;
  imageUrl: string;
}

interface MypageProps {
  profile: UserProfile;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const MypagePresentation: React.FC<MypageProps> = ({
  profile,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  onImageUpload,
  onInputChange,
}) => {
  return (
    <Box bg="gray.50" minH="100vh" py={10}>
      <VStack spacing={8} maxW="lg" mx="auto" bg="white" p={8} rounded="lg" shadow="lg">
        <Heading as="h1" size="xl" textAlign="center" color="gray.700">
          마이페이지
        </Heading>

        {/* 프로필 이미지 */}
        <Box position="relative">
          <Avatar
            src={profile.imageUrl}
            size="2xl"
            boxSize="500px"
            borderRadius="full"
            shadow="lg"
            objectFit="cover"
          />
          {isEditing && (
            <Box mt={4} textAlign="center">
              <Button as="label" variant="outline" colorScheme="blue" htmlFor="file-upload">
                사진 변경
              </Button>
              <Input
                id="file-upload"
                type="file"
                onChange={onImageUpload}
                display="none"
                accept="image/*"
              />
            </Box>
          )}
        </Box>

        {/* 프로필 정보 */}
        <Stack spacing={4} w="full">
          <FormControl>
            <FormLabel>이름</FormLabel>
            <Input
              name="name"
              value={profile.name}
              onChange={onInputChange}
              isDisabled={!isEditing}
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel>나이</FormLabel>
            <Input
              type="number"
              name="age"
              value={profile.age}
              onChange={onInputChange}
              isDisabled={!isEditing}
              focusBorderColor="blue.500"
            />
          </FormControl>

          <FormControl>
            <FormLabel>성별</FormLabel>
            <Select
              name="gender"
              value={profile.gender}
              onChange={onInputChange}
              isDisabled={!isEditing}
              focusBorderColor="blue.500"
            >
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>견종</FormLabel>
            <Input
              name="dogBreed"
              value={profile.dogBreed}
              onChange={onInputChange}
              isDisabled={!isEditing}
              focusBorderColor="blue.500"
            />
          </FormControl>
        </Stack>

        {/* 버튼 섹션 */}
        <HStack spacing={4} pt={4}>
          {!isEditing ? (
            <Button colorScheme="blue" onClick={onEdit}>
              수정하기
            </Button>
          ) : (
            <>
              <Button variant="outline" colorScheme="gray" onClick={onCancel}>
                취소
              </Button>
              <Button colorScheme="green" onClick={onSave}>
                저장하기
              </Button>
            </>
          )}
        </HStack>
      </VStack>
    </Box>
  );
};

export default MypagePresentation;
