import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

// https://market.strapi.io/plugins/strapi-plugin-navigation

export class TopNav extends LitElement {
  static properties = {
    navlinks: { type: Array },
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
    this.navlinks = [
      { target: "/foo", text: "foo" },
      { target: "/bar", text: "bar" },
      { target: "/pepsi", text: "pepsi" },
      { target: "/coninius", text: "coninius" },
      { target: "/banana", text: "banana" },
      { target: "/unga bunga", text: "unga bunga" },
    ];
    return html`
      <header>
        <ul>
          ${this.navlinks.map(
            link => html`<li>
              <a href="${link.target}">${link.text}</a>
            </li>`
          )}
        </ul>
        <debug-text text="TopNav"></debug-text>
      </header>
    `;
  }
}

window.customElements.define("top-nav", TopNav);
