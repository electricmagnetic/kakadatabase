import { render } from '@testing-library/react';
import nzbbtef from './nzbbtef';

test('invalid short bandColour', () => {
  const value = nzbbtef('Black C on Z')
  expect(value).toEqual(undefined);
});

test('invalid short symbolColour', () => {
  const value = nzbbtef('Z C on Black')
  expect(value).toEqual(undefined);
});

test('invalid two word bandColour', () => {
  const value = nzbbtef('Neon Orange C on Pale Black')
  expect(value).toEqual(undefined);
});

test('too many legs', () => {
  const value = nzbbtef('K / Y - K / Y - K / Y')
  expect(value).toEqual(undefined);
});

test('too many parts', () => {
  const value = nzbbtef('K // Y - K // Y // O')
  expect(value).toEqual(undefined);
});

test('invalid colour', () => {
  const value = nzbbtef('F')
  expect(value).toEqual(undefined);
});

test('invalid idBand', () => {
  const value = nzbbtef('Z(V-12345)')
  expect(value).toEqual(undefined);
});
