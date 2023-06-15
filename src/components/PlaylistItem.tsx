import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import tw from "tailwind-styled-components";
import PlaylistItemDropdown from "./PlaylistItemDropdown";
import { IYoutube } from "../App";
import { FieldErrors, useForm } from "react-hook-form";
import { getThumbnailUrl } from "../utils/text";

interface PlaylistItemProps {
  onClick: () => void;
  youtube: IYoutube;
  setYoutubes: React.Dispatch<React.SetStateAction<IYoutube[]>>;
  youtubes: IYoutube[];
}

export function PlaylistItem({
  onClick,
  youtube,
  setYoutubes,
  youtubes,
}: PlaylistItemProps) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<IYoutube>();
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const modifyBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    // setValue("id", bookmark.id);
    setModalOpen(true);
  };

  const onValid = (data: IYoutube) => {
    // setBookmarkItems((prev) => {
    //   const newOne = prev.map((item) => {
    //     if (item.id === data.id) {
    //       return {
    //         ...item,
    //         title: data.title,
    //         url: data.url,
    //       };
    //     } else {
    //       return item;
    //     }
    //   });
    //   localStorage.setItem("bookmarks", JSON.stringify(newOne));
    //   return newOne;
    // });
    closeModal();
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

  const moveUp = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setYoutubes((prev) => {
      const index = prev.indexOf(youtube);
      const newOne = [
        ...prev.slice(0, index - 1),
        prev[index],
        prev[index - 1],
        ...prev.slice(index + 1, prev.length),
      ];
      return newOne;
    });
  };

  const moveDown = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setYoutubes((prev) => {
      const index = prev.indexOf(youtube);
      const newOne = [
        ...prev.slice(0, index),
        prev[index + 1],
        prev[index],
        ...prev.slice(index + 2, prev.length),
      ];
      return newOne;
    });
  };

  const modifyYoutube = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {};

  const deleteYoutube = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const confirm = window.confirm(
      `Are you sure you want to delete [${youtube.title}]?`
    );
    if (!confirm) return;

    setYoutubes((prev) => {
      const newOne = prev.filter((item) => item !== youtube);
      localStorage.setItem("youtubes", JSON.stringify(newOne));
      return newOne;
    });
  };

  return (
    <Container onClick={onClick}>
      <InformationContainer>
        <Thumbnail
          style={{
            backgroundImage: `url(${getThumbnailUrl(youtube.videoId)})`,
          }}
        />
        <Information>
          <Title>{youtube.title}</Title>
          <Description>{youtube.originalTitle}</Description>
        </Information>
      </InformationContainer>
      <MenuButton
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        onMouseLeave={() => {
          setOpen(false);
        }}
      >
        <CustomEllipsisVerticalIcon />
        {open && (
          <PlaylistItemDropdown
            moveUp={moveUp}
            moveDown={moveDown}
            modifyYoutube={modifyYoutube}
            deleteYoutube={deleteYoutube}
            isFirst={youtubes.indexOf(youtube) === 0}
            isLast={youtubes.indexOf(youtube) === youtubes.length - 1}
          />
        )}
      </MenuButton>
    </Container>
  );
}

const Container = tw.div`
w-full
h-24
px-4
border-t-2
flex
justify-between
items-center
`;

const InformationContainer = tw.div`
w-full
h-24
flex
items-center
`;

const Thumbnail = tw.div`
w-16
h-12
bg-black
rounded-sm
mr-4
bg-cover
bg-no-repeat
bg-center
`;

const Information = tw.div`
w-full
h-24
flex
flex-col
justify-center
`;

const Title = tw.h1`
w-full
text-xl
font-light
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
mb-2
text-slate-900
`;

const Description = tw.p`
w-full
text-sm
font-thin
overflow-clip
overflow-ellipsis
break-words
line-clamp-1
text-slate-900/50
`;

const MenuButton = tw.div`
w-6
h-6
relative
`;

const CustomEllipsisVerticalIcon = tw(EllipsisVerticalIcon)`
w-6
h-6
`;

export default PlaylistItem;
