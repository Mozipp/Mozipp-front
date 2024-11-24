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

interface ModelLoginPresentationProps {
  id: string;
  password: string;
  error: string | null;
  setId: (id: string) => void; // setId로 변경
  setPassword: (password: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  clickHome: () => void;
  clickDesigner: () => void;
  clickRegisterModel: () => void;
}

const ModelLoginPresentation: React.FC<ModelLoginPresentationProps> = (
  props
) => {
  return (
    <Box maxW="400px" mx="auto" mt="8" p="6">
      <HStack mb="4">
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="뒤로가기"
          onClick={props.clickHome}
          variant="ghost"
        />
        <Text fontSize="2xl" fontWeight="bold" textAlign="center">
          모델 로그인🐶
        </Text>
      </HStack>
      <VStack spacing="4">
        <FormControl>
          <Input
            type="text" // id 입력란
            value={props.id}
            onChange={(e) => props.setId(e.target.value)} // setId로 변경
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
        {props.error && (
          <Text color="red.500" fontSize="sm">
            {props.error}
          </Text>
        )}
        <Button colorScheme="teal" width="full" mt="10" onClick={props.handleSubmit}>
          로그인
        </Button>
        <HStack wrap="nowrap" align="center">
          <Text fontSize="15px">견주가 아니신가요?</Text>
          <Text
            textDecoration="underline"
            fontWeight="bold"
            color="teal"
            cursor="pointer"
            _hover={{
              color: "teal",
              textDecoration: "none",
            }}
            transition="color 0.2s ease-in-out"
            onClick={props.clickDesigner}
          >
            디자이너 로그인 하러가기✂️
          </Text>
        </HStack>
        <Button
          mt="10"
          colorScheme="teal"
          width="full"
          variant="outline"
          onClick={props.clickRegisterModel}
        >
          계정이 없으신가요? 회원가입하기
        </Button>
      </VStack>
    </Box>
  );
};

export default ModelLoginPresentation;
