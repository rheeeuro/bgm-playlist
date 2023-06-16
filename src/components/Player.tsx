import tw from "tailwind-styled-components";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
  BackwardIcon,
  ForwardIcon,
  ListBulletIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { IYoutube } from "../App";
import YouTube, { YouTubeProps } from "react-youtube";
import { useEffect, useState } from "react";
import { durationTextFormat, getMaxResThumbnailUrl } from "../utils/text";

interface PlayerProps {
  setOnPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  playItem: IYoutube;
  goNext: () => void;
  goPrevious: () => void;
  isFirst: boolean;
  isLast: boolean;
  repeat: boolean;
  toggleRepeat: () => void;
}

export function Player({
  setOnPlayer,
  playItem,
  goNext,
  goPrevious,
  isFirst,
  isLast,
  repeat,
  toggleRepeat,
}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(100);

  useEffect(() => {
    const interval = setInterval(() => {
      if (youtubePlayer === null) return;
      setCurrentTime(youtubePlayer.getCurrentTime());
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, [youtubePlayer]);

  useEffect(() => {
    setCurrentTime(0);
  }, [playItem.videoId]);

  const onPlayerReady: YouTubeProps["onReady"] = (event) => {
    setYoutubePlayer(event.target);
    event.target.playVideo();
    setDuration(event.target.getDuration());
    setVolume(event.target.getVolume());
  };

  const onPlayerStateChange: YouTubeProps["onStateChange"] = (event) => {
    if (event.data === 0) {
      // ended
      goNext();
    }
  };

  const opts: YouTubeProps["opts"] = {
    height: "336",
    width: "448",
    playerVars: {
      autoplay: 1,
      controls: 0,
    },
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
    const time = parseInt(event.target.value);
    youtubePlayer.seekTo(time);
    setCurrentTime(time);
  };

  const changeVolume = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    youtubePlayer.setVolume(value);
    setVolume(value);
  };

  const redirectYoutube = () => {
    window.open(`https://youtu.be/${playItem.videoId}`);
  };

  return (
    <Container>
      <VideoContainer
        style={{
          backgroundImage: `url(${getMaxResThumbnailUrl(playItem.videoId)})`,
        }}
      >
        <YouTube
          videoId={playItem.videoId}
          opts={opts}
          onReady={onPlayerReady}
          onPlay={play}
          onPause={pause}
          onStateChange={onPlayerStateChange}
        />
      </VideoContainer>
      <ProgressBar
        type="range"
        min={0}
        max={duration}
        step={1}
        value={currentTime}
        onInput={seekTo}
      />
      <Playtime>
        <h1>{durationTextFormat(currentTime)}</h1>
        <h1>{durationTextFormat(duration)}</h1>
      </Playtime>
      <Controller>
        <Button disabled={isFirst && !repeat}>
          <CustomBackwardIcon onClick={goPrevious} />
        </Button>
        {isPlaying ? (
          <Button>
            <CustomPauseIcon onClick={pause} />
          </Button>
        ) : (
          <Button>
            <CustomPlayIcon onClick={play} />
          </Button>
        )}
        <Button disabled={isLast && !repeat}>
          <CustomForwardIcon onClick={goNext} />
        </Button>
      </Controller>
      <Information>
        <Title>{playItem.title}</Title>
        <Description>{playItem.originalTitle}</Description>
      </Information>
      <Toolbar>
        <VolumeButton
          onMouseLeave={() => {
            setOpen(false);
          }}
        >
          {isMuted ? (
            <CustomSpeakerXMarkIcon
              onClick={unMute}
              onMouseEnter={() => {
                setOpen(true);
              }}
            />
          ) : (
            <CustomSpeakerWaveIcon
              onClick={mute}
              onMouseEnter={() => {
                setOpen(true);
              }}
            />
          )}
          {open && (
            <VolumeBarContainer>
              <VolumeBar
                type="range"
                min={0}
                max={100}
                step={1}
                onInput={changeVolume}
                value={volume}
              />
            </VolumeBarContainer>
          )}
        </VolumeButton>
        <CustomArrowPathIcon onClick={toggleRepeat} $repeat={repeat} />
        <CustomArrowTopRightOnSquareIcon onClick={redirectYoutube} />
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
overflow-hidden
`;

const VideoContainer = tw.div`
w-[28rem]
h-[21rem]
bg-black
rounded-t-lg
bg-cover
bg-no-repeat
bg-center
overflow-hidden
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

const Button = tw.button`
disabled:text-slate-600/50
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
mb-2
text-slate-900
`;

const Description = tw.p`
font-thin
text-sm
px-2
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
text-slate-900/50
`;

const Toolbar = tw.div`
w-full
h-16
flex
justify-around
items-center
`;

const VolumeButton = tw.div`
w-6
h-6
relative
`;

const CustomSpeakerWaveIcon = tw(SpeakerWaveIcon)`
cursor-pointer
w-6
h-6
`;

const CustomSpeakerXMarkIcon = tw(SpeakerXMarkIcon)`
cursor-pointer
w-6
h-6
`;

const VolumeBarContainer = tw.div`
absolute
w-20
h-4
bottom-2
origin-top-left
-rotate-90
`;

const VolumeBar = tw.input`
w-full
h-full
`;

const CustomArrowPathIcon = tw(ArrowPathIcon)<{ $repeat: boolean }>`
w-6
h-6
${(p) => (p.$repeat ? "text-pink-600" : "text-black")}
`;

const CustomArrowTopRightOnSquareIcon = tw(ArrowTopRightOnSquareIcon)`
cursor-pointer
w-6
h-6
`;

const CustomListBulletIcon = tw(ListBulletIcon)`
w-6
h-6
cursor-pointer
`;

export default Player;
