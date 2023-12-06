import { LitElement, html, css } from "lit";
import { ContextProvider } from "@lit/context";
import { audienceContext } from "../contexts";
import { DebugText } from "./DebugText";

export class SetAudienceForm extends LitElement {
  static properties = {
    audience: { type: Text },
  };

  _provider = new ContextProvider(this, {
    context: audienceContext,
    initialValue: "BANAN",
  });

  constructor() {
    super();

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("audience")) {
      this.audience = urlParams.get("audience");
    } else {
      this.audience = "DEFAULT";
    }

    this._provider.setValue(this.audience);
  }

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
    console.log(this._provider);
    return html`
      <form>
        <fieldset>
          <legend>Set audience</legend>
          <small>
            Current audience: <debug-text text="${this.audience}"></debug-text>
          </small>
          <div>
            <label for="audience">Audience:</label>
            <input type="text" name="audience" value="${this.audience}" />
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
