import tw from "tailwind-styled-components";
import {
  ArrowTopRightOnSquareIcon,
  BackwardIcon,
  ForwardIcon,
  ListBulletIcon,
  PlayIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";

export function Player() {
  return (
    <Container>
      <Video></Video>
      <ProgressBar />
      <Playtime>
        <h1>00:00</h1>
        <h1>00:00</h1>
      </Playtime>
      <Controller>
        <CustomBackwardIcon />
        <CustomPlayIcon />
        <CustomForwardIcon />
      </Controller>
      <Information>
        <Title>Solid Gold (ft. MNDR)</Title>
        <Description>daskfjhdsajkfjksafhkajshfdkjahsdkfj</Description>
      </Information>
      <Toolbar>
        <CustomWrenchIcon />
        <CustomArrowTopRightOnSquareIcon />
        <CustomListBulletIcon />
      </Toolbar>
    </Container>
  );
}

const Container = tw.div`
my-10
w-[28rem]
h-[40rem]
flex
flex-col
justify-between
items-center
shadow-2xl
rounded-lg
bg-slate-50
`;

const Video = tw.div`
w-[28rem]
h-[21rem]
bg-black
rounded-t-lg
`;

const ProgressBar = tw.div`
w-full
h-1
bg-pink-500
`;

const Playtime = tw.div`
h-10
w-full
px-3
py-1
flex
justify-between
`;

const Controller = tw.div`
w-full
h-28
flex
justify-around
items-center
`;

const CustomPlayIcon = tw(PlayIcon)`
w-14
h-14
stroke-1
`;

const CustomBackwardIcon = tw(BackwardIcon)`
w-10
h-10
stroke-1
`;

const CustomForwardIcon = tw(ForwardIcon)`
w-10
h-10
stroke-1
`;

const Information = tw.div`
w-full
my-6
text-center
`;

const Title = tw.h1`
font-light
text-2xl
`;

const Description = tw.p`
font-thin
text-md
`;

const Toolbar = tw.div`
w-full
h-16
flex
justify-around
items-center
`;

const CustomWrenchIcon = tw(WrenchIcon)`
w-6
h-6
`;

const CustomArrowTopRightOnSquareIcon = tw(ArrowTopRightOnSquareIcon)`
w-6
h-6
`;

const CustomListBulletIcon = tw(ListBulletIcon)`
w-6
h-6
`;

export default Player;
