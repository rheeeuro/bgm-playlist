import tw from "tailwind-styled-components";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { useEffect, useState } from "react";
import Playlist from "./components/Playlist";
import { refreshItems } from "./utils/localstorage";

export interface IYoutube {
  id: string;
  title: string;
  videoId: string;
  duration: string;
}

function App() {
  const [onPlayer, setOnPlayer] = useState<boolean>(false);
  const [youtubes, setYoutubes] = useState<IYoutube[]>([
    {
      id: "123",
      title: "BTS (방탄소년단) 'Take Two' Live Clip #2023BTSFESTA",
      videoId: "owjVpYCmwcg",
      duration: "00:04:00",
    },
    {
      id: "123",
      title: "[ENG] 쿠폰 완성은 핑계고",
      videoId: "ZpaxVXeSmTY",
      duration: "00:04:00",
    },
    {
      id: "123",
      title:
        "[자막뉴스] \"헛것인가?\" 블랙박스 보고 '기겁'..'방음터널 위 여성' 정체 밝혀졌다 (2023.06.13/MBC뉴스)",
      videoId: "0x-ZaA3VULc",
      duration: "00:04:00",
    },
    {
      id: "123",
      title:
        "알배추물김치 담는법, 여름에는 무조건 만드세요! 알배추김치 여름동치미",
      videoId: "ezAb-QNqhrk",
      duration: "00:04:00",
    },
  ]);
  const [playItem, setPlayItem] = useState<IYoutube | null>(null);

  useEffect(() => {
    const refreshBookmarkItems = refreshItems("youtubes", setYoutubes);
    refreshBookmarkItems();
    window.addEventListener("storage", refreshBookmarkItems);
    return () => {
      window.removeEventListener("storage", refreshBookmarkItems);
    };
  }, []);

  return (
    <Container>
      <Header />
      <Content>
        {!onPlayer && (
          <Playlist
            setOnPlayer={setOnPlayer}
            setYoutubes={setYoutubes}
            youtubes={youtubes}
            setPlayItem={setPlayItem}
            playItem={playItem}
          />
        )}
        {onPlayer && playItem && (
          <Player setOnPlayer={setOnPlayer} playItem={playItem} />
        )}
      </Content>
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

export default App;
