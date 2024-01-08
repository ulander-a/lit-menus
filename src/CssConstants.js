import { css } from "lit";

export const constants = css`
  :host {
    --color-black: #0d0d0d;
    --color-white: #fafafa;
    --color-cyan: #75c8ae;
    --color-brown: #621704;
    --color-beige: #ffcd98;
    --color-orange-red: #f54d1e;
    --color-orange-yellow: #ff9a24;
    font-family: "Space Mono", monospace;
    color: var(--color-brown);
  }

  h1,
  h2,
  h3 {
    font-family: "Monoton", monospace;
  }
`;
