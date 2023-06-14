import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import tw from "tailwind-styled-components";
import PlaylistItemDropdown from "./PlaylistItemDropdown";
import { IYoutube } from "../App";
import { FieldErrors, useForm } from "react-hook-form";

interface PlaylistItemProps {
  onClick: () => void;
  youtube: IYoutube;
}

export function PlaylistItem({ onClick, youtube }: PlaylistItemProps) {
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

  const deleteBookmark = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // e.stopPropagation();
    // const confirm = window.confirm(
    //   `Are you sure you want to delete [${bookmark.title}]?`
    // );
    // if (!confirm) return;
    // setBookmarkItems((prev) => {
    //   const newOne = prev.filter((item) => item !== bookmark);
    //   localStorage.setItem("bookmarks", JSON.stringify(newOne));
    //   return newOne;
    // });
  };

  const getThumbnailUrl = () => {
    return `https://img.youtube.com/vi/${youtube.videoId}/default.jpg`;
  };

  return (
    <Container onClick={onClick}>
      <InformationContainer>
        <Thumbnail style={{ backgroundImage: `url(${getThumbnailUrl()})` }} />
        <Information>
          <Title>{youtube.title}</Title>
          <Description>{youtube.videoId}</Description>
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
        {open && <PlaylistItemDropdown />}
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
`;

const Description = tw.p`
w-full
text-md
font-thin
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