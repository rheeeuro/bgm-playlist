import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import tw from "tailwind-styled-components";
import PlaylistItemDropdown from "./PlaylistItemDropdown";
import { IYoutube } from "../App";
import { FieldErrors, useForm } from "react-hook-form";
import { getThumbnailUrl, getVideoIdFromUrl } from "../utils/text";
import Modal from "./Modal";

interface PlaylistItemProps {
  onClick: () => void;
  youtube: IYoutube;
  setYoutubes: React.Dispatch<React.SetStateAction<IYoutube[]>>;
  youtubes: IYoutube[];
}

interface ModifyYoutubeProps {
  id: string;
  title: string;
  url: string;
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
  } = useForm<ModifyYoutubeProps>();
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const onValid = async (data: ModifyYoutubeProps) => {
    let originalTitle = "";
    try {
      const response = await fetch(
        `https://noembed.com/embed?dataType=json&url=${data.url}`
      );
      const json = await response.json();
      originalTitle = json.title;
    } catch (error) {
      console.log(error);
    } finally {
      setYoutubes((prev) => {
        const newOne = prev.map((item) => {
          if (item.id === data.id) {
            return {
              ...item,
              title: data.title,
              videoId: getVideoIdFromUrl(data.url),
              originalTitle,
            };
          } else {
            return item;
          }
        });
        localStorage.setItem("youtubes", JSON.stringify(newOne));
        return newOne;
      });
      closeModal();
    }
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
      localStorage.setItem("youtubes", JSON.stringify(newOne));
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
      localStorage.setItem("youtubes", JSON.stringify(newOne));
      return newOne;
    });
  };

  const modifyYoutube = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    setValue("id", youtube.id);
    setModalOpen(true);
  };

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
    <Container
      onClick={() => {
        if (modalOpen) return;
        onClick();
      }}
    >
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
            indexOverSix={youtubes.indexOf(youtube) >= 5}
          />
        )}
      </MenuButton>
      <Modal
        title={"Modify Youtube"}
        open={modalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        onValid={onValid}
        onInValid={onInValid}
        registerProps={[
          {
            ...register("title", { required: "Title is required" }),
            defaultValue: youtube.title,
          },
          {
            ...register("url", {
              required: "URL is required",
              validate: {
                validUrl: (value) =>
                  value.startsWith("https://") ||
                  "URL should begin with [ 'https://' ]",
              },
            }),
            defaultValue: `https://youtu.be/${youtube.videoId}`,
          },
        ]}
        errors={errors}
      />
    </Container>
  );
}

const Container = tw.div`
w-full
h-24
px-4
border-t-[1px]
border-slate-900/10
dark:border-slate-50/10
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
dark:text-slate-50
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
dark:text-slate-50/50
`;

const MenuButton = tw.button`
w-6
h-6
relative
`;

const CustomEllipsisVerticalIcon = tw(EllipsisVerticalIcon)`
w-6
h-6
text-slate-700
dark:text-slate-200
hover:text-pink-600
dark:hover:text-purple-500
`;

export default PlaylistItem;
