import tw from "tailwind-styled-components";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <Container>
      <Header />
      <Content>asd</Content>
    </Container>
  );
}

const Container = tw.div`
w-screen
m-0
flex
flex-col
items-center
bg-slate-400
`;

const Content = tw.div`
w-[44rem]
lg:w-[80rem]
`;

export default App;
