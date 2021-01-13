import {toArray} from "react-emoji-render";

export const parseEmojis = (value: string) => {
  const emojisArray = toArray(value);

  return emojisArray.reduce((previous: any, current: any) => {
    if (typeof current === "string") {
      return previous + current;
    }
    return previous + current.props.children;
  }, "");
};
