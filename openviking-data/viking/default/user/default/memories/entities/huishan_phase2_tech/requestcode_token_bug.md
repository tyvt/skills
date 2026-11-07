# 灵锡requestCode令牌缓存导致绑房401缺陷
惠山二期H5 中因 requestCode-token 缓存逻辑缺陷，导致灵锡绑房回跳时复用过期 token 请求接口报 401。

## 问题现象
- 用户选房回跳后 URL 中无有效 authCode，绑房失败报 401「无效的Token」
- URL 同时带 search 区 requestCode/wxOpenid（灵锡登录凭证）与 hash 区 authCode=0（绑房结果）

## 根因
- 上一轮加的 requestCode-token 缓存逻辑有 bug：onLaunch→userStore.clear()→从 localStorage 恢复旧 token（requestCode 相同就认为有效）→ensureLingxiLogin 发现已有 token 跳过接口→bindHouseByLingXi 带旧 token 请求→401
- requestCode 是一次性登录凭证，每次从灵锡进入都应换新 token，URL 已有 requestCode 时不能复用缓存旧 token

## 附加说明
- authCode=0 表示第三方判定「未选择房屋」，不是有效绑房码，不会走绑房接口，只会弹「您没有选择房屋」
- 涉及文件：src/utils/sign.js、src/utils/lingxi.js、src/App.vue

## 验证与归属
- 验证证据：extracted source=cursor project=惠山二期H5
- 来源会话ID：b8a67088-aef7-4dc5-9972-579b7c7a89ae；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "huishan_phase2_tech",
  "name": "requestcode_token_bug",
  "source_extraction_id": "7045f4d455184c36854e68c49be63b56",
  "version": 1,
  "memory_type": "entities"
}
-->