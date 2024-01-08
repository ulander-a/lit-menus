import { LitElement, html, css } from "lit";
import { ContextProvider, ContextConsumer } from "@lit/context";
import { audienceContext, debugTextContext } from "../contexts";

import { DebugText } from "./DebugText";

export class SetAudienceForm extends LitElement {
  static properties = {
    audience: { type: Text },
    showDebugText: { type: Boolean },
  };

  _consumerAudience = new ContextConsumer(this, {
    context: audienceContext,
    subscribe: true,
  });

  _consumerDebugText = new ContextConsumer(this, {
    context: debugTextContext,
    subscribe: true,
  });

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

  constructor() {
    super();
    this.audience = this._consumerAudience.value;
    this.showDebugText = this._consumerDebugText.value;
  }

  render() {
    return html`
      <form @submit="${this.submit}">
        <fieldset>
          <legend>Set audience</legend>
          <small>
            Current audience:
            <span>${this.audience}</span>
          </small>
          <div>
            <label for="audience">Audience:</label>
            <input type="text" name="audience" value="${this.audience}" />

            <label for="show-component-names">Show debug-text (TODO):</label>
            <input
              type="checkbox"
              name="show-component-names"
              .checked="${this.showDebugText}"
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
    console.log(this.audience);
  }
}

window.customElements.define("set-audience-form", SetAudienceForm);
