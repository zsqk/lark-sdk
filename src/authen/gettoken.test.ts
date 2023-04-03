import { assertEquals } from 'https://deno.land/std@0.182.0/testing/asserts.ts';
import { getUserAccessToken } from './gettoken.ts';
import { getAppAccessToken } from '../auth/gettoken.ts';

const app_id = Deno.env.get('TEST_LARK_APP_ID')!;
const app_secret = Deno.env.get('TEST_LARK_APP_SECRET')!;

Deno.test('getUserAccessToken', async () => {
  const { app_access_token } = await getAppAccessToken({ app_id, app_secret });
  const res = await getUserAccessToken({ code: '' }, {
    app_access_token,
  });

  console.log('res', res);
  assertEquals(res.code, 0);
  assertEquals(res.msg, 'ok');
});
