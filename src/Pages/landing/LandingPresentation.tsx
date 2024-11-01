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
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaCa8KtFVdGKJAdCH5WLLUP164biNZGzp9tA&s"
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
                <Text># 물개컷</Text>
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
                  src="https://img2.quasarzone.com/editor/2022/11/21/9e036ba816a13557f66bc28ab82e5d3f.png"
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
                  src="https://img1.daumcdn.net/thumb/R1280x0/?fname=http://t1.daumcdn.net/brunch/service/user/8LV9/image/bpnOaNXRt2WZHrEB85jT5nWAepA.jpg"
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
                <Text># 친절한 # 귀여운</Text>
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
                  src="https://lh3.googleusercontent.com/proxy/sDxrS45nJfTdi4NnCsurYzyn40-cnPvsjBQYwzplFanYf0HFho9EOFpcMaS1jY5SqFjSPbi8WHGUjK_06AhEi0pVf8vDh_L-RJ4aN1FsWjfeee8P2Qi36PPbqiVSkQ"
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
