import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  RadioGroup,
  Radio,
  Stack,
  VStack,
} from "@chakra-ui/react";

interface RegisterModelPresentationProps {
  formData: {
    name: string;
    gender: string;
    username: string;
    password: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  clickBack: () => void;
}

const RegisterModelPresentation: React.FC<RegisterModelPresentationProps> = (
  props
) => {
  return (
    <Box maxW="400px" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">
      <form onSubmit={props.handleSubmit}>
        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>이름</FormLabel>
            <Input
              name="name"
              value={props.formData.name}
              onChange={props.handleChange}
              placeholder="이름을 입력하세요"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>성별</FormLabel>
            <RadioGroup name="gender" defaultValue={props.formData.gender} onChange={(value) => props.handleChange({ target: { name: "gender", value } } as any)}>
              <Stack direction="row">
                <Radio value="MALE">남성</Radio>
                <Radio value="FEMALE">여성</Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>사용자 이름</FormLabel>
            <Input
              name="username"
              value={props.formData.username}
              onChange={props.handleChange}
              placeholder="사용자 이름을 입력하세요"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>비밀번호</FormLabel>
            <Input
              name="password"
              type="password"
              value={props.formData.password}
              onChange={props.handleChange}
              placeholder="비밀번호를 입력하세요"
            />
          </FormControl>
          <Button colorScheme="teal" width="full" type="submit">
            회원가입
          </Button>
          <Button color="teal" width="full" onClick={props.clickBack}>
            뒤로가기
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default RegisterModelPresentation;
