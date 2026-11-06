import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('parses ordinary range', () => {
  assert.deepEqual(api.parseContentRange('bytes 0-99/1000'), {
    unit: 'bytes',
    start: 0,
    end: 99,
    total: 1000,
  });
});
test('parses last byte range', () => {
  assert.deepEqual(api.parseContentRange('bytes 9-9/10'), {
    unit: 'bytes',
    start: 9,
    end: 9,
    total: 10,
  });
});
test('parses unsatisfied range', () => {
  assert.deepEqual(api.parseContentRange('bytes */10'), {
    unit: 'bytes',
    unsatisfied: true,
    total: 10,
  });
});
test('accepts zero-length total unsatisfied', () => {
  assert.deepEqual(api.parseContentRange('bytes */0'), {
    unit: 'bytes',
    unsatisfied: true,
    total: 0,
  });
});
test('rejects end beyond total', () => {
  assert.throws(() => api.parseContentRange('bytes 0-10/10'), RangeError);
});
test('rejects reversed interval', () => {
  assert.throws(() => api.parseContentRange('bytes 5-2/10'), RangeError);
});
