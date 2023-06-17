import tw from "tailwind-styled-components";
import Clock from "./Clock";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import { ISetting } from "../App";
import { AnimatePresence, motion } from "framer-motion";

interface HeaderProps {
  setting: ISetting;
  setSetting: React.Dispatch<React.SetStateAction<ISetting>>;
}

export function Header({ setting, setSetting }: HeaderProps) {
  const toggleDark = () => {
    setSetting((prev) => {
      const newOne = {
        ...prev,
        dark: !prev.dark,
      };
      localStorage.setItem("setting", JSON.stringify(newOne));
      return newOne;
    });
  };

  return (
    <Container>
      <Clock />
      <AnimatePresence mode="wait">
        <Button
          onClick={toggleDark}
          key={setting.dark ? "dark" : "light"}
          variants={darkmodeVariants}
          initial={"from"}
          animate={"to"}
          exit={"exit"}
        >
          {setting.dark ? <CustomSunIcon /> : <CustomMoonIcon />}
        </Button>
      </AnimatePresence>
    </Container>
  );
}

const Container = tw.div`
w-full
h-12
flex
flex-row
justify-center
md:justify-between
items-center
bg-slate-50/20
dark:bg-slate-800/20
`;

const Button = tw(motion.button)`
mx-9
w-6
flex
justify-center
items-center
`;

const CustomSunIcon = tw(SunIcon)`
w-6
h-6
text-orange-500
`;

const CustomMoonIcon = tw(MoonIcon)`
w-6
h-6
text-purple-700
`;

const darkmodeVariants = {
  from: { y: -20, opacity: 0, transition: { duration: 0.2 } },
  to: { y: 0, opacity: 1, transition: { duration: 0.2 } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
};

export default Header;
