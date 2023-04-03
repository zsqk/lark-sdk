import { fetchData } from '../utils/network.ts';

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
  const res = await fetchData('/authen/v1/access_token', {
    body: { ...opt, grant_type: 'authorization_code' },
    token: app_access_token,
  });
  return res;
}
