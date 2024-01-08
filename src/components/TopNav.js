import { LitElement, html, css } from "lit";
import { DebugText } from "./DebugText";

import { handleArrowNavigation } from "../lib/keyboardNavigation";

import logo from "../assets/transparentnanner.png";

export class TopNav extends LitElement {
  static properties = {
    items: { type: Array },
    showMenu: { type: Boolean },
  };

  static styles = css`
    nav {
      background-color: var(--color-orange-yellow);
      border-end-end-radius: 80px 80px;
      border-end-start-radius: 80px 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 50px;
      min-width: fit-content;
    }

    nav div {
      display: flex;
      flex-direction: row;
      justify-content: space-evenly;
      min-width: 200px;
    }

    ul {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-right: auto;
      padding: 0;
    }

    li {
      list-style: none;
      margin: 0 30px;
      padding: 0;
    }

    button {
      border: 0;
      padding: 0;
      background: none;
      cursor: pointer;
      font-size: 24px;
    }

    a {
      display: block;
      line-height: 1;
      height: fit-content;
      text-decoration: none;
    }

    li .navlink {
      color: var(--color-brown);
      border-bottom: 5px solid var(--color-brown);
      font-weight: 600;
      font-size: 24px;
      box-sizing: border-box;
    }

    li .navlink:hover,
    li .navlink:focus {
      border-color: var(--color-cyan);
    }

    #logo {
      height: 50px;
    }

    #nav-button {
      height: 50px;
      width: 50px;
      font-size: 36px;
      line-height: 1;
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
    <div>    
      <a href="/">
        <img id="logo" src="${logo}"></img>
      </a>
      <button
        id="nav-button"
        @click="${this.toggleMenu}"
        aria-expanded="${this.showMenu}"
        aria-label="${this.showMenu ? "Close menu" : "Open menu"}"
      >
        ☰
      </button>
    </div>
      <ul>
          ${this.items.map(
            link => html`<li>
              <a href="${link.path}" class="navlink">${link.title}</a>
            </li>`
          )}
      </ul>
      </nav>
    <debug-text text="TopNav"></debug-text>
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
      const linksList = this.shadowRoot.querySelectorAll("a.navlink");
      const activeLink = this.shadowRoot.activeElement;
      handleArrowNavigation(e, linksList, activeLink);
    }
  }
}

window.customElements.define("top-nav", TopNav);
