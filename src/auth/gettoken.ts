import { LARK_SERVER_ENDPOINT } from '../constants.ts';
// TODO: 将请求通用化, 并统一处理错误

/**
 * [doc](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal)
 */
export async function getAppAccessToken(opt: {
  'app_id': string;
  'app_secret': string;
}): Promise<{
  'code': number;
  'msg': string;
  'app_access_token': string;
  'expire': number;
}> {
  const url = new URL(
    `${LARK_SERVER_ENDPOINT}/auth/v3/app_access_token/internal`,
  );
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(opt),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((res) => res.json());
  return res;
}
