export function formatText(time: number) {
  return String(time).padStart(2, "0");
}

export function getThumbnailUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/default.jpg`;
}

export function getMaxResThumbnailUrl(id: string) {
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export function getVideoIdFromUrl(url: string): string {
  var regExp =
    /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  if (match && match[2].length === 11) {
    return match[2];
  } else {
    return "";
  }
}

export function durationTextFormat(duration: number) {
  let time = Math.floor(duration);
  const hours = Math.floor(time / 3600);
  time -= hours * 3600;
  const minutes = Math.floor(time / 60);
  time -= minutes * 60;
  const seconds = time;

  if (hours > 0)
    return `${formatText(hours)}:${formatText(minutes)}:${formatText(seconds)}`;
  else return `${formatText(minutes)}:${formatText(seconds)}`;
}
