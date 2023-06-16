import tw from "tailwind-styled-components";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { useEffect, useState } from "react";
import Playlist from "./components/Playlist";
import { refreshItems } from "./utils/localstorage";
import { getMaxResThumbnailUrl } from "./utils/text";
import Footer from "./components/Footer";
import { AnimatePresence, motion } from "framer-motion";

export interface IYoutube {
  id: string;
  title: string;
  originalTitle: string;
  videoId: string;
}

export interface ISetting {
  dark: boolean;
  background: boolean;
  volume: number;
}

function App() {
  const [onPlayer, setOnPlayer] = useState<boolean>(false);
  const [youtubes, setYoutubes] = useState<IYoutube[]>([]);
  const [playItem, setPlayItem] = useState<IYoutube | undefined>();
  const [repeat, setRepeat] = useState<boolean>(true);

  useEffect(() => {
    const refreshYoutubes = refreshItems("youtubes", setYoutubes);
    refreshYoutubes();
    window.addEventListener("storage", refreshYoutubes);
    return () => {
      window.removeEventListener("storage", refreshYoutubes);
    };
  }, []);

  useEffect(() => {
    if (youtubes.length > 0) {
      setPlayItem(youtubes[0]);
    }
  }, [youtubes]);

  useEffect(() => {
    if (playItem) {
      document.body.style.backgroundImage = `url('${getMaxResThumbnailUrl(
        playItem.videoId
      )}')`;
    }
  }, [playItem]);

  const goNext = () => {
    if (!playItem) return;
    const index = youtubes.indexOf(playItem);
    if (repeat) {
      setPlayItem(youtubes[(index + 1) % youtubes.length]);
    }
    if (index < youtubes.length - 1) {
      setPlayItem(youtubes[index + 1]);
    }
  };

  const goPrevious = () => {
    if (!playItem) return;
    const index = youtubes.indexOf(playItem);
    if (repeat) {
      setPlayItem(youtubes[(index - 1 + youtubes.length) % youtubes.length]);
    } else {
      if (index > 0) {
        setPlayItem(youtubes[index - 1]);
      }
    }
  };

  const toggleRepeat = () => {
    setRepeat(!repeat);
  };

  return (
    <Container>
      <Header />
      <Content>
        <AnimatePresence mode="wait">
          {!onPlayer && (
            <PlayerWrapper
              key={"list"}
              variants={wapperVariants}
              initial={"from"}
              animate={"to"}
              exit={"exit"}
            >
              <Playlist
                setOnPlayer={setOnPlayer}
                setYoutubes={setYoutubes}
                youtubes={youtubes}
                setPlayItem={setPlayItem}
                playItem={playItem}
              />
            </PlayerWrapper>
          )}
          {onPlayer && playItem && (
            <PlayerWrapper
              key={"player"}
              variants={wapperVariants}
              initial={"exit"}
              animate={"to"}
              exit={"from"}
            >
              <Player
                key={playItem.id}
                isFirst={youtubes.indexOf(playItem) === 0}
                isLast={youtubes.indexOf(playItem) === youtubes.length - 1}
                setOnPlayer={setOnPlayer}
                playItem={playItem}
                goNext={goNext}
                goPrevious={goPrevious}
                repeat={repeat}
                toggleRepeat={toggleRepeat}
              />
            </PlayerWrapper>
          )}
        </AnimatePresence>
      </Content>
      <Footer />
    </Container>
  );
}

const Container = tw.div`
w-screen
m-0
flex
flex-col
items-center
`;

const Content = tw.div`
w-[28rem]
`;

const PlayerWrapper = tw(motion.div)`
my-10
w-[28rem]
h-[40rem]
`;

const wapperVariants = {
  from: {
    rotateY: 90,
    opacity: 0.3,
    transition: { type: "easeOut", duration: 0.15 },
  },
  to: {
    rotateY: 0,
    opacity: 1,
    transition: { type: "easeIn", duration: 0.15 },
  },
  exit: {
    rotateY: -90,
    opacity: 0.3,
    transition: { type: "easeOut", duration: 0.15 },
  },
};

export default App;
