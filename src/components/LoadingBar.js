class LoadingBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  static get styles() {
    return `
      .bar {
        display: block;
        width: var(--width, 150px);
        height: var(--height, 15px);
        border: 2px solid #fff;
        background: #333;
      }

      :host(.off) {
        opacity: 0;
      }

      .text {
        text-align: center;
        color: #fff;
      }

      .fill {
        display: flex;
        width: var(--loading-bar, 0%);
        height: 100%;
        background: var(--color, gold);
        transition: width var(--duration, 3000ms) linear;
      }
    `;
  }

  connectedCallback() {
    this.render();
  }

  setLoading(value, delay = 3000, color = "gold") {
    this.style.setProperty("--color", color);
    this.style.setProperty("--duration", `${delay}ms`);
    this.style.setProperty("--loading-bar", `${value}%`);
  }

  setText(text) {
    this.shadowRoot.querySelector(".text").textContent = text;
  }

  render() {
    this.shadowRoot.innerHTML = `
    <style>${LoadingBar.styles}</style>
    <div class="text"></div>
    <div class="bar"><div class="fill"></div></div>`;
  }
}

customElements.define("loading-bar", LoadingBar);
