import tw from "tailwind-styled-components";
import { Container } from "./Player";
import { ArrowUturnLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import PlaylistItem from "./PlaylistItem";
import { IYoutube } from "../App";

interface PlaylistProps {
  setOnPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  youtubes: IYoutube[];
  setYoutubes: React.Dispatch<React.SetStateAction<IYoutube[]>>;
  playItem: IYoutube | null;
  setPlayItem: React.Dispatch<React.SetStateAction<IYoutube | null>>;
}

export function Playlist({
  setOnPlayer,
  youtubes,
  setYoutubes,
  playItem,
  setPlayItem,
}: PlaylistProps) {
  return (
    <Container>
      <Topbar>
        <TitleContainer>
          <BackButton
            disabled={playItem === null}
            onClick={() => {
              setOnPlayer(true);
            }}
          >
            <CustomArrowUturnLeftIcon />
          </BackButton>
          <Title>Playlist</Title>
        </TitleContainer>
        <CustomPlusIcon />
      </Topbar>
      <List>
        {youtubes.map((youtube) => (
          <PlaylistItem
            key={youtube.id}
            youtube={youtube}
            onClick={() => {
              setPlayItem(youtube);
              setOnPlayer(true);
            }}
          />
        ))}
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
justify-between
px-4
space-x-4
bg-slate-200
`;

const TitleContainer = tw.div`
w-full
h-14
flex
items-center

`;

const BackButton = tw.button`
w-6
h-6
rounded-md
mr-4
bg-slate-300
`;

const CustomArrowUturnLeftIcon = tw(ArrowUturnLeftIcon)`
w-6
h-6
p-1
cursor-pointer

`;

const CustomPlusIcon = tw(PlusIcon)`
w-6
h-6
`;

const Title = tw.h1`
font-light
`;

const List = tw.div`
w-full
h-full
flex
flex-col
overflow-x-hidden
overflow-y-scroll
`;

export default Playlist;
