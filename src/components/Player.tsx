import tw from "tailwind-styled-components";
import {
  ArrowTopRightOnSquareIcon,
  BackwardIcon,
  ForwardIcon,
  ListBulletIcon,
  PlayIcon,
  SpeakerWaveIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { IYoutube } from "../App";

interface PlayerProps {
  setOnPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  playItem: IYoutube;
}

export function Player({ setOnPlayer, playItem }: PlayerProps) {
  const durationTextFormat = (text: string) => {};

  const getMaxResThumbnailUrl = () => {
    return `https://img.youtube.com/vi/${playItem.videoId}/maxresdefault.jpg`;
  };

  return (
    <Container>
      <Video style={{ backgroundImage: `url(${getMaxResThumbnailUrl()})` }} />
      <ProgressBar />
      <Playtime>
        <h1>00:00:00</h1>
        <h1>{playItem.duration}</h1>
      </Playtime>
      <Controller>
        <CustomBackwardIcon />
        <CustomPlayIcon />
        <CustomForwardIcon />
      </Controller>
      <Information>
        <Title>{playItem.title}</Title>
        <Description>{playItem.videoId}</Description>
      </Information>
      <Toolbar>
        <CustomSpeakerIcon />
        <CustomWrenchIcon />
        <CustomArrowTopRightOnSquareIcon />
        <CustomListBulletIcon
          onClick={() => {
            setOnPlayer(false);
          }}
        />
      </Toolbar>
    </Container>
  );
}

export const Container = tw.div`
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
bg-cover
bg-no-repeat
bg-center
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
px-2
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
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

const CustomSpeakerIcon = tw(SpeakerWaveIcon)`
w-6
h-6
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
cursor-pointer
`;

export default Player;
