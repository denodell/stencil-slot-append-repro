import { Component, h } from "@stencil/core";

// The same component with shadow DOM, so the browser handles the slots.
@Component({ tag: "shadow-list", shadow: true })
export class ShadowList {
  render() {
    return (
      <div class="list">
        <slot />
      </div>
    );
  }
}
