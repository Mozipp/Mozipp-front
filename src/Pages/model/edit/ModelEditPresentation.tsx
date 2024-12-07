import React from "react";
import {
  Box,
  Button,
  Input,
  Select,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from "@chakra-ui/react";

interface Props {
  petName: string;
  petAge: number;
  petGender: "MALE" | "FEMALE";
  breed: string;
  loading: boolean;
  setPetName: React.Dispatch<React.SetStateAction<string>>;
  setPetAge: React.Dispatch<React.SetStateAction<number>>;
  setBreed: React.Dispatch<React.SetStateAction<string>>;
  handleGenderChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSubmit: () => void;
  handleBack: () => void;
}

const ModelEditPresentation: React.FC<Props> = (props) => {
  return (
    <Box
      maxWidth="600px"
      mx="auto"
      mt="8"
      p="4"
      borderRadius="lg"
      boxShadow="lg"
      bgColor="white"
    >
      <Heading as="h2" size="lg" textAlign="center" mb="6">
        펫 프로필 등록
      </Heading>

      <VStack spacing={4}>
        {/* 펫 이름 입력 */}
        <FormControl id="petName" isRequired>
          <FormLabel>펫 이름</FormLabel>
          <Input
            type="text"
            value={props.petName}
            onChange={(e) => props.setPetName(e.target.value)}
            placeholder="펫 이름을 입력하세요"
          />
        </FormControl>

        {/* 펫 나이 입력 */}
        <FormControl id="petAge" isRequired>
          <FormLabel>펫 나이</FormLabel>
          <Input
            type="number"
            value={props.petAge === 0 ? "" : props.petAge} // 0일 경우 빈 문자열로 표시
            onChange={(e) => {
              const value = e.target.value.replace(/^0+/, ""); // 0으로 시작하는 값을 제거
              const parsedValue = parseInt(value, 10);
              props.setPetAge(isNaN(parsedValue) ? 0 : parsedValue); // 숫자가 아니면 0 설정
            }}
            placeholder="펫 나이를 입력하세요"
          />
        </FormControl>

        {/* 펫 성별 선택 */}
        <FormControl id="petGender" isRequired>
          <FormLabel>펫 성별</FormLabel>
          <Select value={props.petGender} onChange={props.handleGenderChange}>
            <option value="MALE">수컷</option>
            <option value="FEMALE">암컷</option>
          </Select>
        </FormControl>

        {/* 펫 품종 입력 */}
        <FormControl id="breed" isRequired>
          <FormLabel>펫 품종</FormLabel>
          <Input
            type="text"
            value={props.breed}
            onChange={(e) => props.setBreed(e.target.value)}
            placeholder="펫 품종을 입력하세요"
          />
        </FormControl>

        {/* 제출 버튼 */}
        <Button
          colorScheme="teal"
          width="full"
          isLoading={props.loading}
          onClick={props.handleSubmit}
          isDisabled={props.loading}
        >
          {props.loading ? "등록 중..." : "프로필 등록"}
        </Button>
        <Button width="full" onClick={props.handleBack}>
          뒤로 가기
        </Button>
      </VStack>
    </Box>
  );
};

export default ModelEditPresentation;
