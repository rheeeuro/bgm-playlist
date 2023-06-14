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
  originalTitle: string;
  videoId: string;
}

function App() {
  const [onPlayer, setOnPlayer] = useState<boolean>(false);
  const [youtubes, setYoutubes] = useState<IYoutube[]>([
    {
      id: "1",
      title: "'지브리",
      originalTitle:
        "기억할게, 그 어느 여름날 | 지브리 스튜디오 OST (오케스트라 버전)",
      videoId: "L5No7rhWM-I",
    },
    {
      id: "2",
      title: "초여름",
      originalTitle: "˚₊‧𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 초여름 특유의 선선한 밤공기를 느끼며 ｡+ﾟ*",
      videoId: "2YLs33C72zo",
    },
    {
      id: "3",
      title: "히트곡",
      originalTitle:
        "𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭 질리도록 듣는 히트곡엔 그 이유가 있다𝐅𝐞𝐚𝐭. 𝐋𝐚𝐮𝐯, 𝐋𝐚𝐧𝐲, 𝐇𝐨𝐧𝐧𝐞, 𝐤𝐞𝐬𝐡𝐢, 𝐏𝐞𝐝𝐞𝐫 𝐄𝐥𝐢𝐚𝐬, 𝐓𝐫𝐨𝐲𝐞 𝐒𝐢𝐯𝐚𝐧, 𝐂𝐡𝐚𝐫𝐥𝐢𝐞 𝐏𝐮𝐭𝐡",
      videoId: "x6i3_LfeTjY",
    },
    {
      id: "4",
      title: "잔잔한 인디",
      originalTitle:
        "[playlist] 딱 요즘 듣는 잔잔한 인디들 | 카더가든, 잔나비, 검정치마, 혁오, 짙은, 데이먼스이어",
      videoId: "75kySTFaBQQ",
    },
    {
      id: "5",
      title: "추억의 감성",
      originalTitle:
        "예상컨대 20·30대들 광광 울면서 들을 추억의 감성 노래 모음🎧 | PLAYLIST",
      videoId: "7r-f4QK50NA",
    },
    {
      id: "6",
      title: "제이팝",
      originalTitle:
        "【𝐏𝐥𝐚𝐲𝐥𝐢𝐬𝐭】 내가 일본 노래에 심취하게 되는 이유ㅣJ-POP 새벽 감성 노래 모음",
      videoId: "cyY8pL6e_b0",
    },
    {
      id: "7",
      title: "애니 ost",
      originalTitle:
        "[Playlist] 1시간 뒤 멍 때릴 거임💭 생각들 정리하고 다시 해보자고요! 애니 ost 모음",
      videoId: "gIIzk2B7ruw",
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
