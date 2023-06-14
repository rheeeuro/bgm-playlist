import { useEffect, useState } from "react";
import tw from "tailwind-styled-components";

export function Clock() {
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    setClock();
  }, []);

  const setClock = () => {
    const [newDate, newTime] = getNow();
    setDate(newDate);
    setTime(newTime);
  };

  const formatText = (time: number) => String(time).padStart(2, "0");

  const getNow = () => {
    const now: Date = new Date();

    const month = now.getMonth() + 1; // 월
    const date = now.getDate(); // 날짜
    const day = now.getDay(); // 요일

    const minutes = now.getMinutes();
    const hours = now.getHours();

    return [
      `${formatText(month)}/${formatText(date)}`,
      `${formatText(hours)}:${formatText(minutes)}`,
    ];
  };

  setInterval(setClock, 1000);

  return (
    <Container>
      <DateText>{date}</DateText>
      <TimeText>{time}</TimeText>
    </Container>
  );
}

const Container = tw.div`
w-52
hidden
md:flex
md:flex-row
md:items-center
text-center
text-slate-900
dark:text-slate-100
transition-colors
`;

const DateText = tw.h1`
mx-5
font-medium
`;

const TimeText = tw.h1`
text-xl
font-extrabold
`;

export default Clock;
