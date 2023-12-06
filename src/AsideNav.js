import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

export class AsideNav extends LitElement {
  static properties = {
    navlinks: { type: Array },
  };

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
      <aside>
        <ul>
          ${this.navlinks.map(
            link => html`
              <li>
                <a href="${link.target}">${link.text}</a>
              </li>
            `
          )}
        </ul>
        <debug-text text="AsideNav"></debug-text>
      </aside>
    `;
  }
}

window.customElements.define("aside-nav", AsideNav);
