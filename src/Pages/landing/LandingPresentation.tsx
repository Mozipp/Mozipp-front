import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Flex,
  Grid,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  HStack,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

interface LandingPresentationProps {
  liked: boolean;
  setLike: (liked: boolean) => void;
  handleChangeLike: () => void;
}

const LandingPresentation = (props: LandingPresentationProps) => {
  return (
    <Stack>
      <Box bg={"gray.100"}>
        <Heading ml="10px">Mozip</Heading>
      </Box>
      <Box padding={"50px"}>
        <Grid templateColumns="repeat(5, 1fr)" gap={6}>
          {/* 카드 1번 */}
          <Card maxW="sm">
            <CardBody>
              <Box width="100%" height="350px" overflow="hidden">
                <Image
                  src="https://cdn.ceojhn.com/news/photo/202312/3274_4140_1627.jpg"
                  alt="image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
              <Stack mt="6" spacing="3">
                <HStack>
                  <Heading size="md">1번</Heading>
                  <Text pt={2}>디자이너</Text>
                </HStack>
                <Text># 기장 긴 여자</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="ghost"
                onClick={props.handleChangeLike}
                p={0}
                borderRadius="full"
                minW="auto"
                height="auto"
              >
                {props.liked ? (
                  <FaHeart color="red" size="24" />
                ) : (
                  <FaRegHeart color="gray" size="24" />
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* 카드 2번 */}
          <Card maxW="sm">
            <CardBody>
              <Box width="100%" height="350px" overflow="hidden">
                <Image
                  src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/01/26/27bd74cc-a130-4fdf-87c5-221725ebea7c.png"
                  alt="image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
              <Stack mt="6" spacing="3">
                <HStack>
                  <Heading size="md">2번</Heading>
                  <Text pt={2}>디자이너</Text>
                </HStack>
                <Text># 더미 데이터</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="ghost"
                onClick={props.handleChangeLike}
                p={0}
                borderRadius="full"
                minW="auto"
                height="auto"
              >
                <FaRegHeart color="gray" size="24" />
              </Button>
            </CardFooter>
          </Card>

          {/* 카드 3번 */}
          <Card maxW="sm">
            <CardBody>
              <Box width="100%" height="350px" overflow="hidden">
                <Image
                  src="https://cdn.class101.net/images/fd7225ed-ebf2-40e0-87fe-d629fefdfa09/1920xauto.webp"
                  alt="image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
              <Stack mt="6" spacing="3">
                <HStack>
                  <Heading size="md">3번</Heading>
                  <Text pt={2}>디자이너</Text>
                </HStack>
                <Text># 에즈펌 # 열펌</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="ghost"
                onClick={props.handleChangeLike}
                p={0}
                borderRadius="full"
                minW="auto"
                height="auto"
              >
                <FaRegHeart color="gray" size="24" />
              </Button>
            </CardFooter>
          </Card>

          {/* 카드 4번 */}
          <Card maxW="sm">
            <CardBody>
              <Box width="100%" height="350px" overflow="hidden">
                <Image
                  src="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2023/06/15/857e7e27-6ad0-4937-b2a1-4a7577d71340.jpg"
                  alt="image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
              <Stack mt="6" spacing="3">
                <HStack>
                  <Heading size="md">4번</Heading>
                  <Text pt={2}>디자이너</Text>
                </HStack>
                <Text># 친절한 손님</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="ghost"
                onClick={props.handleChangeLike}
                p={0}
                borderRadius="full"
                minW="auto"
                height="auto"
              >
                {props.liked ? (
                  <FaHeart color="red" size="24" />
                ) : (
                  <FaRegHeart color="gray" size="24" />
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* 카드 5번 */}
          <Card maxW="sm">
            <CardBody>
              <Box width="100%" height="350px" overflow="hidden">
                <Image
                  src="https://cdn.newsculture.press/news/photo/202404/546298_687539_5839.jpg"
                  alt="image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
              <Stack mt="6" spacing="3">
                <HStack>
                  <Heading size="md">5번</Heading>
                  <Text pt={2}>디자이너</Text>
                </HStack>
                <Text># 테스트 데이터</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="ghost"
                onClick={props.handleChangeLike}
                p={0}
                borderRadius="full"
                minW="auto"
                height="auto"
              >
                {props.liked ? (
                  <FaHeart color="red" size="24" />
                ) : (
                  <FaRegHeart color="gray" size="24" />
                )}
              </Button>
            </CardFooter>
          </Card>

          {/* 카드 6번 */}
          <Card maxW="sm">
            <CardBody>
              <Box width="100%" height="350px" overflow="hidden">
                <Image
                  src="https://image.ajunews.com/content/image/2019/12/17/20191217105410637047.jpg"
                  alt="image"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
              <Stack mt="6" spacing="3">
                <HStack>
                  <Heading size="md">6번</Heading>
                  <Text pt={2}>디자이너</Text>
                </HStack>
                <Text># 시간 가는 줄 몰라요</Text>
              </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
              <Button
                variant="ghost"
                onClick={props.handleChangeLike}
                p={0}
                borderRadius="full"
                minW="auto"
                height="auto"
              >
                {props.liked ? (
                  <FaHeart color="red" size="24" />
                ) : (
                  <FaRegHeart color="gray" size="24" />
                )}
              </Button>
            </CardFooter>
          </Card>
        </Grid>
      </Box>
    </Stack>
  );
};

export default LandingPresentation;
