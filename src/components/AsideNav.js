import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

export class AsideNav extends LitElement {
  static properties = {
    items: { type: Array },
  };

  static styles = css`
    aside {
      background-color: orange;
    }

    ul {
      margin: 0;
    }
  `;

  render() {
    console.log(this.items);
    return html`
      <aside>
        <ul>
          ${this.items.map(
            link => html`
              <li>
                <a href="${link.path}">${link.title}</a>
                ${link.type === "WRAPPER" && link.items.length > 0
                  ? html`<ul>
                      ${link.items.map(
                        child => html`
                          <li>
                            <a href="${child.path}"> ${child.title} </a>
                          </li>
                        `
                      )}
                    </ul>`
                  : html``}
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
