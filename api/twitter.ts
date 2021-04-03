import { VercelRequest, VercelResponse } from '@vercel/node';
import { makeFilter } from '../lib/';

export default (request: VercelRequest, response: VercelResponse): void => {
  makeFilter(
    request,
    response,
    (data) => {
      return [
        `twitter.com##div[aria-label="タイムライン: トレンド"] > div > div:has-text(${data})`,
        `twitter.com##div[aria-label="タイムライン: 話題を検索"] > div > div:has-text(${data})`,
      ];
    },
    'twitter'
  );
};
