import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

import { handleArrowNavigation } from "../lib/keyboardNavigation";

export class AsideNav extends LitElement {
  static properties = {
    items: { type: Array },
    showMenu: { type: Boolean },
  };

  static styles = css`
    nav {
      background-color: var(--color-orange-red);
      width: 500px;
      margin-left: 80px;
      position: absolute;
      z-index: 99;
      padding: 30px 0;
    }

    .hidden {
      display: none;
    }

    ul {
      margin: 0;
      list-style: none;
    }

    ul a {
      color: var(--color-brown);
      text-decoration: none;
      border-bottom: 1px solid;
    }

    ul a:hover,
    ul a:focus {
      border-color: var(--color-cyan);
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
              ${link.type === "WRAPPER" && link.items.length > 0
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
    if (e.key === "Escape") {
      const event = new CustomEvent("menuToggle", {
        bubbles: true,
        composed: true,
        detail: {
          interactionType: "ESCAPE",
        },
      });

      this.dispatchEvent(event);
    } else {
      const linksList = this.shadowRoot.querySelectorAll("a");
      const activeLink = this.shadowRoot.activeElement;
      handleArrowNavigation(e, linksList, activeLink);
    }
  }
}

window.customElements.define("aside-nav", AsideNav);
