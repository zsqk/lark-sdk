const LARK_SERVER_ENDPOINT = 'https://open.feishu.cn/open-apis/auth/v3';

// TODO: 将请求通用化, 并统一处理错误

/**
 * [doc](https://open.feishu.cn/document/ukTMukTMukTM/ukDNz4SO0MjL5QzM/auth-v3/auth/app_access_token_internal)
 */
async function getAppAccessToken(opt: {
  'app_id': string;
  'app_secret': string;
}): Promise<{
  'code': number;
  'msg': string;
  'app_access_token': string;
  'expire': number;
}> {
  const url = new URL(
    `${LARK_SERVER_ENDPOINT}/app_access_token/internal`,
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

/**
 * Lark/飞书 自建应用 SDK
 */
export class LarkSDKInternal {
  /** 应用唯一标识，创建应用后获得。 */
  private readonly app_id: string;
  /** 应用密钥，创建应用后获得。 */
  private readonly app_secret: string;

  private appAccessTokenCache = { token: '', expireAt: 0 };
  private get app_access_token(): Promise<string> {
    if (this.appAccessTokenCache.expireAt > Date.now()) {
      return Promise.resolve(this.appAccessTokenCache.token);
    }
    return getAppAccessToken({
      app_id: this.app_id,
      app_secret: this.app_secret,
    }).then((res) => res.app_access_token);
  }

  // TODO: 完善权限
  private tenant_access_token = { token: '', expireAt: 0 };

  constructor({ app_id, app_secret }: { app_id: string; app_secret: string }) {
    this.app_id = app_id;
    this.app_secret = app_secret;
  }
}
