import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
import { ContextProvider } from "@lit/context";

import { AsideNav } from "./components/AsideNav";
import { TopNav } from "./components/TopNav";
import { SetAudienceForm } from "./components/SetAudienceForm";

import { audienceContext } from "./contexts";
import { formatNavData } from "./lib/formatNavData";

export class PageWrapper extends LitElement {
  static properties = {
    navigation: { type: Array },
    audience: { type: Text },
    showMenu: { type: Boolean },
  };

  static styles = css`
    :host {
      --color-black: #000;
      --color-midnight-blue: #14213d;
      --color-gold: #fca311;
      --color-silver: #e5e5e5;
      --color-white: #fff;
    }

    main {
      padding: 20px;
      min-height: 300px;
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
  `;

  _provider = new ContextProvider(this, {
    context: audienceContext,
    initialValue: "BANANA", // Default value, change as needed
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
    this.audience = urlParams.get("audience") || "DEFAULT";
    this.showMenu = false;
    this._provider.setValue(this.audience);

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
  }

  render() {
    return html`
      ${this._fetchNavigation.render({
        initial: () => html`<p>initial ...</p>`,
        pending: () => html`<p>pending...</p>`,
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
        error: error => html`<p>something went horribly wrong: ${error}</p>`,
      })}
    `;
  }
}

window.customElements.define("page-wrapper", PageWrapper);
