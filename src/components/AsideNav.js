import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

export class AsideNav extends LitElement {
  static properties = {
    items: { type: Array },
    showMenu: { type: Boolean },
  };

  static styles = css`
    nav {
      background-color: orange;
      width: 500px;
    }

    .hidden {
      display: none;
    }

    ul {
      margin: 0;
    }
  `;

  render() {
    return html`
      <nav
        id="aside-nav"
        role="navigation"
        aria-label="Aside menu"
        class="${this.showMenu ? "" : "hidden"}"
        @keydown="${this.handleKeydown}"
      >
        <ul>
          ${this.items.map(
            link => html`<li>
              <a href="${link.path}">${link.title}</a>
              ${this.showMenu &&
              link.type === "WRAPPER" &&
              link.items.length > 0
                ? html`<ul>
                    ${link.items.map(
                      child => html`<li>
                        <a href="${child.path}">${child.title}</a>
                      </li>`
                    )}
                  </ul>`
                : html``}
            </li>`
          )}
        </ul>
        <debug-text text="AsideNav"></debug-text>
      </nav>
    `;
  }

  handleKeydown(e) {
    // If key is escape, close menu and focus hamburger
    if (e.key === "Escape") {
      const event = new CustomEvent("menuToggle", {
        bubbles: true,
        composed: true,
        detail: {
          interactionType: "ESCAPE",
        },
      });

      this.dispatchEvent(event);
    }
  }
}

window.customElements.define("aside-nav", AsideNav);
