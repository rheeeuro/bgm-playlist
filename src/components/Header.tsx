import tw from "tailwind-styled-components";
import Clock from "./Clock";

export function Header() {
  return (
    <Container>
      <Clock />
    </Container>
  );
}

const Container = tw.div`
w-full
h-12
flex
flex-row
justify-center
md:justify-between
items-center
bg-slate-50/20
dark:bg-slate-800/20
`;

export default Header;
