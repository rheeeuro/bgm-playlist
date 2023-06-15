export function formatText(time: number) {
  return String(time).padStart(2, "0");
}

export const getThumbnailUrl = (id: string) => {
  return `https://img.youtube.com/vi/${id}/default.jpg`;
};

export const getMaxResThumbnailUrl = (id: string) => {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
};

export const durationTextFormat = (duration: number) => {
  let time = Math.floor(duration);
  const hours = Math.floor(time / 3600);
  time -= hours * 3600;
  const minutes = Math.floor(time / 60);
  time -= minutes * 60;
  const seconds = time;

  if (duration >= 3600)
    return `${formatText(hours)}:${formatText(minutes)}:${formatText(seconds)}`;
  else return `${formatText(minutes)}:${formatText(seconds)}`;
};
