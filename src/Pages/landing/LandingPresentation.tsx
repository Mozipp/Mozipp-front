import React from "react";
import { css, keyframes } from "@emotion/react";
import {
  Image,
  Box,
  Button,
  Stack,
  HStack,
  VStack,
  Text,
} from "@chakra-ui/react";

interface LandingPresentationProps {
  images: string[];
  currentImageIndex: number;
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
      bgColor="#FFF5E1"
      width="100%"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      paddingTop="5%" // 상단 여백 줄이기
    >
      {/* 상단바 */}
      <Box
        width="100%"
        bgColor="#A67C52"
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
            <Button variant="ghost" color="white">
              About
            </Button>
            <Button variant="ghost" color="white">
              Services
            </Button>
            <Button variant="ghost" color="white">
              Contact
            </Button>
          </HStack>
        </HStack>
      </Box>

      <VStack spacing={8} marginTop="3rem"> {/* 상단바가 겹치지 않도록 여백 추가 */}
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
            bgColor="#607D8B"
            color="white"
            _hover={{
              bgColor: "#455A64",
              transform: "scale(1.05)",
            }}
            _active={{
              bgColor: "#37474F",
              transform: "scale(0.95)",
            }}
            transition="background-color 0.3s, transform 0.3s"
          >
            애견 디자이너 로그인
          </Button>
          <Button
            bgColor="#607D8B"
            color="white"
            _hover={{
              bgColor: "#455A64",
              transform: "scale(1.05)",
            }}
            _active={{
              bgColor: "#37474F",
              transform: "scale(0.95)",
            }}
            transition="background-color 0.3s, transform 0.3s"
          >
            애견 보호자 로그인
          </Button>
        </HStack>

        <Button
          bgColor="#607D8B"
          color="white"
          _hover={{
            bgColor: "#455A64",
            transform: "scale(1.05)",
          }}
          _active={{
            bgColor: "#37474F",
            transform: "scale(0.95)",
          }}
          transition="background-color 0.3s, transform 0.3s"
        >
          더 알아보기
        </Button>
      </VStack>
    </Stack>
  );
};

export default LandingPresentation;
