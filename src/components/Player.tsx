import tw from "tailwind-styled-components";
import {
  ArrowTopRightOnSquareIcon,
  BackwardIcon,
  ForwardIcon,
  ListBulletIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  WrenchIcon,
} from "@heroicons/react/24/outline";
import { IYoutube } from "../App";
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import { formatText } from "../utils/text";

interface PlayerProps {
  setOnPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  playItem: IYoutube;
}

export function Player({ setOnPlayer, playItem }: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setYoutubePlayer(event.target);
    event.target.playVideo();

    setDuration(event.target.getDuration());

    setInterval(() => {
      if (event.target.getCurrentTime() !== 0) {
        setCurrentTime(event.target.getCurrentTime());
      }
    }, 1000);
  };

  useEffect(() => {
    console.log(currentTime);
  }, [currentTime]);

  const opts: YouTubeProps["opts"] = {
    height: "336",
    width: "448",
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
  };

  const durationTextFormat = (duration: number) => {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);

    if (duration >= 3600)
      return `${formatText(hours)}:${formatText(minutes)}:${formatText(
        seconds
      )}`;
    else return `${formatText(minutes)}:${formatText(seconds)}`;
  };

  const getMaxResThumbnailUrl = () => {
    return `https://img.youtube.com/vi/${playItem.videoId}/maxresdefault.jpg`;
  };

  const play = () => {
    setIsPlaying(true);
    youtubePlayer.playVideo();
  };

  const pause = () => {
    setIsPlaying(false);
    youtubePlayer.pauseVideo();
  };

  const mute = () => {
    setIsMuted(true);
    youtubePlayer.mute();
  };

  const unMute = () => {
    setIsMuted(false);
    youtubePlayer.unMute();
  };

  const seekTo = (event: React.ChangeEvent<HTMLInputElement>) => {
    youtubePlayer.seekTo(event.target.value);
  };

  return (
    <Container>
      <VideoContainer
        style={{ backgroundImage: `url(${getMaxResThumbnailUrl()})` }}
      >
        <YouTube
          videoId={playItem.videoId}
          opts={opts}
          onReady={onPlayerReady}
          onPlay={play}
          onPause={pause}
        />
      </VideoContainer>
      <ProgressBar
        type="range"
        min={0}
        max={duration}
        step={1}
        value={currentTime}
        onChange={seekTo}
      />
      <Playtime>
        <h1>{durationTextFormat(currentTime)}</h1>
        <h1>{durationTextFormat(duration)}</h1>
      </Playtime>
      <Controller>
        <CustomBackwardIcon />
        {isPlaying ? (
          <CustomPauseIcon onClick={pause} />
        ) : (
          <CustomPlayIcon onClick={play} />
        )}
        <CustomForwardIcon />
      </Controller>
      <Information>
        <Title>{playItem.title}</Title>
        <Description>{playItem.videoId}</Description>
      </Information>
      <Toolbar>
        {isMuted ? (
          <CustomSpeakerXMarkIcon onClick={unMute} />
        ) : (
          <CustomSpeakerWaveIcon onClick={mute} />
        )}
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

const VideoContainer = tw.div`
w-[28rem]
h-[21rem]
bg-black
rounded-t-lg
bg-cover
bg-no-repeat
bg-center
`;

const ProgressBar = tw.input`
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
font-thin
text-sm
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

const CustomPauseIcon = tw(PauseIcon)`
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

const CustomSpeakerWaveIcon = tw(SpeakerWaveIcon)`
w-6
h-6
`;

const CustomSpeakerXMarkIcon = tw(SpeakerXMarkIcon)`
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
