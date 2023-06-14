import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import tw from "tailwind-styled-components";

export function PlaylistItem() {
  return (
    <Container>
      <InformationContainer>
        <Thumbnail />
        <Information>
          <Title>fjsnfldsfs</Title>
          <Description>fjsnfldsfs</Description>
        </Information>
      </InformationContainer>
      <CustomEllipsisVerticalIcon />
    </Container>
  );
}

const Container = tw.div`
w-full
h-24
px-4
border-t-2
flex
justify-between
items-center
`;

const InformationContainer = tw.div`
w-full
h-full
flex
items-center
`;

const Thumbnail = tw.div`
w-16
h-12
bg-black
rounded-sm
mr-4
`;

const Information = tw.div`
w-full
h-full
flex
flex-col
justify-center
`;

const Title = tw.h1`
w-full
text-xl
font-light
`;

const Description = tw.p`
w-full
text-md
font-thin
`;

const CustomEllipsisVerticalIcon = tw(EllipsisVerticalIcon)`
w-6
h-6
`;

export default PlaylistItem;
