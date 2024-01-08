import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import { debugTextContext } from "../contexts";

export class DebugText extends LitElement {
  static properties = {
    text: { type: Text },
  };

  _consumerDebugText = new ContextConsumer(this, {
    context: debugTextContext,
    subscribe: true,
  });

  static styles = css`
    .debug-text {
      position: relative;
      height: 0;
      width: 0;
    }

    .debug-text pre {
      margin: 0;
      position: absolute;
      background-color: var(--color-white);
      border: 1px dashed var(--color-black);
      padding: 0px 3px;
      top: -16px;
    }
  `;

  render() {
    return this._consumerDebugText.value
      ? html` <div class="debug-text"><pre>${this.text}</pre></div> `
      : html``;
  }
}

window.customElements.define("debug-text", DebugText);
