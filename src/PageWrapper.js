import { LitElement, html, css } from "lit";
import { Task } from "@lit/task";
import { ContextConsumer } from "@lit/context";

import { AsideNav } from "./components/AsideNav";
import { TopNav } from "./components/TopNav";
import { SetAudienceForm } from "./components/SetAudienceForm";

import { audienceContext } from "./contexts";
import { formatNavData } from "./lib/formatNavData";

export class PageWrapper extends LitElement {
  static properties = {
    navigation: { type: Array },
  };

  _audienceConsumer = new ContextConsumer(this, {
    context: audienceContext,
    subscribe: true,
  });

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
      height: 300px;
    }

    h1 {
      margin-top: 0;
    }
  `;

  render() {
    const falukropp = this._audienceConsumer.value;
    console.log(falukropp);

    return html`
      ${this._fetchNavigation.render({
        initial: () => html`<p>unga bunga</p>`,
        pending: () => html`<p>pending...</p>`,
        complete: () => html`
          <div>
            <top-nav .items=${this.navigation.top}></top-nav>
            <aside-nav .items=${this.navigation.aside}></aside-nav>
            <main>
              <h1>Web components 🧩</h1>
              <h2>audience:</h2>
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
