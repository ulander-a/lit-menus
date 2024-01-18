import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import { appContext } from "../contexts";

import { DebugText } from "./DebugText";

export class SetAudienceForm extends LitElement {
  _appContextConsumer = new ContextConsumer(this, { context: appContext });

  static styles = css`
    form {
      width: fit-content;
    }

    form fieldset {
      border-color: var(--color-brown);
      border-radius: 25px;
    }

    form button {
      width: 100%;
    }

    :host debug-text {
      display: inline-block;
    }
  `;

  render() {
    const { audience, showDebugText } = this._appContextConsumer.value;

    return html`
      <form @submit="${this.submit}">
        <fieldset>
          <legend>Set audience</legend>
          <small>
            Current audience:
            <span>${audience}</span>
          </small>
          <div>
            <label for="input-audience">Audience:</label>
            <input type="text" name="input-audience" value="${audience}" />

            <label for="input-show-debug-text">Show debug-text:</label>
            <input
              type="checkbox"
              name="input-show-debug-text"
              value="true"
              .checked="${showDebugText}"
            />
          </div>
          <button>Do the thing</button>
          <debug-text text="SetAudienceForm"></debug-text>
        </fieldset>
      </form>
    `;
  }

  submit(e) {
    e.preventDefault();

    const formData = Object.fromEntries(new FormData(e.target));

    const event = new CustomEvent("updateAppContext", {
      bubbles: true,
      composed: true,
      detail: {
        payload: {
          audience: formData["input-audience"],
          showDebugText: formData["input-show-debug-text"] || false,
        },
      },
    });

    this.dispatchEvent(event);
  }
}

window.customElements.define("set-audience-form", SetAudienceForm);
