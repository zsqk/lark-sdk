import { fetchData } from '../utils/network.ts';

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
  const res = await fetchData(
    '/auth/v3/app_access_token/internal',
    {
      body: opt,
    },
  );
  return res;
}
