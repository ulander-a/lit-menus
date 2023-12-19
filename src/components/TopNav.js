import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

export class TopNav extends LitElement {
  static properties = {
    items: { type: Array },
    showMenu: { type: Boolean },
  };

  static styles = css`
    nav {
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

    li button {
      border: 0;
      padding: 0;
      background: none;
      cursor: pointer;
      font-size: 24px;
    }
  `;

  render() {
    return html`
      <nav id="top-nav" role="navigation" aria-label="Main menu">
        <ul>
          <li>
            <!-- Button triggering submenu within the same component -->
            <button
              id="nav-button"
              @click="${this.toggleMenu}"
              aria-expanded="${this.showMenu}"
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
    // Pass along interaction type so we can autofocus the toggled menu for keyboard users
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
}

window.customElements.define("top-nav", TopNav);
