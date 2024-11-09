import React from 'react';
import { Box, Button, FormControl, FormLabel, Input, Text, VStack } from '@chakra-ui/react';

interface CustomerLoginPresentationProps {
  email: string;
  password: string;
  error: string | null;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: (event: React.FormEvent) => void;
}

const CustomerLoginPresentation: React.FC<CustomerLoginPresentationProps> = ({
  email,
  password,
  error,
  setEmail,
  setPassword,
  handleSubmit,
}) => {
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
        Customer Login
      </Text>
      <form onSubmit={handleSubmit}>
        <VStack spacing="4">
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </FormControl>
          {error && (
            <Text color="red.500" fontSize="sm">
              {error}
            </Text>
          )}
          <Button colorScheme="teal" width="full" type="submit">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default CustomerLoginPresentation;
