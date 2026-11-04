# 登录账号密码前端AES加密并禁用表单提交
登录接口存在账号密码明文传输风险，且表单默认提交可能绕过 JS 加密逻辑，需在 Vue 初始化前引入加密脚本并对关键接口字段做 AES-128-CBC 加密。

## 问题描述
- 登录接口 `/phoneCheckCode/getTelephoneNumber` 与 `/loginName/login` 的 `username`、`password` 字段存在明文传输风险
- 表单默认提交（action/method）可能绕过 JS 加密逻辑，导致密码明文发出

## 解决方案
- `login.html` 在 Vue 初始化前引入 `static/js/crypto-js.js` 与 `static/js/secure-login.js`
- 对上述两个接口的 `username`、`password` 字段实施 AES-128-CBC 加密；其中 `/loginName/login` 的 `telephone`、`checkCode`、`code`、`codeId` 仍按明文传输
- 移除表单 `action`/`method`，登录按钮设 `native-type="button"` 防止默认提交
- 增设加密组件加载失败提示与登录 `loading` 状态

## 涉及文件
- 核心改造文件：ROOT/login.html、static/js/secure-login.js、authLogin.js、baseData.js、index.html、vue.config.js、static/js/index.js
- 镜像文件：c:/Users/Administrator/Desktop/ROOT/login.html（与仓库 ROOT/login.html 对应）

## 验证与归属
- 验证证据：src=扬州存量房/001.md
- 所属项目：扬州存量房
- 来源会话ID：287ba6ec-c2c0-4ab3-8031-b2e076e84c1b
- 代码基线：none

<!-- MEMORY_FIELDS
{
  "category": "前端技术笔记",
  "name": "login_aes_encrypt",
  "source_extraction_id": "25be547a82f34c29b716d307134ecf34",
  "version": 2,
  "memory_type": "entities"
}
-->