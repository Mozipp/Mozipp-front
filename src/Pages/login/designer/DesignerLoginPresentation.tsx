import React from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  Text,
  VStack,
  HStack,
  IconButton,
} from "@chakra-ui/react";

import { ArrowBackIcon } from "@chakra-ui/icons";

interface DesignerLoginPresentationProps {
  id: string; // email -> id
  password: string;
  error: string | null;
  setId: (id: string) => void; // setEmail -> setId
  setPassword: (password: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  clickHome: () => void;
  clickModel: () => void;
  clickRegisterDesigner: () => void;
}

const DesignerLoginPresentation: React.FC<DesignerLoginPresentationProps> = (props) => {
  return (
    <Box maxW="400px" mx="auto" mt="8" p="6">
      {/* 상단바 */}
      <HStack mb="4">
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="뒤로가기"
          onClick={props.clickHome}
          variant="ghost"
        />
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          디자이너 로그인 ✂️
        </Text>
      </HStack>

      <VStack spacing="4" onKeyDown={props.handleKeyDown}>
        <FormControl>
          <Input
            type="text" // email -> text
            value={props.id} // email -> id
            onChange={(e) => props.setId(e.target.value)} // setEmail -> setId
            placeholder="아이디를 입력하세요"
            required
          />
        </FormControl>
        <FormControl>
          <Input
            type="password"
            value={props.password}
            onChange={(e) => props.setPassword(e.target.value)}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </FormControl>

        {/* 에러 메시지 */}
        {props.error && (
          <Text color="red.500" fontSize="sm">
            {props.error}
          </Text>
        )}

        {/* 로그인 버튼 */}
        <Button colorScheme="purple" width="full" mt="10" onClick={props.handleSubmit}>
          로그인
        </Button>

        {/* 하단 링크 */}
        <HStack wrap="nowrap" align="center">
          <Text fontSize="15px">디자이너가 아니신가요?</Text>
          <Text
            textDecoration="underline"
            fontWeight="bold"
            color="purple"
            cursor="pointer"
            _hover={{
              color: "purple.600",
              textDecoration: "none",
            }}
            transition="color 0.2s ease-in-out"
            onClick={props.clickModel}
          >
            모델 로그인 하러가기 🐶
          </Text>
        </HStack>

        {/* 회원가입 버튼 */}
        <Button
          mt="10"
          colorScheme="purple"
          width="full"
          variant="outline"
          onClick={props.clickRegisterDesigner}
        >
          계정이 없으신가요? 회원가입하기
        </Button>
      </VStack>
    </Box>
  );
};

export default DesignerLoginPresentation;
