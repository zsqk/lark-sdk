import { getAppAccessToken } from './auth/gettoken.ts';

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
