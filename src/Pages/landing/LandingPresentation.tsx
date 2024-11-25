import React from "react";
import { css, keyframes } from "@emotion/react";
import { Image, Box, Button, Stack, HStack, VStack, Text } from "@chakra-ui/react";

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
  return (
    <Stack
      bgColor="#F0F4F8" // 버튼과 조화로운 밝은 색상으로 변경
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      paddingTop="5%"
    >
      {/* 상단바 */}
      <Box
        width="100%"
        bgColor="#2C3E50" // 버튼과 어울리는 짙은 색상으로 변경
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
              bgColor: "purple.600", // hover 시 조금 더 어두운 보라색
              transform: "scale(1.1)", // hover 시 크기 확대
              boxShadow: "lg", // hover 시 그림자 추가
            }}
            _active={{
              bgColor: "purple.700", // 클릭 시 더 어두운 보라색
              transform: "scale(1)", // 클릭 시 원래 크기로
            }}
            transition="all 0.2s ease-in-out" // 부드러운 전환 효과
            onClick={props.clickDesigner}
          >
            애견 디자이너 로그인
          </Button>

          <Button
            bgColor="teal.500"
            color="white"
            _hover={{
              bgColor: "teal.600", // hover 시 조금 더 어두운 청록색
              transform: "scale(1.1)", // hover 시 크기 확대
              boxShadow: "lg", // hover 시 그림자 추가
            }}
            _active={{
              bgColor: "teal.700", // 클릭 시 더 어두운 청록색
              transform: "scale(1)", // 클릭 시 원래 크기로
            }}
            transition="all 0.2s ease-in-out" // 부드러운 전환 효과
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
