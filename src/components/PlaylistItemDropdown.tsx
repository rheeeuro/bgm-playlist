import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import tw from "tailwind-styled-components";

interface PlaylistItemDropdownProps {
  modifyBookmark: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteBookmark: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export function PlaylistItemDropdown() {
  return (
    <Container>
      <Button onClick={() => {}}>
        <CustomArrowUpIcon />
        <Text>Move Up</Text>
      </Button>
      <Button onClick={() => {}}>
        <CustomArrowDownIcon />
        <Text>Move Down</Text>
      </Button>
      <Button onClick={() => {}}>
        <CustomPencilIcon />
        <Text>Modify</Text>
      </Button>
      <Button onClick={() => {}}>
        <CustomTrashIcon />
        <Text>Delete</Text>
      </Button>
    </Container>
  );
}

const Container = tw.div`
absolute
flex
flex-col
justify-around
items-center
z-10
w-32
h-32
top-3
right-3
text-xs
font-normal
bg-slate-200
dark:bg-slate-500
rounded-md
origin-top-right
shadow-lg
`;

const Button = tw.button`
w-full
h-1/2
flex
px-2
items-center
space-x-4
text-md
text-slate-700
dark:text-slate-100
hover:bg-slate-700/30
`;

const CustomPencilIcon = tw(PencilIcon)`
w-3
h-3
`;

const CustomTrashIcon = tw(TrashIcon)`
w-3
h-3
`;

const CustomArrowUpIcon = tw(ArrowUpIcon)`
w-3
h-3
`;

const CustomArrowDownIcon = tw(ArrowDownIcon)`
w-3
h-3
`;

const Text = tw.h1`
w-18
`;

export default PlaylistItemDropdown;
