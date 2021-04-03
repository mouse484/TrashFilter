import { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

const bad = (response: VercelResponse, arg?: string) => {
  response.status(400).send('Bad Request' + arg);
};

export const makeFilter = async (
  request: VercelRequest,
  response: VercelResponse,
  parser: (data: string) => string[],
  type?: string
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
      const date = dates.flatMap((date) => parser(date)).join('\n');
      response
        .status(200)
        .send(
          [
            '! Homepage: https://github.com/mouse484/TrashSiteFilter',
            `! Title: Trash Filter (use:${url} - ${
              type ? type : 'normal'
            }mode)`,
            date,
          ].join('\n')
        );
    }
  } else {
    bad(response);
  }
};
