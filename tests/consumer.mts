import * as api from '@lp-labs/content-range-parser';
import { parseContentRange } from '@lp-labs/content-range-parser';
console.log(parseContentRange('bytes 0-99/1000'));
// @ts-expect-error invalid argument must be rejected by declarations
api.parseContentRange(100);
