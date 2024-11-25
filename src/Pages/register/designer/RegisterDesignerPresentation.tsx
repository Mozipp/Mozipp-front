import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Text,
} from "@chakra-ui/react";

interface RegisterDesignerPresentationProps {
  formData: {
    name: string;
    gender: string;
    username: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  clickBack: () => void;
  isFormValid: boolean;
  error: string | null;
}

const RegisterDesignerPresentation: React.FC<RegisterDesignerPresentationProps> = ({
  formData,
  handleChange,
  handleSubmit,
  clickBack,
  isFormValid,
  error,
}) => {
  return (
    <Box maxW="400px" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>이름</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력하세요"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>성별</FormLabel>
            <Select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="MALE">남성</option>
              <option value="FEMALE">여성</option>
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>사용자 이름</FormLabel>
            <Input
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="사용자 이름을 입력하세요"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>비밀번호</FormLabel>
            <Input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </FormControl>
          {error && <Text color="red.500">{error}</Text>}
          <Button
            colorScheme="purple"
            width="full"
            type="submit"
            isDisabled={!isFormValid}
          >
            회원가입
          </Button>
          <Button color="purple" width="full" onClick={clickBack}>
            뒤로가기
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterDesignerPresentation;
