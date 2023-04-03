import { LARK_SERVER_ENDPOINT } from '../constants.ts';
// TODO: 将请求通用化, 并统一处理错误

/**
 * 获取 user_access_token
 * [doc](https://open.feishu.cn/document/uAjLw4CM/ukTMukTMukTM/reference/authen-v1/access_token/create)
 */
export async function getUserAccessToken(opt: {
  'code': string;
}, { app_access_token }: { app_access_token: string }): Promise<{
  'code': number;
  'msg': string;
  'data': {
    access_token: string;
    token_type: string;
    /** 单位 秒 */
    expires_in: number;
    name: string;
    avatar_url: string;
    open_id: string;
    union_id: string;
    mobile?: string;
    tenant_key: string;
    /** refresh_token 的有效期，单位: 秒 */
    refresh_expires_in: number;
    /** 刷新用户 access_token 时使用的 token */
    refresh_token: string;
  };
}> {
  const url = new URL(
    `${LARK_SERVER_ENDPOINT}/authen/v1/access_token`,
  );
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({ ...opt, grant_type: 'authorization_code' }),
    headers: {
      'Authorization': `Bearer ${app_access_token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
  }).then((res) => res.json());
  return res;
}
