import { NowRequest, NowResponse } from '@vercel/node';
import axios from 'axios';

const bad = (response: NowResponse) => {
  response.status(400).send('Bad Request');
};

export default async (
  request: NowRequest,
  response: NowResponse
): Promise<void> => {
  const { url } = request.query as { url: string };
  if (url) {
    const res = await axios.get<string>(url).catch((err) => {
      console.log(err);
      bad(response);
    });
    if (res) {
      const dates = res.data.split('\n');
      const date = dates
        .flatMap((date) => {
          return [date, `google.*##.g:has(a[href*="${date}"])`];
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
