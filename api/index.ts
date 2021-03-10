import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

const bad = (response: NowResponse, arg?: string) => {
  response.status(400).send('Bad Request' + arg);
};

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const { url } = request.query as { url: string };
  const Url = new URL(url);
  if (url) {
    const res = await axios(Url.pathname, {
      baseURL: Url.origin,
      proxy: false,
    }).catch((err) => {
      bad(response, url);
      console.error(err);
    });
    if (res) {
      const dates = res.data.split('\n') as string[];
      const date = dates
        .flatMap((date) => {
          return [
            date.includes('/') ? `${date}$document` : date,
            `google.*##.g:has(a[href*="${date}"])`,
          ];
        })
        .join('\n');
      response
        .status(200)
        .send(
          [
            '! Homepage: https://github.com/mouse484/TrashSiteFilter',
            `! Title: Trash Site Filter (use:${url})`,
            date,
          ].join('\n')
        );
    }
  } else {
    bad(response);
  }
};
