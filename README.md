# @lp-labs/content-range-parser

Parses byte Content-Range values into explicit inclusive offsets.

Original, standalone MIT TypeScript implementation with **zero runtime or peer dependencies**. ESM/CommonJS exports and separate declarations; Node18+ and compatible ES2022 browsers. No service, filesystem, network, clock or browser globals accessed on import. Compiler/formatter dependencies are development-only.

## Install

```sh
npm install @lp-labs/content-range-parser
```

## Working example

```js
import { parseContentRange } from '@lp-labs/content-range-parser';
console.log(parseContentRange('bytes 0-99/1000'));
```

CommonJS: `const api = require('@lp-labs/content-range-parser')`.

## Behavior, customization and limits

Accepts “bytes start-end/total” and unsatisfied “bytes */total” forms, validating inclusive bounds against the total. The result describes metadata only and does not read or assemble response bodies.

Use the explicit function arguments and public types below to customize the documented behavior. There are no hidden environment settings or sibling-library requirements. Array inputs must be dense; sparse entries are invalid. Inputs are validated before a successful result is returned. Outputs do not mutate caller-owned inputs. Hostile proxies/getters and concurrent mutation are outside the contract.

## Errors and integration

Invalid data never produces an empty success-shaped substitute. TypeError reports incompatible runtime types/nonfinite numbers; RangeError reports unsupported ranges, invalid syntax, inconsistent states and exceeded budgets. Functions that explicitly return null, false or empty arrays describe those legitimate outcomes above. Errors propagate to callers; UI applications should catch at their boundary and visibly notify users. Numerical calculations use JavaScript IEEE754 unless the API explicitly uses bigint; compare approximate numerical results with application-appropriate tolerances.

## Complete public API

```ts
export type ContentRange =
  | {
      readonly unit: 'bytes';
      readonly start: number;
      readonly end: number;
      readonly total: number;
    }
  | {
      readonly unit: 'bytes';
      readonly unsatisfied: true;
      readonly total: number;
    };
export declare function parseContentRange(value: string): ContentRange;
```

## Performance and portability

Complexity and resource ceilings are specified above. Buffered synchronous algorithms do not create workers or timers; callers can move expensive work to their own worker. Limits are enforced, not silently truncated. No runtime imports from any other library. No compatibility or completeness claims beyond the stated scope.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
