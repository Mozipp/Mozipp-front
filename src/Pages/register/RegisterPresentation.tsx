import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Container,
  FormErrorMessage,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";

interface RegisterPresentationProps {
  formData: {
    id: string;
    username: string;
    email: string;
    password: string;
    age: number;
    sex: "male" | "female";
    confirmPassword: string;
  };
  errors: {
    id: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSexChange: (sex: "male" | "female") => void;
}

const RegisterPresentation: React.FC<RegisterPresentationProps> = (
  props: RegisterPresentationProps
) => {
  return (
    <Box bg="gray.50" minH="100vh" py={12}>
      <Container maxW="md">
        <VStack spacing={8} bg="white" p={8} borderRadius="lg" boxShadow="lg">
          <Heading as="h2" size="xl" textAlign="center">
            회원가입
          </Heading>
          <form onSubmit={props.handleSubmit} style={{ width: "100%" }}>
            <VStack spacing={4} align="stretch">
              {/* 사용자 이름 */}
              <FormControl isInvalid={!!props.errors.username}>
                <FormLabel htmlFor="username">사용자 이름</FormLabel>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  value={props.formData.username}
                  onChange={props.handleChange}
                />
                <FormErrorMessage>{props.errors.username}</FormErrorMessage>
              </FormControl>

              {/* 이메일 */}
              <FormControl isInvalid={!!props.errors.email}>
                <FormLabel htmlFor="email">이메일 주소</FormLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={props.formData.email}
                  onChange={props.handleChange}
                />
                <FormErrorMessage>{props.errors.email}</FormErrorMessage>
              </FormControl>

              {/* 비밀번호 */}
              <FormControl isInvalid={!!props.errors.password}>
                <FormLabel htmlFor="password">비밀번호</FormLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={props.formData.password}
                  onChange={props.handleChange}
                />
                <FormErrorMessage>{props.errors.password}</FormErrorMessage>
              </FormControl>

              {/* 비밀번호 확인 */}
              <FormControl isInvalid={!!props.errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={props.formData.confirmPassword}
                  onChange={props.handleChange}
                />
                <FormErrorMessage>
                  {props.errors.confirmPassword}
                </FormErrorMessage>
              </FormControl>

              {/* 나이 */}
              <FormControl>
                <FormLabel htmlFor="age">나이</FormLabel>
                <Input
                  id="age"
                  name="age"
                  type="number"
                  value={props.formData.age}
                  onChange={props.handleChange}
                />
              </FormControl>

              {/* 성별 */}
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="sex" mb="0" mr={4}>
                  성별
                </FormLabel>
                <Tabs
                  variant="soft-rounded"
                  colorScheme={props.formData.sex === "male" ? "blue" : "pink"}
                  onChange={(index) =>
                    props.handleSexChange(index === 0 ? "male" : "female")
                  }
                  index={props.formData.sex === "male" ? 0 : 1}
                >
                  <TabList>
                    <Tab>남자</Tab>
                    <Tab>여자</Tab>
                  </TabList>
                </Tabs>
              </FormControl>

              <Button type="submit" colorScheme="blue" size="lg" width="full">
                가입하기
              </Button>
            </VStack>
          </form>
        </VStack>
      </Container>
    </Box>
  );
};

export default RegisterPresentation;
