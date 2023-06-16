import tw from "tailwind-styled-components";
import { Container } from "./Player";
import { ArrowUturnLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import PlaylistItem from "./PlaylistItem";
import { IYoutube } from "../App";
import { useState } from "react";
import Modal from "./Modal";
import { FieldErrors, useForm } from "react-hook-form";
import { getVideoIdFromUrl } from "../utils/text";

interface PlaylistProps {
  setOnPlayer: React.Dispatch<React.SetStateAction<boolean>>;
  youtubes: IYoutube[];
  setYoutubes: React.Dispatch<React.SetStateAction<IYoutube[]>>;
  playItem: IYoutube | undefined;
  setPlayItem: React.Dispatch<React.SetStateAction<IYoutube | undefined>>;
}

interface NewYoutubeProps {
  title: string;
  url: string;
}

export function Playlist({
  setOnPlayer,
  youtubes,
  setYoutubes,
  playItem,
  setPlayItem,
}: PlaylistProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewYoutubeProps>();
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const closeModal = () => {
    reset();
    setModalOpen(false);
  };

  const onValid = async (data: NewYoutubeProps) => {
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
        const newOne = [
          ...prev,
          {
            id: new Date().valueOf().toString(),
            title: data.title,
            videoId: getVideoIdFromUrl(data.url),
            originalTitle,
          },
        ];
        localStorage.setItem("youtubes", JSON.stringify(newOne));
        return newOne;
      });
      closeModal();
    }
  };

  const onInValid = (errors: FieldErrors) => {
    console.log(errors);
  };

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
        <CustomPlusIcon
          onClick={() => {
            setModalOpen(true);
          }}
        />
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
            setYoutubes={setYoutubes}
            youtubes={youtubes}
          />
        ))}
      </List>
      <Modal
        title={"Add Youtube"}
        open={modalOpen}
        closeModal={closeModal}
        handleSubmit={handleSubmit}
        onValid={onValid}
        onInValid={onInValid}
        registerProps={[
          {
            ...register("title", { required: "Title is required" }),
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
          },
        ]}
        errors={errors}
      />
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
cursor-pointer
w-6
h-6
`;

const Title = tw.h1`
text-md
font-thin
tracking-widest
`;

const List = tw.div`
w-full
h-full
flex
flex-col
overflow-y-scroll
`;

export default Playlist;
