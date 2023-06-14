import tw from "tailwind-styled-components";
import { Container } from "./Player";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import PlaylistItem from "./PlaylistItem";

export function Playlist() {
  return (
    <Container>
      <Topbar>
        <CustomArrowUturnLeftIcon />
        <Title>Playlist</Title>
      </Topbar>
      <List>
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
      </List>
    </Container>
  );
}

const Topbar = tw.div`
w-full
h-10
rounded-t-xl
flex
items-center
px-4
space-x-4
bg-slate-200
`;

const CustomArrowUturnLeftIcon = tw(ArrowUturnLeftIcon)`
w-6
h-6
p-1
rounded-md
bg-slate-300
`;

const Title = tw.h1`
font-light
`;

const List = tw.div`
w-full
h-full
flex
flex-col
`;

export default Playlist;
