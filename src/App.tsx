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
  repeat: boolean;
  volume: number;
}

function App() {
  const [onPlayer, setOnPlayer] = useState<boolean>(false);
  const [youtubes, setYoutubes] = useState<IYoutube[]>([]);
  const [playItem, setPlayItem] = useState<IYoutube | undefined>();
  const [setting, setSetting] = useState<ISetting>({
    dark: false,
    repeat: false,
    volume: 100,
  });

  useEffect(() => {
    const refreshYoutubes = refreshItems("youtubes", setYoutubes);
    const refreshSetting = refreshItems("setting", setSetting);
    refreshYoutubes();
    refreshSetting();
    window.addEventListener("storage", refreshYoutubes);
    window.addEventListener("storage", refreshSetting);
    return () => {
      window.removeEventListener("storage", refreshYoutubes);
      window.removeEventListener("storage", refreshSetting);
    };
  }, []);

  useEffect(() => {
    if (youtubes.length > 0) {
      setPlayItem(youtubes[0]);
    }
  }, [youtubes]);

  useEffect(() => {
    if (playItem) {
      document.body.style.backgroundImage = `url('${getMaxResThumbnailUrl(playItem.videoId)}')`;
    }
  }, [playItem]);

  useEffect(() => {
    if (setting.dark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [setting.dark]);

  const goNext = () => {
    if (!playItem) return;
    const index = youtubes.indexOf(playItem);
    if (setting.repeat) {
      setPlayItem(youtubes[(index + 1) % youtubes.length]);
    }
    if (index < youtubes.length - 1) {
      setPlayItem(youtubes[index + 1]);
    }
  };

  const goPrevious = () => {
    if (!playItem) return;
    const index = youtubes.indexOf(playItem);
    if (setting.repeat) {
      setPlayItem(youtubes[(index - 1 + youtubes.length) % youtubes.length]);
    } else {
      if (index > 0) {
        setPlayItem(youtubes[index - 1]);
      }
    }
  };

  const toggleRepeat = () => {
    setSetting((prev) => {
      const newOne = {
        ...prev,
        repeat: !setting.repeat,
      };
      localStorage.setItem("setting", JSON.stringify(newOne));
      return newOne;
    });
  };

  return (
    <Container>
      <Header setting={setting} setSetting={setSetting} />
      <Content>
        <AnimatePresence mode="wait" initial={false}>
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
                setting={setting}
                setSetting={setSetting}
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
h-screen
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
