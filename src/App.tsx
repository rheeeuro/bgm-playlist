import tw from "tailwind-styled-components";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import { useState } from "react";
import Playlist from "./components/Playlist";

function App() {
  const [showList, setShowList] = useState<boolean>(true);
  return (
    <Container>
      <Header />
      <Content>{showList ? <Playlist /> : <Player />}</Content>
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
