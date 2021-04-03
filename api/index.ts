import { VercelRequest, VercelResponse } from '@vercel/node';
import { makeFilter } from '../lib/';

export default (request: VercelRequest, response: VercelResponse): void => {
  makeFilter(request, response, (data) => {
    return [
      data.includes('/') ? `${data}$document` : data,
      `google.*##.g:has(a[href*="${data}"])`,
    ];
  });
};
