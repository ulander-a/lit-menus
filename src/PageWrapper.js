import { LitElement, html, css } from "lit";
import { AsideNav } from "./AsideNav";
import { TopNav } from "./TopNav";

export class PageWrapper extends LitElement {
  static properties = {
    navigation: { type: Array },
  };

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
      <div>
        <top-nav></top-nav>
        <aside-nav></aside-nav>
        <main>
          <h1>Web components</h1>
          <slot></slot>
        </main>
      </div>
    `;
  }
}

window.customElements.define("page-wrapper", PageWrapper);
