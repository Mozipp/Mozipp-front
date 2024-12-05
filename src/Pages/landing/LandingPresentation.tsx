import React from "react";
import { css, keyframes } from "@emotion/react";
import { Image, Box, Button, Stack, HStack, VStack, Text, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface LandingPresentationProps {
  images: string[];
  currentImageIndex: number;
  clickCustomer: () => void;
  clickDesigner: () => void;
}

const fadeInOut = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

const LandingPresentation = (props: LandingPresentationProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  // Access Token 가져오기
  const getAccessToken = (): string | null => {
    const cookies = document.cookie.split("; ");
    const token = cookies.find((cookie) => cookie.startsWith("access_token="));
    return token ? token.split("=")[1] : null;
  };

  // Access Token의 역할 확인 함수 (디자이너인지 모델인지)
  const decodeRoleFromToken = (token: string): "DESIGNER" | "MODEL" | null => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1])); // 토큰의 payload 디코딩
      return payload.role; // role이 "DESIGNER" 또는 "MODEL"이어야 함
    } catch (error) {
      console.error("Invalid token format:", error);
      return null;
    }
  };

  // Show List 버튼 클릭 핸들러
  const handleShowList = () => {
    const token = getAccessToken();
    if (!token) {
      toast({
        title: "로그인 후 이용 가능합니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    navigate("/model/landing");
  };

  // MyPage 버튼 클릭 핸들러
  const handleMypage = () => {
    const token = getAccessToken();
    if (!token) {
      toast({
        title: "로그인 후 이용 가능합니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const role = decodeRoleFromToken(token);
    if (role === "DESIGNER") {
      navigate("/designerpage");
    } else if (role === "MODEL") {
      navigate("/model/mypage");
    } else {
      toast({
        title: "잘못된 사용자 정보입니다.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Stack
      bgColor="#F0F4F8"
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      paddingTop="5%"
    >
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
          <Text fontSize="xl" fontWeight="bold">
            Mozip
          </Text>
          <HStack spacing={4}>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: "teal.300" }}
              onClick={handleShowList}
            >
              Show list
            </Button>
            <Button
              variant="ghost"
              color="white"
              _hover={{ color: "teal.300" }}
              onClick={handleMypage}
            >
              Mypage
            </Button>
            <Button variant="ghost" color="white" _hover={{ color: "teal.300" }}>
              About
            </Button>
            <Button variant="ghost" color="white" _hover={{ color: "teal.300" }}>
              Services
            </Button>
            <Button variant="ghost" color="white" _hover={{ color: "teal.300" }}>
              Contact
            </Button>
          </HStack>
        </HStack>
      </Box>

      <VStack spacing={8} marginTop="2rem">
        <Box
          position="relative"
          width="500px"
          height="500px"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {props.images.map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`강아지사진${index + 1}`}
              borderRadius="full"
              boxSize="100%"
              objectFit="cover"
              css={css`
                position: absolute;
                opacity: ${props.currentImageIndex === index ? 1 : 0};
                animation: ${fadeInOut} 3s ease-in-out;
                transition: opacity 3s ease-in-out;
              `}
            />
          ))}
          <Text
            position="absolute"
            color="white"
            fontSize="100px"
            fontWeight="bold"
            zIndex="1"
          >
            Mozip
          </Text>
        </Box>

        <HStack spacing={6}>
          <Button
            bgColor="purple.500"
            color="white"
            _hover={{
              bgColor: "purple.600",
              transform: "scale(1.1)",
              boxShadow: "lg",
            }}
            _active={{
              bgColor: "purple.700",
              transform: "scale(1)",
            }}
            transition="all 0.2s ease-in-out"
            onClick={props.clickDesigner}
          >
            애견 디자이너 로그인
          </Button>

          <Button
            bgColor="teal.500"
            color="white"
            _hover={{
              bgColor: "teal.600",
              transform: "scale(1.1)",
              boxShadow: "lg",
            }}
            _active={{
              bgColor: "teal.700",
              transform: "scale(1)",
            }}
            transition="all 0.2s ease-in-out"
            onClick={props.clickCustomer}
          >
            애견 보호자 로그인
          </Button>
        </HStack>
      </VStack>
    </Stack>
  );
};

export default LandingPresentation;
