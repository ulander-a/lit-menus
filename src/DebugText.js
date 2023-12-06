import { LitElement, html, css } from "lit";

export class DebugText extends LitElement {
  static properties = {
    text: { type: Text },
  };

  static styles = css`
    pre {
      margin: 0;
    }
  `;

  render() {
    return html` <pre>${this.text}</pre> `;
  }
}

window.customElements.define("debug-text", DebugText);
