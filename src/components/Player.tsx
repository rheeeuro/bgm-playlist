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
  ViewfinderCircleIcon,
} from "@heroicons/react/24/outline";
import { ISetting, IYoutube } from "../App";
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
  setting: ISetting;
  setSetting: React.Dispatch<React.SetStateAction<ISetting>>;
  toggleRepeat: () => void;
}

export function Player({
  setOnPlayer,
  playItem,
  goNext,
  goPrevious,
  isFirst,
  isLast,
  setting,
  setSetting,
  toggleRepeat,
}: PlayerProps) {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [youtubePlayer, setYoutubePlayer] = useState<any>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

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
    event.target.setVolume(setting.volume);
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
    setSetting((prev) => {
      const newOne = {
        ...prev,
        volume: value,
      };
      localStorage.setItem("setting", JSON.stringify(newOne));
      return newOne;
    });
    unMute();
  };

  const fullscreen = () => {
    const player = youtubePlayer.getIframe();
    if (player && player.requestFullscreen) {
      player.requestFullscreen();
    }
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
        disabled={youtubePlayer === null}
      />
      <PlayTimeWrapper>
        <PlayTime>{durationTextFormat(currentTime)}</PlayTime>
        <PlayTime>{durationTextFormat(duration)}</PlayTime>
      </PlayTimeWrapper>
      <Controller>
        <Button disabled={isFirst && !setting.repeat}>
          <CustomBackwardIcon onClick={goPrevious} />
        </Button>
        {isPlaying ? (
          <Button disabled={youtubePlayer === null} onClick={pause}>
            <CustomPauseIcon />
          </Button>
        ) : (
          <Button disabled={youtubePlayer === null} onClick={play}>
            <CustomPlayIcon />
          </Button>
        )}
        <Button disabled={isLast && !setting.repeat}>
          <CustomForwardIcon onClick={goNext} />
        </Button>
      </Controller>
      <Information>
        <Title>{playItem.title}</Title>
        <Description>{playItem.originalTitle}</Description>
      </Information>
      <Toolbar>
        <ToolbarButton
          title="volume"
          disabled={youtubePlayer === null}
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
                value={setting.volume}
              />
            </VolumeBarContainer>
          )}
        </ToolbarButton>
        <ToolbarButton title="repeat" onClick={toggleRepeat}>
          <CustomArrowPathIcon $repeat={setting.repeat} />
        </ToolbarButton>
        <ToolbarButton
          title="fullscreen"
          onClick={fullscreen}
          disabled={youtubePlayer === null}
        >
          <CustomViewfinderCircleIcon />
        </ToolbarButton>
        <ToolbarButton title="redirect" onClick={redirectYoutube}>
          <CustomArrowTopRightOnSquareIcon />
        </ToolbarButton>
        <ToolbarButton
          title="playlist"
          onClick={() => {
            setOnPlayer(false);
          }}
        >
          <CustomListBulletIcon />
        </ToolbarButton>
      </Toolbar>
    </Container>
  );
}

export const Container = tw.div`
w-full
h-full
flex
flex-col
justify-between
items-center
shadow-2xl
rounded-lg
bg-slate-50
dark:bg-gray-700
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
accent-pink-600
dark:accent-purple-500
`;

const PlayTimeWrapper = tw.div`
h-10
w-full
px-3
py-1
flex
justify-between
`;

const PlayTime = tw.h1`
font-thin
text-sm
text-slate-900
dark:text-slate-50
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
dark:disabled:text-slate-300/30
text-slate-700
dark:text-slate-200
hover:text-pink-600
dark:hover:text-purple-500
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
dark:text-slate-50
`;

const Description = tw.p`
font-thin
text-sm
px-4
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
text-slate-900/50
dark:text-slate-50/50
`;

const Toolbar = tw.div`
w-full
h-16
flex
justify-around
items-center
`;

const ToolbarButton = tw.button`
w-6
h-6
relative
cursor-pointer
disabled:text-slate-600/50
dark:disabled:text-slate-300/30
text-slate-700
dark:text-slate-200
hover:text-pink-600
dark:hover:text-purple-500
`;

const CustomSpeakerWaveIcon = tw(SpeakerWaveIcon)`
w-6
h-6
`;

const CustomSpeakerXMarkIcon = tw(SpeakerXMarkIcon)`
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
accent-pink-600
dark:accent-purple-500
`;

const CustomArrowPathIcon = tw(ArrowPathIcon)<{ $repeat: boolean }>`
w-6
h-6
${(p) =>
  p.$repeat
    ? `text-pink-600 dark:text-purple-500 hover:text-slate-700  dark:hover:text-slate-200`
    : `text-slate-700 dark:text-slate-200 hover:text-pink-600  dark:hover:text-purple-500`}
`;

const CustomViewfinderCircleIcon = tw(ViewfinderCircleIcon)`
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
