# 江阴H5外链登录取option解码调loginByUid
江阴H5 通过带参数外链直接免密登录：从 URL 取 option 经 decodeURIComponent 解密后密文调用 loginByUid，将 res.data.token 写入 userStore 并跳转首页。

## 接口定义
- `src/api/security.ts` 新增 `LoginByUidData` 类型
- `LoginByUidResponse.data` 改为对象结构（含 `token` 字段），区别于江阴C端的 string 类型 accessToken

## 登录流程
- `src/pages/login.vue` 从 URL 取 `option`，经 `decodeURIComponent` 解密为密文后调用 `loginByUid`
- 补充 H5/小程序二次 decode 注释说明
- 以 `res.data.token` 写入 `userStore` 并跳转 `/pages/home`
- 仅当无 `token` 时 Toast 提示，异常 `catch` 交由 `http` 层统一提示

## 验证与归属
- 验证证据：extracted source=cursor project=江阴H5
- 验证证据：src=江阴H5/001.md
- 涉及文件：src/api/security.ts、src/pages/login.vue、src/store/user.ts、src/App.vue、src/utils/url.ts、package.json、src/pages.json
- 所属项目：江阴H5；来源会话：ca38c4c5-da57-4fd8-a4a2-3740d6a3c6e3；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "technical_pattern",
  "name": "h5_extlink_login",
  "source_extraction_id": "51c475875d87459b8f21f008402d2f1a",
  "version": 2,
  "memory_type": "entities"
}
-->