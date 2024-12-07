import React, { useState } from "react";
import ModelEditPresentation from "./ModelEditPresentation";
import { useToast } from "@chakra-ui/react";
import { createPetProfile } from "../../../Apis/model/ModelApi";
import { useNavigate } from "react-router-dom";

const ModelLandingContainer = () => {
  const [petName, setPetName] = useState<string>("");
  const [petAge, setPetAge] = useState<number>(0);
  const [petGender, setPetGender] = useState<"MALE" | "FEMALE">("MALE");
  const [breed, setBreed] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPetGender(event.target.value as "MALE" | "FEMALE");
  };

  const handleBack = () => {
    navigate("/model/mypage");
  }

  const handleSubmit = async () => {
    if (!petName || !petAge || !breed) {
      toast({
        title: "모든 필드를 작성해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      setLoading(true);
      const requestData = { petName, petAge, petGender, breed };
      await createPetProfile(requestData);
      toast({
        title: "펫 프로필이 성공적으로 등록되었습니다.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      // 초기화
      setPetName("");
      setPetAge(0);
      setPetGender("MALE");
      setBreed("");
      navigate("/model/mypage");
    } catch (error) {
      toast({
        title: "프로필 등록에 실패했습니다.",
        description: "다시 시도해 주세요.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModelEditPresentation
      petName={petName}
      petAge={petAge}
      petGender={petGender}
      breed={breed}
      loading={loading}
      setPetName={setPetName}
      setPetAge={setPetAge}
      setBreed={setBreed}
      handleGenderChange={handleGenderChange}
      handleSubmit={handleSubmit}
      handleBack={handleBack}
    />
  );
};

export default ModelLandingContainer;
