export function refreshItems(
  key: string,
  setItems: React.Dispatch<React.SetStateAction<any>>
) {
  return function () {
    const json = localStorage.getItem(key);
    if (json) {
      setItems(JSON.parse(json));
    }
  };
}
