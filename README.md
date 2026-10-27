# appendChildSlotFix repro

With `appendChildSlotFix` turned on, appending children one at a time to a Stencil component that uses slots without shadow DOM gets slower with each child. Doubling the number of children makes appending them take three to four times as long.

The page has two components that are identical apart from shadow DOM:

- `<light-list>` uses `shadow: false`, so Stencil replaces its `appendChild` to handle the slot itself.
- `<shadow-list>` uses `shadow: true`, so the browser's own `appendChild` is used.

To run it:

```sh
npm install
npm start
```

Then open the page it serves and press **Run**. It appends 250, 500, 1,000 and 2,000 children to each component, one `appendChild` call at a time, and shows how long each took.

With the CPU slowed down 4x in Chrome 155:

| Children appended | `<light-list>` | `<shadow-list>` |
| --- | --- | --- |
| 250 | 310ms | 3ms |
| 500 | 808ms | 2ms |
| 1,000 | 3,111ms | 3ms |
| 2,000 | 13,818ms | 13ms |

With `appendChildSlotFix: false` in `stencil.config.ts`, both components take under 20ms at every size.

Each call to the replaced `appendChild` checks all of the host's existing child nodes to find the slot the new node belongs in, then checks them again to work out where to insert it. After inserting it, `updateFallbackSlotVisibility` goes through all the child nodes a third time, along with everything inside each one, to decide whether to show the slot's fallback content. So adding the 2,000th child means checking the 1,999 before it three times.

Most of the time goes on that third check. With the CPU slowed down 4x, appending 2,000 children to `<light-list>` took about 14 seconds, and about 2 seconds with the `updateFallbackSlotVisibility` call removed from the replaced `appendChild`.

The same behavior makes Ionic's `ion-select` slow to open with long lists, because `ion-radio-group` doesn't use shadow DOM and Ionic turns this setting on through `experimentalSlotFixes`.

Versions: `@stencil/core` 4.45.2.
