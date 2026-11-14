# 苏住房防汛C端H5_URL token自动登录
苏住房防汛C端移动查询H5（uni-app H5）通过URL拼接token实现外链免密自动登录。

## Description
- 项目：苏住房防汛C端移动查询H5（uni-app H5），开发分支 dev
- 需求：用户于2026-11-13提出「支持url拼接token直接完成登录相关操作」
- 外链形式：`?token=xxx` 或 `#/...?token=xxx` 打开后写本地token并立即从地址栏剥离，校验通过进首页并补写用户信息

## 关键逻辑
- src/utils/request.ts 新增 peekUrlToken()（解析 ?token= 与 #/...?token=，trim/解码容错/重复取首个/空串返回 null）与 stripUrlToken()（history.replaceState 移除 token，保留其它 query、hash 路径与 history.state）
- src/App.vue 改写 onLaunch：读到 URL token 先写本地并立即从地址栏剥离；isTokenAlive 重构为 validateAndLoadUser，单次 getInfo 同时校验并补写 setLoginUser
- URL token 校验失败优先回退原 token 再校验，原 token 也失效才清空登录态
- 8443 分支带 URL token 时同样校验并补用户信息
- index.html 增加 `<meta name="referrer" content="no-referrer">` 降低 token 经 Referer 外泄

## 验证与归属
- 单元测试：tests/request.test.ts 新增 7 用例，全仓 45 用例通过
- 构建：npm run build exit 0，仅 node_modules 原有 Sass 弃用警告
- 提交：commit 9dea8ef 推送至 dev 分支，涉及 request.ts、App.vue、index.html、request.test.ts

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "suzhufang_url_token",
  "source_extraction_id": "62a33429272a4e76951b796c3845aa6d",
  "version": 1,
  "memory_type": "entities"
}
-->