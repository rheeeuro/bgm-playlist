import tw from "tailwind-styled-components";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { useState } from "react";
import Playlist from "./components/Playlist";

function App() {
  const [onPlayer, setOnPlayer] = useState<boolean>(false);
  return (
    <Container>
      <Header />
      <Content>
        {onPlayer ? (
          <Player setOnPlayer={setOnPlayer} />
        ) : (
          <Playlist setOnPlayer={setOnPlayer} />
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
