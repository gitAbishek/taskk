import { get } from 'lodash';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValue = (object: any, key: string, defaultValue: any = '') =>
  get(object, key, defaultValue);
