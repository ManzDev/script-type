import{Howl as e}from"https://cdn.skypack.dev/howler";var t="/script-type/leg.0011f18c.svg";class s extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}static get styles(){return"\n      .bar {\n        display: block;\n        width: var(--width, 150px);\n        height: var(--height, 15px);\n        border: 2px solid #fff;\n        background: #333;\n      }\n\n      :host(.off) {\n        opacity: 0;\n      }\n\n      .text {\n        text-align: center;\n        color: #fff;\n      }\n\n      .fill {\n        display: flex;\n        width: var(--loading-bar, 0%);\n        height: 100%;\n        background: var(--color, gold);\n        transition: width var(--duration, 3000ms) linear;\n      }\n    "}connectedCallback(){this.render()}setLoading(e,t=3e3,s="gold"){this.style.setProperty("--color",s),this.style.setProperty("--duration",`${t}ms`),this.style.setProperty("--loading-bar",`${e}%`)}setText(e){this.shadowRoot.querySelector(".text").textContent=e}render(){this.shadowRoot.innerHTML=`\n    <style>${s.styles}</style>\n    <div class="text"></div>\n    <div class="bar"><div class="fill"></div></div>`}}customElements.define("loading-bar",s);const n={html:"/script-type/html.c77b4301.svg",css:"/script-type/css.cdbefb20.svg",js:"/script-type/js.f822158b.svg",module:"/script-type/module.fc7e6502.svg"};class a extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.loadingProgress=0}static get styles(){return"\n      :host {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        width: 200px;\n        height: 300px;\n        position: relative;\n      }\n\n      .character {\n        width: 100%;\n        height: 100%;\n        clip-path: polygon(0 0, 100% 0, 100% var(--loading-progress, 0%), 0% var(--loading-progress, 0%));\n        transition: clip-path var(--loading-duration, 3s);\n      }\n\n      .logo {\n        height: 200px;\n        position: relative;\n        z-index: 5;\n        will-change: transform;\n      }\n\n      .feet {\n        display: block;\n        width: 50px;\n        height: 100px;\n        position: absolute;\n        bottom: 0;\n      }\n\n      .feet.left {\n        transform: scale(-1, 1);\n        left: 25%;\n      }\n\n      .feet.right {\n        left: 50%;\n      }\n\n      .feet path {\n        fill: none;\n        stroke: #000;\n        stroke-width: 4px;\n        stroke-linecap: round;\n      }\n\n      loading-bar {\n        display: flex;\n        flex-direction: column;\n        align-items: center;\n        transition: opacity 0.5s;\n      }\n\n      loading-bar.off {\n        opacity: 0;\n      }\n\n      /* Transparent */\n\n      :host(.transparent) {\n        opacity: 0.25;\n      }\n\n      /* Status: idle */\n\n      :host(.idle) .logo {\n        animation: idle 0.5s infinite alternate;\n      }\n\n      :host(.idle) loading-bar {\n        opacity: 1;\n      }\n\n      @keyframes idle {\n        0% { transform: translate(0, 0); }\n        100% { transform: translate(0, 10px); }\n      }\n    "}connectedCallback(){var e;this.type=null!=(e=this.getAttribute("type"))?e:"html",this.render()}setLoading(e,t,s){this.shadowRoot.querySelector("loading-bar").setLoading(e,t,s)}setTransparent(e=!0){e?this.classList.add("transparent"):this.classList.remove("transparent")}disableBar(){this.shadowRoot.querySelector("loading-bar").classList.add("off")}setAppears(e,t=3e3){this.style.setProperty("--loading-duration",`${t}ms`),this.style.setProperty("--loading-progress",`${e}%`)}setStage(e){const t=this.shadowRoot.querySelector("loading-bar");t.classList.remove("off"),t.setText(e)}render(){const e=n[this.type];this.shadowRoot.innerHTML=`\n    <style>${a.styles}</style>\n    <loading-bar class="off"></loading-bar>\n    <div class="character">\n      <img class="logo" src="${e}" alt="${this.type}">\n      <img class="left feet" src="${t}" alt="right leg">\n      <img class="right feet" src="${t}" alt="right leg">\n    </div>\n    `}}customElements.define("web-character",a);const i=new e({src:["boss-fight.mp3"],loop:!0,volume:.75}),r={powerup:new e({src:["power-up.mp3"],volume:1.5}),error:new e({src:["error.mp3"]}),positive:new e({src:["positive.mp3"]}),running:new e({src:["running.mp3"],loop:!0}),end:new e({src:["end.mp3"]}),bubble:new e({src:["bubble.mp3"]})},o=document.querySelector(".chars"),l=e=>{document.querySelector(".tag").innerHTML=e},[g,d,m,c,p]=document.querySelectorAll(".buttons button");d.addEventListener("click",(()=>E())),g.addEventListener("click",(()=>k())),m.addEventListener("click",(()=>$())),c.addEventListener("click",(()=>q())),p.addEventListener("click",(()=>H()));const h=()=>{g.disabled=!0,d.disabled=!0,m.disabled=!0,c.disabled=!0,p.disabled=!0},y=(e,t=100,s=3e3)=>{r.powerup.play(),e.setStage("Downloading..."),e.setLoading(t,s),e.setAppears(t,s)},u=(e,t="Completed")=>{r.positive.play(),r.running.playing&&r.running.stop(),e.setStage(t),e.classList.add("idle"),e.setLoading(0,0)},b=(e,t=100,s=3e3)=>{r.powerup.play(),e.setStage("Parsing..."),e.classList.add("idle"),e.setLoading(t,s,"#22c222"),e.setTransparent(!1)},f=e=>{r.error.play(),e.classList.remove("idle"),e.setStage("Stopped"),e.setTransparent(),setTimeout((()=>e.setStage("Wait JS")),1500)},v=(e,t=100,s=3e3)=>{r.running.play(),e.setStage("Running JS"),e.classList.add("idle"),e.setLoading(t,s,"#c22")},w=e=>{r.positive.play(),e.disableBar(),e.classList.remove("idle")},L=()=>{l(""),r.end.play(),i.fade(.75,0,1500),setTimeout((()=>x()),2e3),setTimeout((()=>(g.disabled=!1,d.disabled=!1,m.disabled=!1,c.disabled=!1,void(p.disabled=!1))),3e3)},x=()=>{i.stop(),i.volume(.75),r.bubble.play(),document.querySelectorAll("web-character").forEach((e=>e.remove()))},S=e=>{let t=0;e.forEach((e=>{t+=e.time,setTimeout(e.stage,t)}))},T=e=>{const t=document.createElement("web-character");return t.setAttribute("type",e),o.appendChild(t),t},k=()=>{i.play(),l("normal &lt;script&gt;"),h();const e=T("html"),t=T("js"),s=[{stage:()=>y(t,100,3e3),time:1e4},{stage:()=>u(t),time:3e3},{stage:()=>v(t,100,3e3),time:1e3},{stage:()=>u(t),time:3e3},{stage:()=>w(t),time:1e3}];S([{stage:()=>y(e,100,3e3),time:0},{stage:()=>u(e),time:3e3},{stage:()=>b(e,50,3e3),time:2e3},{stage:()=>f(e),time:3e3},{stage:()=>b(e,100,3e3),time:11e3},{stage:()=>u(e),time:3e3},{stage:()=>w(e),time:1e3},{stage:()=>L(),time:1e3}]),S(s)},E=()=>{i.play(),l("&lt;script <em>defer</em>&gt;"),h();const e=T("html"),t=T("js"),s=[{stage:()=>y(t,100,3e3),time:7e3},{stage:()=>u(t,"Wait HTML"),time:3e3},{stage:()=>v(t,100,3e3),time:5e3},{stage:()=>u(t),time:3e3},{stage:()=>w(t),time:1e3},{stage:()=>L(),time:1e3}];S([{stage:()=>y(e,100,3e3),time:0},{stage:()=>u(e),time:3e3},{stage:()=>b(e,100,7e3),time:2e3},{stage:()=>u(e),time:9e3},{stage:()=>w(e),time:0}]),S(s)},$=()=>{i.play(),l("&lt;script <em>async</em>&gt;"),h();const e=T("html"),t=T("js"),s=[{stage:()=>y(t,100,3e3),time:7e3},{stage:()=>u(t),time:3e3},{stage:()=>v(t,100,3e3),time:3e3},{stage:()=>u(t),time:3e3},{stage:()=>w(t),time:1e3}];S([{stage:()=>y(e,100,3e3),time:0},{stage:()=>u(e),time:3e3},{stage:()=>b(e,50,5e3),time:2e3},{stage:()=>f(e),time:7e3},{stage:()=>b(e,100,3e3),time:6e3},{stage:()=>u(e),time:3e3},{stage:()=>w(e),time:1e3},{stage:()=>L(),time:1e3}]),S(s)},q=()=>{i.play(),l('&lt;script <em>type="module"</em>&gt;'),h();const e=T("html"),t=T("js"),s=T("module"),n=[{stage:()=>y(t,100,3e3),time:7e3},{stage:()=>u(t,"Wait HTML"),time:3e3},{stage:()=>v(t,100,3e3),time:5e3},{stage:()=>u(t),time:3e3},{stage:()=>w(t),time:1e3},{stage:()=>L(),time:1e3}],a=[{stage:()=>y(s,100,3e3),time:8e3},{stage:()=>u(s,"Wait JS"),time:3e3},{stage:()=>w(s),time:4e3}];S([{stage:()=>y(e,100,3e3),time:0},{stage:()=>u(e),time:3e3},{stage:()=>b(e,100,7e3),time:2e3},{stage:()=>u(e),time:9e3},{stage:()=>w(e),time:0}]),S(n),S(a)},H=()=>{i.play(),l('&lt;script <em>type="module" async</em>&gt;'),h();const e=T("html"),t=T("js"),s=T("module"),n=[{stage:()=>y(t,100,3e3),time:7e3},{stage:()=>u(t,"Wait HTML"),time:3e3},{stage:()=>v(t,100,3e3),time:3e3},{stage:()=>u(t),time:3e3},{stage:()=>w(t),time:4e3},{stage:()=>L(),time:4e3}],a=[{stage:()=>y(s,100,3e3),time:8e3},{stage:()=>u(s,"Wait JS"),time:3e3},{stage:()=>u(s),time:5e3},{stage:()=>w(s),time:4e3}];S([{stage:()=>y(e,100,3e3),time:0},{stage:()=>u(e),time:3e3},{stage:()=>b(e,75,7e3),time:2e3},{stage:()=>f(e),time:7e3},{stage:()=>b(e,100,2e3),time:6e3},{stage:()=>u(e),time:3e3},{stage:()=>w(e),time:1e3}]),S(n),S(a)};