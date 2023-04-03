import {
  assert,
  assertEquals,
} from 'https://deno.land/std@0.182.0/testing/asserts.ts';
import { getAppAccessToken } from './gettoken.ts';

const app_id = Deno.env.get('TEST_LARK_APP_ID')!;
const app_secret = Deno.env.get('TEST_LARK_APP_SECRET')!;

Deno.test('getAppAccessToken', async () => {
  const res = await getAppAccessToken({ app_id, app_secret });
  assertEquals(res.code, 0);
  assertEquals(res.msg, 'ok');
  assertEquals(typeof res.app_access_token, 'string');
  assertEquals(typeof res.expire, 'number');
  assert(res.expire > 0);
});
