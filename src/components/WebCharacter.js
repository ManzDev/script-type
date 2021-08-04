import html from "../assets/html.svg";
import css from "../assets/css.svg";
import module from "../assets/module.svg";
import js from "../assets/js.svg";
import leg from "../assets/leg.svg";
import "./LoadingBar.js";

const TYPES = {
  html, css, js, module
};

class WebCharacter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.loadingProgress = 0;
  }

  static get styles() {
    return `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 200px;
        height: 300px;
        position: relative;
      }

      .character {
        width: 100%;
        height: 100%;
        clip-path: polygon(0 0, 100% 0, 100% var(--loading-progress, 0%), 0% var(--loading-progress, 0%));
        transition: clip-path var(--loading-duration, 3s);
      }

      .logo {
        height: 200px;
        position: relative;
        z-index: 5;
        will-change: transform;
      }

      .feet {
        display: block;
        width: 50px;
        height: 100px;
        position: absolute;
        bottom: 0;
      }

      .feet.left {
        transform: scale(-1, 1);
        left: 25%;
      }

      .feet.right {
        left: 50%;
      }

      .feet path {
        fill: none;
        stroke: #000;
        stroke-width: 4px;
        stroke-linecap: round;
      }

      loading-bar {
        display: flex;
        flex-direction: column;
        align-items: center;
        transition: opacity 0.5s;
      }

      loading-bar.off {
        opacity: 0;
      }

      /* Transparent */

      :host(.transparent) {
        opacity: 0.25;
      }

      /* Status: idle */

      :host(.idle) .logo {
        animation: idle 0.5s infinite alternate;
      }

      :host(.idle) loading-bar {
        opacity: 1;
      }

      @keyframes idle {
        0% { transform: translate(0, 0); }
        100% { transform: translate(0, 10px); }
      }
    `;
  }

  connectedCallback() {
    this.type = this.getAttribute("type") ?? "html";
    this.render();
  }

  setLoading(value, delay, color) {
    this.shadowRoot.querySelector("loading-bar").setLoading(value, delay, color);
  }

  setTransparent(value = true) {
    if (value) { this.classList.add("transparent"); } else { this.classList.remove("transparent"); }
  }

  disableBar() {
    this.shadowRoot.querySelector("loading-bar").classList.add("off");
  }

  setAppears(value, delay = 3000) {
    this.style.setProperty("--loading-duration", `${delay}ms`);
    this.style.setProperty("--loading-progress", `${value}%`);
  }

  setStage(text) {
    const loadingBar = this.shadowRoot.querySelector("loading-bar");
    loadingBar.classList.remove("off");
    loadingBar.setText(text);
  }

  render() {
    const type = TYPES[this.type];
    this.shadowRoot.innerHTML = `
    <style>${WebCharacter.styles}</style>
    <loading-bar class="off"></loading-bar>
    <div class="character">
      <img class="logo" src="${type}" alt="${this.type}">
      <img class="left feet" src="${leg}" alt="right leg">
      <img class="right feet" src="${leg}" alt="right leg">
    </div>
    `;
  }
}

customElements.define("web-character", WebCharacter);
