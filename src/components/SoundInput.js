class SoundInput extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return `
      :host {
        display: inline-flex;
        flex-direction: column;
        font-size: 32px;
        width: 160px;
        height: 85px;
        position: absolute;
        top: 25px;
        right: 50px;
      }
    `;
  }

  connectedCallback() {
    this.render();
    const [musicInput, sfxInput, offInput] = this.shadowRoot.querySelectorAll("input[name=volume]");
    musicInput.addEventListener("click", () => this.setInput("music"));
    sfxInput.addEventListener("click", () => this.setInput("sfx"));
    offInput.addEventListener("click", () => this.setInput("off"));
  }

  setInput(value) {
    const event = new CustomEvent("soundInputChange", { detail: value });
    this.dispatchEvent(event);
  }

  get value() {
    const input = this.shadowRoot.querySelector("input[name=volume]:checked");
    return input.id;
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${SoundInput.styles}</style>
    <label for="music"><input id="music" name="volume" type="radio" checked> <span>Music+SFX</span></label>
    <label for="sfx"><input id="sfx" name="volume" type="radio"> <span>Only SFX</span></label>
    <label for="off"><input id="off" name="volume" type="radio"> <span>OFF</span></label>
    `;
  }
}

customElements.define("sound-input", SoundInput);
