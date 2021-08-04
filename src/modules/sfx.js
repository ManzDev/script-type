import { Howl } from "https://cdn.skypack.dev/howler";

export const music = new Howl({ src: ["boss-fight.mp3"], loop: true, volume: 0.75 });
export const sfx = {
  powerup: new Howl({ src: ["power-up.mp3"], volume: 1.5 }),
  error: new Howl({ src: ["error.mp3"] }),
  positive: new Howl({ src: ["positive.mp3"] }),
  running: new Howl({ src: ["running.mp3"], loop: true }),
  end: new Howl({ src: ["end.mp3"] }),
  bubble: new Howl({ src: ["bubble.mp3"] }),
};
