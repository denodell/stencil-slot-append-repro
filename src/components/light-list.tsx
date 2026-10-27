import { Component, h } from "@stencil/core";

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
