import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

// https://market.strapi.io/plugins/strapi-plugin-navigation

export class TopNav extends LitElement {
  static properties = {
    items: { type: Array },
  };

  static styles = css`
    header {
      background-color: aquamarine;
    }

    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      width: 600px;
      margin: 0;
    }

    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }
  `;

  render() {
    return html`
      <header>
        <ul>
          ${this.items.map(
            link => html`<li>
              <a href="${link.path}">${link.title}</a>
            </li>`
          )}
        </ul>
        <debug-text text="TopNav"></debug-text>
      </header>
    `;
  }
}

window.customElements.define("top-nav", TopNav);
