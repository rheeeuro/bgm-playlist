import tw from "tailwind-styled-components";
import { Container } from "./Player";
import { ArrowUturnLeftIcon, PlusIcon } from "@heroicons/react/24/outline";
import PlaylistItem from "./PlaylistItem";
import { IYoutube } from "../App";
import { useEffect, useState } from "react";
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
  const [showTip, setShowTip] = useState<boolean>(false);

  useEffect(() => {
    const savedYoutubes = localStorage.getItem("youtubes");
    if (!savedYoutubes) {
      setShowTip(true);
    }
  }, []);

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
    <Container
      onClick={() => {
        setShowTip(false);
      }}
    >
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
        <PlusButton>
          <CustomPlusIcon
            onClick={() => {
              setModalOpen(true);
            }}
          />
          {showTip && (
            <Tip>
              <TipText>
                <TipTitle>*TIP</TipTitle>
                <br />
                Copy the address
                <br />
                or shared URL of the video <br />
                and add it to the list
              </TipText>
            </Tip>
          )}
        </PlusButton>
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
relative
items-center
justify-between
px-4
space-x-4
bg-pink-600/10
dark:bg-slate-700
`;

const Tip = tw.div`
w-64
h-32
absolute
origin-top-right
z-20
top-10
right-7
rounded-tl-3xl
rounded-b-3xl
shadow-2xl
flex
justify-center
items-center
bg-pink-50
dark:bg-slate-500
`;

const TipText = tw.h1`
text-sm
font-thin
text-slate-900
dark:text-slate-50
`;

const TipTitle = tw.span`
text-lg
font-medium
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
bg-pink-600/20
dark:bg-purple-500/70
`;

const CustomArrowUturnLeftIcon = tw(ArrowUturnLeftIcon)`
w-6
h-6
p-1
cursor-pointer
text-slate-700
dark:text-slate-100
hover:text-pink-600
dark:hover:text-purple-400
`;

const PlusButton = tw.button`
w-6
h-6
`;

const CustomPlusIcon = tw(PlusIcon)`
w-6
h-6
text-slate-700
dark:text-slate-100
hover:text-pink-600
dark:hover:text-purple-400
`;

const Title = tw.h1`
text-md
font-thin
tracking-widest
text-slate-900
dark:text-slate-50
`;

const List = tw.div`
w-full
h-full
flex
flex-col
overflow-y-scroll
`;

export default Playlist;
