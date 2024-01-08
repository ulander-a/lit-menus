import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";
import { handleArrowNavigation } from "../lib/keyboardNavigation";

export class TopNav extends LitElement {
  static properties = {
    items: { type: Array },
    showMenu: { type: Boolean },
  };

  static styles = css`
    nav {
      background-color: var(--color-beige);
    }

    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      margin: 0;
      padding: 0;
    }

    li {
      list-style: none;
      margin: 0;
      padding: 0;
    }

    li button {
      border: 0;
      padding: 0;
      background: none;
      cursor: pointer;
      font-size: 24px;
    }

    li a {
      color: var(--color-brown);
      font-weight: 600;
      font-size: 24px;
    }
  `;

  render() {
    return html`
      <nav
        id="top-nav"
        role="navigation"
        aria-label="Main menu"
        @keydown="${this.handleKeydown}"
      >
        <ul>
          <li>
            <button
              id="nav-button"
              @click="${this.toggleMenu}"
              aria-expanded="${this.showMenu}"
              aria-label="${this.showMenu ? "Close menu" : "Open menu"}"
            >
              ☰
            </button>
          </li>
          ${this.items.map(
            link => html`<li>
              <a href="${link.path}">${link.title}</a>
            </li>`
          )}
        </ul>
        <debug-text text="TopNav"></debug-text>
      </nav>
    `;
  }

  toggleMenu(interaction) {
    const interactionType = interaction.detail ? "MOUSE" : "KEYBOARD";
    const event = new CustomEvent("menuToggle", {
      bubbles: true,
      composed: true,
      detail: {
        interactionType: interactionType,
      },
    });
    this.dispatchEvent(event);
  }

  handleKeydown(e) {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      const linksList = this.shadowRoot.querySelectorAll("a");
      const activeLink = this.shadowRoot.activeElement;
      handleArrowNavigation(e, linksList, activeLink);
    }
  }
}

window.customElements.define("top-nav", TopNav);
