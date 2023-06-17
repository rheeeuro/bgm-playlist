import {
  ArrowDownIcon,
  ArrowUpIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import tw from "tailwind-styled-components";

interface PlaylistItemDropdownProps {
  moveUp: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  moveDown: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  modifyYoutube: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  deleteYoutube: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isFirst: boolean;
  isLast: boolean;
  indexOverSix: boolean;
}

export function PlaylistItemDropdown({
  moveUp,
  moveDown,
  modifyYoutube,
  deleteYoutube,
  isFirst,
  isLast,
  indexOverSix,
}: PlaylistItemDropdownProps) {
  return (
    <Container $indexOverSix={indexOverSix}>
      <Button onClick={moveUp} disabled={isFirst}>
        <CustomArrowUpIcon />
        <Text>Move Up</Text>
      </Button>
      <Button onClick={moveDown} disabled={isLast}>
        <CustomArrowDownIcon />
        <Text>Move Down</Text>
      </Button>
      <Button onClick={modifyYoutube}>
        <CustomPencilIcon />
        <Text>Modify</Text>
      </Button>
      <Button onClick={deleteYoutube}>
        <CustomTrashIcon />
        <Text>Delete</Text>
      </Button>
    </Container>
  );
}

const Container = tw.div<{ $indexOverSix: boolean }>`
absolute
flex
flex-col
justify-around
items-center
z-10
w-32
h-32
${(p) => (p.$indexOverSix ? "bottom-3" : "top-3")}
right-3
text-xs
font-normal
bg-pink-50
dark:bg-slate-800
rounded-md
${(p) => (p.$indexOverSix ? "origin-bottom-right" : "origin-top-right")}
shadow-xl
`;

const Button = tw.button`
w-full
h-1/4
flex
px-3
items-center
space-x-4
text-md
text-slate-700
dark:text-slate-200
disabled:text-slate-400
dark:disabled:text-slate-700
enabled:hover:bg-pink-600/10
dark:enabled:hover:bg-purple-500/10
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
