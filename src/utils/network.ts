import { LARK_SERVER_ENDPOINT } from '../constants.ts';

export async function fetchData(
  url: string | URL,
  { body, token, method = 'POST' }: {
    body: unknown;
    method?: string;
    token?: string;
  },
) {
  const headers = [['Content-Type', 'application/json; charset=utf-8']];
  if (token) {
    headers.push(['Authorization', `Bearer ${token}`]);
  }
  const res = await fetch(
    typeof url === 'string' ? LARK_SERVER_ENDPOINT + url : url,
    {
      method,
      headers,
      body: JSON.stringify(body),
    },
  ).then((res) => res.json());
  if (res.code !== 0) {
    throw new Error(`${res.code} ${res.msg}`);
  }
  return res;
}
