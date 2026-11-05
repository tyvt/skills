# 登录页CryptoJS未引入致加密报错
产品2.0 的 login.vue 调用 encryptPassword 依赖 window.CryptoJS，但 index.html 漏引 crypto-js.min.js，导致登录报错，后补脚本并加空值检查。

## 问题根因
- 点击登录时 `login.vue` 调用 `encryptPassword()` 对密码做 AES 加密，依赖全局 `window.CryptoJS`
- `index.html` 未引入 `crypto-js.min.js`，致 `CryptoJS` 为 `undefined`，访问 `.enc` 时报错
- `public/assets/js/crypto-js.min.js` 文件存在，只是漏了 script 标签

## 修复方案
- 在 `index.html` 中补充 CryptoJS 脚本引用
- 在 `passwordEncrypt.js` 中增加与 `responseDecrypt.js` 一致的空值检查，便于排查

## 验证与归属
- 验证：硬刷新页面（Ctrl+F5）后重新登录；开发服务热更新或重启 npm run dev
- 涉及文件：`src/views/login.vue`、`index.html`、`passwordEncrypt.js`、`responseDecrypt.js`、`public/assets/js/crypto-js.min.js`
- 所属项目：产品2.0；来源会话：1bc8fc71-bc44-4ec0-8afd-e7a6ff8608f0；代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "技术模式",
  "name": "login_cryptojs_missing",
  "source_extraction_id": "8c0c2de3a1064d6585289c58f4ae70f4",
  "version": 1,
  "memory_type": "entities"
}
-->