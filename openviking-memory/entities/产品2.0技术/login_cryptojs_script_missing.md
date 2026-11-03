# 登录CryptoJS未定义脚本缺失
产品2.0后台登录按钮点击报错 CryptoJS undefined，根因是 index.html 漏引 crypto-js.min.js 的 script 标签。

## 问题现象
- 后台点登录按钮报错，login.vue 调 encryptPassword() 做 AES 加密时访问 window.CryptoJS.enc 报 CryptoJS undefined
- public/assets/js/crypto-js.min.js 文件实际存在，仅 index.html 漏写 script 标签

## 根因分析
- 登录链路依赖的全局工具函数靠 index.html 静态脚本注入，非 npm import；文件在但没引等于不存在
- 与 #899「index.html 全局脚本引入 ≠ 挂到 Vue 原型」根因不同：本例是静态资源引入缺失而非挂载方式问题

## 解决方案
- 遇到 XXX is undefined 且怀疑全局脚本时，先核对 index.html 是否有对应 script 标签，而非先查函数实现
- 修复即补 script 引用，并给加密工具函数加与 responseDecrypt.js 一致的空值检查（CryptoJS 未定义时给出可读报错）
- 验证需硬刷新（Ctrl+F5）排除缓存；新增页面报全局变量未定义，第一步核对静态脚本引入清单

## 验证与归属
- 会话 1bc8fc71（2026-08-26，基线 a357f32）结论：文件存在仅漏 script 标签，修复为 index.html 补引用 + passwordEncrypt.js 加空值检查
- 涉及文件：src/views/login.vue、src/utils/passwordEncrypt.js、index.html；所属项目：产品2.0；来源会话：1bc8fc71-bc44-4ec0-8afd-e7a6ff8608f0

<!-- MEMORY_FIELDS
{
  "category": "产品2.0技术",
  "name": "login_cryptojs_script_missing",
  "source_extraction_id": "bc5533b031084dca9b5380a9980fa8ec",
  "version": 1,
  "memory_type": "entities"
}
-->