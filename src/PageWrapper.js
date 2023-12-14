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

      this.navigation = formatNavData(responseData);
    },
    args: () => [`http://localhost:1337/api/navigation/render/1?type=TREE`],
  });

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    this.audience = urlParams.get("audience") || "DEFAULT";
    this._provider.setValue(this.audience);
    this.showMenu = true;

    this.addEventListener(
      "toggleMenuClicked",
      e => (this.showMenu = !this.showMenu)
    );
  }

  static styles = css`
    main {
      padding: 20px;
      height: 300px;
    }

    h1 {
      margin-top: 0;
    }
  `;

  render() {
    return html`
      ${this._fetchNavigation.render({
        initial: () => html`<p>unga bunga</p>`,
        pending: () => html`<p>pending...</p>`,
        complete: () => html`
          <div>
            <top-nav .items=${this.navigation.top}> hamburglar </top-nav>
            <aside-nav
              .items=${this.navigation.aside}
              .showMenu=${this.showMenu}
            ></aside-nav>
            <main>
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
