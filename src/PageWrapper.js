import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
import { AsideNav } from "./AsideNav";
import { TopNav } from "./TopNav";

import { formatNavData } from "./lib/formatNavData";

export class PageWrapper extends LitElement {
  static properties = {
    navigation: { type: Array },
  };

  _fetchNavigation = new Task(this, {
    task: async url => {
      const response = await fetch(url);
      const responseData = await response.json();
      this.navigation = formatNavData(responseData);
    },
    args: () => [`http://localhost:1337/api/navigation/render/1?type=TREE`],
  });

  static styles = css`
    main {
      padding: 20px;
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
            <top-nav .items=${this.navigation.top}></top-nav>
            <aside-nav .items=${this.navigation.aside}></aside-nav>
            <main>
              <h1>Web components</h1>
              <slot></slot>
            </main>
          </div>
        `,
        error: error => html`<p>something went horribly wrong: ${error}</p>`,
      })}
    `;
  }
}

window.customElements.define("page-wrapper", PageWrapper);
