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
  useToast,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface LandingPresentationProps {
  images: string[];
  currentImageIndex: number;
  clickCustomer: () => void;
  clickDesigner: () => void;
  isLoggedIn: boolean;
  role: string | null;
  clickLogout: () => void;
}

const fadeInOut = keyframes`
  0% { opacity: 0; }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; }
`;

const LandingPresentation = (props: LandingPresentationProps) => {
  const navigate = useNavigate();


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
            {props.isLoggedIn ? (
              <Button
                variant="ghost"
                color="white"
                _hover={{ color: "teal.300" }}
                onClick={props.clickLogout}
              >
                로그아웃
              </Button>
            ) : (
              ""
            )}
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

        {props.isLoggedIn ? (
          <HStack spacing={6}>
            {props.role === "DESIGNER" && (
              <Button
                bgColor="blue.500"
                color="white"
                _hover={{
                  bgColor: "blue.600",
                  transform: "scale(1.1)",
                  boxShadow: "lg",
                }}
                _active={{
                  bgColor: "blue.700",
                  transform: "scale(1)",
                }}
                transition="all 0.2s ease-in-out"
                onClick={() => navigate("/designerpage")}
              >
                디자이너 페이지로 이동
              </Button>
            )}
            {props.role === "MODEL" && (
              <Button
                bgColor="green.500"
                color="white"
                _hover={{
                  bgColor: "green.600",
                  transform: "scale(1.1)",
                  boxShadow: "lg",
                }}
                _active={{
                  bgColor: "green.700",
                  transform: "scale(1)",
                }}
                transition="all 0.2s ease-in-out"
                onClick={() => navigate("/model/landing")}
              >
                모델 페이지로 이동
              </Button>
            )}
          </HStack>
        ) : (
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
        )}
      </VStack>
    </Stack>
  );
};

export default LandingPresentation;
