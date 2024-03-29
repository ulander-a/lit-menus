import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
import { ContextProvider } from "@lit/context";

import { AsideNav } from "./components/AsideNav";
import { TopNav } from "./components/TopNav";
import { SetAudienceForm } from "./components/SetAudienceForm";

import { appContext } from "./contexts";
import { formatNavData } from "./lib/formatNavData";

import { constants as cssConstants } from "./CssConstants";

export class PageWrapper extends LitElement {
  static properties = {
    navigation: { type: Array },
    showMenu: { type: Boolean },
  };

  static styles = [
    cssConstants,
    css`
      main {
        margin: 20px;
        padding: 20px;
        min-height: 300px;
        background-color: var(--color-beige);
        border-radius: 20px;
      }

      h1 {
        margin-top: 0;
      }

      .skip-to-content-link {
        background: #e77e23;
        height: 30px;
        left: 50%;
        padding: 8px;
        position: absolute;
        transform: translateY(-100%);
        transition: transform 0.3s;
      }

      .skip-to-content-link:focus {
        transform: translateY(0%);
      }
    `,
  ];

  _appContextProvider = new ContextProvider(this, {
    context: appContext,
    initialValue: {
      audience: "BANAN",
      showDebugText: false,
    },
  });

  _fetchNavigation = new Task(this, {
    task: async url => {
      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.error) {
        throw new Error(
          `${responseData.error.status}: ${responseData.error.message}`
        );
      }

      this.navigation = formatNavData(responseData, this.audience);
    },
    args: () => [`http://localhost:1337/api/navigation/render/1?type=TREE`],
  });

  constructor() {
    super();

    const urlParams = new URLSearchParams(window.location.search);
    this._appContextProvider.setValue({
      audience: urlParams.get("audience") || "DEFAULT",
      ...this._appContextProvider,
    });

    this.addEventListener("menuToggle", e => {
      const hamburger = this.shadowRoot
        .querySelector("top-nav")
        .shadowRoot.querySelector("button#nav-button");

      const menu = this.shadowRoot
        .querySelector("aside-nav")
        .shadowRoot.querySelector("nav#aside-nav ul");

      if (this.showMenu && e.detail.interactionType === "ESCAPE") {
        hamburger.focus();
      } else if (!this.showMenu && e.detail.interactionType === "KEYBOARD") {
        // Slightly hacky solution to set focus on an element after it gets "unhidden"
        setTimeout(() => {
          menu.children[0].children[0].focus();
        }, 0);
      }

      this.showMenu = !this.showMenu;
    });

    this.addEventListener("updateAppContext", e => {
      const { audience, showDebugText } = e.detail.payload;

      this._appContextProvider.setValue({
        audience: audience,
        showDebugText: showDebugText,
      });
    });
  }

  render() {
    return html`
      ${this._fetchNavigation.render({
        initial: () => html`<main><p>Hello!</p></main>`,
        pending: () => html`<main><p>Loading...</p></main>`,
        complete: () => html`
          <div>
            <a
              class="skip-to-content-link"
              href="#main"
              @click="${() => this.shadowRoot.getElementById("main").focus()}"
            >
              Skip to content
            </a>
            <top-nav
              .items=${this.navigation.top}
              .showMenu=${this.showMenu}
            ></top-nav>
            <aside-nav
              .items=${this.navigation.aside}
              .showMenu=${this.showMenu}
            ></aside-nav>
            <main id="main" tabindex="-1">
              <h1>Web components 🧩</h1>
              <slot></slot>
              <set-audience-form></set-audience-form>
            </main>
          </div>
        `,
        error: error =>
          html`<main><p>Something went horribly wrong: ${error}</p></main>`,
      })}
    `;
  }
}

window.customElements.define("page-wrapper", PageWrapper);
