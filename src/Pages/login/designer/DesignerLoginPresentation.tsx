import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';

interface DesignerLoginPresentationProps {
  email: string;
  password: string;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
  clickHome: () => void;
}

const DesignerLoginPresentation: React.FC<DesignerLoginPresentationProps> = (props) => {
  return (
    <Box
      maxW="400px"
      mx="auto"
      mt="8"
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
    >
      <Text fontSize="2xl" fontWeight="bold" textAlign="center" mb="4">
        Designer Login
      </Text>
      <form onSubmit={props.handleSubmit}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={props.email}
              onChange={(e) => props.setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={props.password}
              onChange={(e) => props.setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormControl>
          {props.error && (
            <Text color="red.500" fontSize="sm">
              {props.error}
            </Text>
          )}
          <Button colorScheme="purple" width="full" type="submit">
            Login
          </Button>
          <Button width="full" onClick={props.clickHome}>
            홈으로
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default DesignerLoginPresentation;
