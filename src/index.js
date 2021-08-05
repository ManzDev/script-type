import "./components/WebCharacter.js";
import "./components/SoundInput.js";
import { music, sfx, fadeout } from "./modules/sfx.js";

const chars = document.querySelector(".chars");

const setTitle = (message) => {
  document.querySelector(".tag").innerHTML = message;
};

const [normalButton, deferButton, asyncButton, moduleButton, asyncModuleButton] = document.querySelectorAll(".buttons button");

deferButton.addEventListener("click", () => setDeferProcess());
normalButton.addEventListener("click", () => setNormalProcess());
asyncButton.addEventListener("click", () => setAsyncProcess());
moduleButton.addEventListener("click", () => setModuleProcess());
asyncModuleButton.addEventListener("click", () => setAsyncModuleProcess());

const blockButtons = () => {
  normalButton.disabled = true;
  deferButton.disabled = true;
  asyncButton.disabled = true;
  moduleButton.disabled = true;
  asyncModuleButton.disabled = true;
};

const unblockButtons = () => {
  normalButton.disabled = false;
  deferButton.disabled = false;
  asyncButton.disabled = false;
  moduleButton.disabled = false;
  asyncModuleButton.disabled = false;
};

// Download HTML
const downloadStage = (character, percentage = 100, delay = 3000) => {
  sfx.powerup.play();
  character.setStage("Downloading...");
  character.setLoading(percentage, delay);
  character.setAppears(percentage, delay);
};

// Download Completed
const completedStage = (character, text = "Completed") => {
  sfx.positive.play();
  if (sfx.running.playing)
    sfx.running.stop();

  character.setStage(text);
  character.classList.add("idle");
  character.setLoading(0, 0);
};

// Parsing HTML
const parsingStage = (character, percentage = 100, delay = 3000) => {
  sfx.powerup.play();
  character.setStage("Parsing...");
  character.classList.add("idle");
  character.setLoading(percentage, delay, "#22c222");
  character.setTransparent(false);
};

// Detected JS
const stopParsing = (character) => {
  sfx.error.play();
  character.classList.remove("idle");
  character.setStage("Stopped");
  character.setTransparent();
  setTimeout(() => character.setStage("Wait JS"), 1500);
};

const executeStage = (character, percentage = 100, delay = 3000) => {
  sfx.running.play();
  character.setStage("Running JS");
  character.classList.add("idle");
  character.setLoading(percentage, delay, "#c22");
};

const finishStage = (character) => {
  sfx.positive.play();
  character.disableBar();
  character.classList.remove("idle");
};

const resetStage = () => {
  const reset = () => {
    music.stop();
    music.volume(musicVolume);
    sfx.bubble.play();
    document.querySelectorAll("web-character").forEach(char => char.remove());
  };
  setTitle("");
  sfx.end.play();
  const musicVolume = music.volume();
  fadeout();
  setTimeout(() => reset(), 2000);
  setTimeout(() => unblockButtons(), 3000);
};

const setTimeline = (timeline) => {
  let totaltime = 0;
  timeline.forEach(step => {
    totaltime += step.time;
    setTimeout(step.stage, totaltime);
  });
};

const createCharacter = (type) => {
  const character = document.createElement("web-character");
  character.setAttribute("type", type);
  chars.appendChild(character);
  return character;
};

const setNormalProcess = () => {
  music.play();
  setTitle("normal &lt;script&gt;");
  blockButtons();

  const htmlChar = createCharacter("html");
  const jsChar = createCharacter("js");

  const htmlTimeline = [
    { stage: () => downloadStage(htmlChar, 100, 3000), time: 0 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => parsingStage(htmlChar, 50, 3000), time: 2000 },
    { stage: () => stopParsing(htmlChar), time: 3000 },
    { stage: () => parsingStage(htmlChar, 100, 3000), time: 11000 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => finishStage(htmlChar), time: 1000 },
    { stage: () => resetStage(), time: 1000 }
  ];

  const jsTimeline = [
    { stage: () => downloadStage(jsChar, 100, 3000), time: 10000 },
    { stage: () => completedStage(jsChar), time: 3000 },
    { stage: () => executeStage(jsChar, 100, 3000), time: 1000 },
    { stage: () => completedStage(jsChar), time: 3000 },
    { stage: () => finishStage(jsChar), time: 1000 },
  ];

  setTimeline(htmlTimeline);
  setTimeline(jsTimeline);
};

const setDeferProcess = () => {
  music.play();
  setTitle("&lt;script <em>defer</em>&gt;");
  blockButtons();

  const htmlChar = createCharacter("html");
  const jsChar = createCharacter("js");

  const htmlTimeline = [
    { stage: () => downloadStage(htmlChar, 100, 3000), time: 0 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => parsingStage(htmlChar, 100, 7000), time: 2000 },
    { stage: () => completedStage(htmlChar), time: 9000 },
    { stage: () => finishStage(htmlChar), time: 0 },
  ];

  const jsTimeline = [
    { stage: () => downloadStage(jsChar, 100, 3000), time: 7000 },
    { stage: () => completedStage(jsChar, "Wait HTML"), time: 3000 },
    { stage: () => executeStage(jsChar, 100, 3000), time: 5000 },
    { stage: () => completedStage(jsChar), time: 3000 },
    { stage: () => finishStage(jsChar), time: 1000 },
    { stage: () => resetStage(), time: 1000 }
  ];

  setTimeline(htmlTimeline);
  setTimeline(jsTimeline);
};

const setAsyncProcess = () => {
  music.play();
  setTitle("&lt;script <em>async</em>&gt;");
  blockButtons();

  const htmlChar = createCharacter("html");
  const jsChar = createCharacter("js");

  const htmlTimeline = [
    { stage: () => downloadStage(htmlChar, 100, 3000), time: 0 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => parsingStage(htmlChar, 50, 5000), time: 2000 },
    { stage: () => stopParsing(htmlChar), time: 7000 },
    { stage: () => parsingStage(htmlChar, 100, 3000), time: 6000 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => finishStage(htmlChar), time: 1000 },
    { stage: () => resetStage(), time: 1000 }
  ];

  const jsTimeline = [
    { stage: () => downloadStage(jsChar, 100, 3000), time: 7000 },
    { stage: () => completedStage(jsChar), time: 3000 },
    { stage: () => executeStage(jsChar, 100, 3000), time: 3000 },
    { stage: () => completedStage(jsChar), time: 3000 },
    { stage: () => finishStage(jsChar), time: 1000 },
  ];

  setTimeline(htmlTimeline);
  setTimeline(jsTimeline);
};

const setModuleProcess = () => {
  music.play();
  setTitle("&lt;script <em>type=\"module\"</em>&gt;");
  blockButtons();

  const htmlChar = createCharacter("html");
  const jsChar = createCharacter("js");
  const moduleChar = createCharacter("module");

  const htmlTimeline = [
    { stage: () => downloadStage(htmlChar, 100, 3000), time: 0 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => parsingStage(htmlChar, 100, 7000), time: 2000 },
    { stage: () => completedStage(htmlChar), time: 9000 },
    { stage: () => finishStage(htmlChar), time: 0 },
  ];

  const jsTimeline = [
    { stage: () => downloadStage(jsChar, 100, 3000), time: 7000 },
    { stage: () => completedStage(jsChar, "Wait HTML"), time: 3000 },
    { stage: () => executeStage(jsChar, 100, 3000), time: 5000 },
    { stage: () => completedStage(jsChar), time: 3000 },
    { stage: () => finishStage(jsChar), time: 1000 },
    { stage: () => resetStage(), time: 1000 }
  ];

  const moduleTimeline = [
    { stage: () => downloadStage(moduleChar, 100, 3000), time: 8000 },
    { stage: () => completedStage(moduleChar, "Wait JS"), time: 3000 },
    { stage: () => finishStage(moduleChar), time: 4000 },
  ];

  setTimeline(htmlTimeline);
  setTimeline(jsTimeline);
  setTimeline(moduleTimeline);
};

const setAsyncModuleProcess = () => {
  music.play();
  setTitle("&lt;script <em>type=\"module\" async</em>&gt;");
  blockButtons();

  const htmlChar = createCharacter("html");
  const jsChar = createCharacter("js");
  const moduleChar = createCharacter("module");

  const htmlTimeline = [
    { stage: () => downloadStage(htmlChar, 100, 3000), time: 0 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => parsingStage(htmlChar, 75, 7000), time: 2000 },
    { stage: () => stopParsing(htmlChar), time: 7000 },
    { stage: () => parsingStage(htmlChar, 100, 2000), time: 6000 },
    { stage: () => completedStage(htmlChar), time: 3000 },
    { stage: () => finishStage(htmlChar), time: 1000 },
  ];

  const jsTimeline = [
    { stage: () => downloadStage(jsChar, 100, 3000), time: 7000 },
    { stage: () => completedStage(jsChar, "Wait HTML"), time: 3000 },
    { stage: () => executeStage(jsChar, 100, 3000), time: 3000 },
    { stage: () => completedStage(jsChar), time: 3000 },
    { stage: () => finishStage(jsChar), time: 4000 },
    { stage: () => resetStage(), time: 4000 }
  ];

  const moduleTimeline = [
    { stage: () => downloadStage(moduleChar, 100, 3000), time: 8000 },
    { stage: () => completedStage(moduleChar, "Wait JS"), time: 3000 },
    { stage: () => completedStage(moduleChar), time: 5000 },
    { stage: () => finishStage(moduleChar), time: 4000 },
  ];

  setTimeline(htmlTimeline);
  setTimeline(jsTimeline);
  setTimeline(moduleTimeline);
};
