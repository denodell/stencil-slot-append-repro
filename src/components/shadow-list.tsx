import { Component, h } from "@stencil/core";

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
