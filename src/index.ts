export type ContentRange =
  | { readonly unit: 'bytes'; readonly start: number; readonly end: number; readonly total: number }
  | { readonly unit: 'bytes'; readonly unsatisfied: true; readonly total: number };
export function parseContentRange(value: string): ContentRange {
  if (typeof value !== 'string') throw new TypeError('Expected text');
  const text = value.trim(),
    unsatisfied = /^bytes \*\/(\d+)$/.exec(text);
  if (unsatisfied) {
    const total = Number(unsatisfied[1]);
    if (!Number.isSafeInteger(total)) throw new RangeError('Total outside safe range');
    return { unit: 'bytes', unsatisfied: true, total };
  }
  const m = /^bytes (\d+)-(\d+)\/(\d+)$/.exec(text);
  if (!m) throw new RangeError('Invalid byte Content-Range');
  const start = Number(m[1]),
    end = Number(m[2]),
    total = Number(m[3]);
  if (![start, end, total].every(Number.isSafeInteger) || start > end || end >= total)
    throw new RangeError('Inconsistent byte range');
  return { unit: 'bytes', start, end, total };
}
