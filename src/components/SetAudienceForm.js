import { LitElement, html, css } from "lit";
import { ContextConsumer } from "@lit/context";
import { audienceContext } from "../contexts";
import { DebugText } from "./DebugText";

export class SetAudienceForm extends LitElement {
  static properties = {
    audience: { type: Text },
  };

  _consumer = new ContextConsumer(this, {
    context: audienceContext,
    subscribe: true,
  });

  static styles = css`
    form {
      width: fit-content;
    }

    form button {
      width: 100%;
    }

    :host debug-text {
      display: inline-block;
    }
  `;

  render() {
    return html`
      <form>
        <fieldset>
          <legend>Set audience</legend>
          <small>
            Current audience:
            <debug-text text="${this._consumer.value}"></debug-text>
          </small>
          <div>
            <label for="audience">Audience:</label>
            <input
              type="text"
              name="audience"
              value="${this._consumer.value}"
            />
          </div>
          <button @click="${this.submit}">Do the thing</button>
        </fieldset>
      </form>
    `;
  }

  submit() {
    // Implement your logic here
  }
}

window.customElements.define("set-audience-form", SetAudienceForm);
