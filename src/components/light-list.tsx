import { Component, h } from "@stencil/core";

// Uses slots without shadow DOM, so Stencil handles the slots itself.
@Component({ tag: "light-list", shadow: false })
export class LightList {
  render() {
    return (
      <div class="list">
        <slot />
      </div>
    );
  }
}
