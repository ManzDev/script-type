import { Howl, Howler } from "https://cdn.skypack.dev/howler";

const soundInput = document.querySelector("sound-input");

const setSound = (musicEnabled = true, sfxEnabled = true) => {
  music.volume(musicEnabled ? 1 : 0);
  sfx.powerup.volume(sfxEnabled ? 1.5 : 0);
  sfx.error.volume(sfxEnabled ? 1 : 0);
  sfx.positive.volume(sfxEnabled ? 1 : 0);
  sfx.running.volume(sfxEnabled ? 1 : 0);
  sfx.end.volume(sfxEnabled ? 1 : 0);
  sfx.bubble.volume(sfxEnabled ? 1 : 0);
};

soundInput.addEventListener("soundInputChange", (ev) => {
  if (ev.detail === "music")
    setSound(true, true);
  else if (ev.detail === "sfx")
    setSound(false, true);
  else if (ev.detail === "off")
    setSound(false, false);
});

export const music = new Howl({ src: ["boss-fight.mp3"], loop: true, volume: 0.75 });

export const fadeout = () => {
  if (music.volume() > 0)
    music.fade(0.75, 0, 1500);
};

export const sfx = {
  powerup: new Howl({ src: ["power-up.mp3"], volume: 1.5 }),
  error: new Howl({ src: ["error.mp3"] }),
  positive: new Howl({ src: ["positive.mp3"] }),
  running: new Howl({ src: ["running.mp3"], loop: true }),
  end: new Howl({ src: ["end.mp3"] }),
  bubble: new Howl({ src: ["bubble.mp3"] }),
};
