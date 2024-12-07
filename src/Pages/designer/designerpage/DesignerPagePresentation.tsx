import React from "react";
import { Box, Text, HStack } from "@chakra-ui/react";

interface Campaign {
  id: number;
  title: string;
  description: string;
  link: string;
}

interface ProfileInfo {
  name: string;
}

interface DesignerPagePresentationProps {
  campaigns: Campaign[];
  profile: ProfileInfo;
  onCardClick: (section: string) => void;
  renderedContent: React.ReactNode;
  handleLogoutClick: () => void;
  handleHomeClick: () => void;
}

const DesignerPagePresentation: React.FC<DesignerPagePresentationProps> = (props) => {
  return (
    <Box bgColor="#F0F4F8" width="100%" minHeight="100vh">
      <Box width="100%" bgColor="#2C3E50" padding="1rem" color="white" position="fixed" top="0" zIndex="10">
        <HStack justifyContent="space-between" maxWidth="1200px" mx="auto">
          <Text fontSize="xl" fontWeight="bold" cursor="pointer" onClick={props.handleHomeClick}>
            Mozip
          </Text>
          <Text fontSize="sm" cursor="pointer" onClick={props.handleLogoutClick}>
            로그아웃
          </Text>
        </HStack>
      </Box>
      <Box mt="5rem" padding="1rem">
        <Text fontSize="2xl" fontWeight="bold" mb="1rem">
          {props.profile.name}님의 캠페인 관리
        </Text>
        <Box display="grid" gridTemplateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap="20px">
          {props.campaigns.map((campaign) => (
            <Box
              key={campaign.id}
              border="1px solid #ddd"
              borderRadius="10px"
              padding="20px"
              textAlign="center"
              bgColor="white"
              cursor="pointer"
              onClick={() => props.onCardClick(campaign.link)}
            >
              <Text fontSize="lg" fontWeight="bold">
                {campaign.title}
              </Text>
              <Text mt="10px">{campaign.description}</Text>
            </Box>
          ))}
        </Box>
        <Box mt="2rem">{props.renderedContent}</Box>
      </Box>
    </Box>
  );
};

export default DesignerPagePresentation;
