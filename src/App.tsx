import tw from "tailwind-styled-components";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";

function App() {
  return (
    <Container>
      <Header />
      <Content>
        <Player />
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
