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
  url: string;
}

function App() {
  const [onPlayer, setOnPlayer] = useState<boolean>(false);
  const [youtubes, setYoutubes] = useState<IYoutube[]>([
    { id: "123", title: "123", url: "123" },
    { id: "123", title: "234", url: "234" },
    { id: "123", title: "345", url: "345" },
    { id: "123", title: "456", url: "456" },
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
