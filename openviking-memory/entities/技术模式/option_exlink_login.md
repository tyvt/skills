# 江阴H5 option 外链登录链路
江阴H5 通过 URL 的 `option` 参数实现外链免密登录，以密文调用 `loginByUid` 完成单点进入。

## 接口定义
- `src/api/security.ts` 新增 `LoginByUidData`：`{ token, houseCode? }`
- `LoginByUidResponse.data` 由字符串改为对象结构（含 `.token`），与接口文档一致

## 登录流程
- `src/pages/login.vue` 从 URL 取 `option` → `decodeURIComponent` → 以密文调用 `loginByUid`
- 使用 `res.data.token` 写入 `userStore`，仍执行 `getUserInfo()` 并跳转 `/pages/home`
- 补充 H5 / 小程序下二次 decode 的说明注释

## 异常处理
- 仅在没有 `token` 时本地 Toast「登录失败」
- `catch` 不再重复 Toast，由 `http` 层统一提示

## 验证与归属
- 验证：`npm run build` 已通过；端到端需真实 `?option=` 在江阴 dev 域名联调
- 涉及文件：src/api/security.ts、src/pages/login.vue、src/store/user.ts、src/App.vue、src/utils/url.ts、src/package.json、src/pages.js
- 所属项目：江阴H5；来源会话：ca38c4c5-da57-4fd8-a4a2-3740d6a3c6e3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "option_exlink_login",
  "source_extraction_id": "5d7b3b247d354b69ac503f8a83a02aeb",
  "version": 1,
  "memory_type": "entities"
}
-->