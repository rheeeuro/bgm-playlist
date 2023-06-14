import tw from "tailwind-styled-components";
import { Container } from "./Player";
import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import PlaylistItem from "./PlaylistItem";

interface PlaylistProps {
  setOnPlayer: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Playlist({ setOnPlayer }: PlaylistProps) {
  return (
    <Container>
      <Topbar>
        <CustomArrowUturnLeftIcon
          onClick={() => {
            setOnPlayer(true);
          }}
        />
        <Title>Playlist</Title>
      </Topbar>
      <List>
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
        <PlaylistItem />
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
h-14
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
cursor-pointer
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
overflow-y-scroll
`;

export default Playlist;
