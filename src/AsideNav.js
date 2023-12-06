import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

export class AsideNav extends LitElement {
  static properties = {
    items: { type: Array },
  };

  render() {
    console.log(this.items);
    return html`
      <aside>
        <ul>
          ${this.items.map(
            link => html`
              <li>
                <a href="${link.path}">${link.title}</a>
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
